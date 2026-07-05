"""Serializers for users app."""
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from .models import User
from .validators import (
    PasswordValidator, 
    EmailValidator, 
    UsernameValidator,
    PhoneNumberValidator,
    validate_password_match,
    validate_password_not_same_as_old,
)
from .services import TokenService, AuthenticationService
import logging

logger = logging.getLogger(__name__)


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model (retrieve/update)."""
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'role', 
            'phone_number', 'profile_picture', 'is_email_verified', 
            'date_joined', 'last_login'
        ]
        read_only_fields = ['id', 'date_joined', 'last_login', 'is_email_verified']


class UserDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for User model with all fields."""
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'role', 
            'phone_number', 'profile_picture', 'is_email_verified', 
            'is_active', 'is_locked', 'failed_login_attempts',
            'date_joined', 'last_login', 'last_login_ip'
        ]
        read_only_fields = [
            'id', 'date_joined', 'last_login', 'last_login_ip',
            'is_email_verified', 'failed_login_attempts', 'is_locked'
        ]


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True, min_length=3, max_length=30)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    phone_number = serializers.CharField(required=False, allow_blank=True)
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES, default='client')
    
    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'password_confirm',
            'first_name', 'last_name', 'phone_number', 'role'
        ]
    
    def validate_email(self, value):
        """Validate email format and uniqueness."""
        EmailValidator.validate(value)
        
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                _('Email address is already in use.')
            )
        return value
    
    def validate_username(self, value):
        """Validate username format and uniqueness."""
        UsernameValidator.validate(value)
        
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                _('Username is already in use.')
            )
        return value
    
    def validate_phone_number(self, value):
        """Validate phone number format if provided."""
        if value:
            PhoneNumberValidator.validate(value)
        return value
    
    def validate_password(self, value):
        """Validate password strength."""
        PasswordValidator.validate(value)
        return value
    
    def validate(self, data):
        """Validate that passwords match."""
        password = data.get('password')
        password_confirm = data.get('password_confirm')
        
        validate_password_match(password, password_confirm)
        
        return data
    
    def create(self, validated_data):
        """Create user with validated data."""
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        
        user = User.objects.create_user(
            password=password,
            **validated_data
        )
        
        # Generate email verification token
        user.generate_email_verification_token()
        user.save()
        
        logger.info(f'New user registered: {user.email}')
        return user


class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""
    
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    
    def validate(self, data):
        """Authenticate user with email and password."""
        email = data.get('email')
        password = data.get('password')
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                _('Invalid email or password.')
            )
        
        # Check if account is locked
        if user.is_account_locked():
            raise serializers.ValidationError(
                _('Your account is temporarily locked. Please try again later.')
            )
        
        # Check if account is active
        if not user.is_active:
            raise serializers.ValidationError(
                _('Your account has been deactivated.')
            )
        
        # Authenticate user
        if not user.check_password(password):
            user.increment_failed_login_attempts()
            user.save()
            
            if user.is_locked:
                raise serializers.ValidationError(
                    _('Too many failed login attempts. Account temporarily locked.')
                )
            
            raise serializers.ValidationError(
                _('Invalid email or password.')
            )
        
        # Reset failed login attempts on successful login
        user.reset_failed_login_attempts()
        user.save()
        
        data['user'] = user
        return data


class RefreshTokenSerializer(serializers.Serializer):
    """Serializer for refreshing access token."""
    
    refresh = serializers.CharField(required=True)
    
    def validate_refresh(self, value):
        """Validate refresh token."""
        if not TokenService.verify_token(value, token_type='refresh'):
            raise serializers.ValidationError(
                _('Invalid or expired refresh token.')
            )
        return value


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for changing user password."""
    
    old_password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    new_password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    new_password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    
    def validate_old_password(self, value):
        """Validate old password."""
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError(
                _('Old password is incorrect.')
            )
        return value
    
    def validate_new_password(self, value):
        """Validate new password strength."""
        PasswordValidator.validate(value)
        return value
    
    def validate(self, data):
        """Validate new passwords match and are different from old."""
        new_password = data.get('new_password')
        new_password_confirm = data.get('new_password_confirm')
        old_password = data.get('old_password')
        
        # Check new passwords match
        validate_password_match(new_password, new_password_confirm)
        
        # Check new password is different from old
        validate_password_not_same_as_old(new_password, old_password)
        
        return data


class PasswordResetSerializer(serializers.Serializer):
    """Serializer for requesting password reset."""
    
    email = serializers.EmailField(required=True)
    
    def validate_email(self, value):
        """Check if user with email exists."""
        try:
            User.objects.get(email=value)
        except User.DoesNotExist:
            # Don't reveal if email exists or not (security best practice)
            # But we can still validate format
            pass
        return value


class PasswordResetConfirmSerializer(serializers.Serializer):
    """Serializer for confirming password reset with token."""
    
    token = serializers.CharField(required=True)
    new_password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    new_password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    
    def validate_new_password(self, value):
        """Validate new password strength."""
        PasswordValidator.validate(value)
        return value
    
    def validate(self, data):
        """Validate new passwords match."""
        new_password = data.get('new_password')
        new_password_confirm = data.get('new_password_confirm')
        
        validate_password_match(new_password, new_password_confirm)
        
        return data


class VerifyEmailSerializer(serializers.Serializer):
    """Serializer for email verification."""
    
    token = serializers.CharField(required=True)


class LogoutSerializer(serializers.Serializer):
    """Serializer for logout."""
    
    refresh = serializers.CharField(required=True)


class UpdateProfileSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile."""
    
    email = serializers.EmailField(read_only=True)
    username = serializers.CharField(read_only=True)
    
    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'phone_number', 'profile_picture'
        ]
    
    def validate_phone_number(self, value):
        """Validate phone number if provided."""
        if value:
            PhoneNumberValidator.validate(value)
        return value
