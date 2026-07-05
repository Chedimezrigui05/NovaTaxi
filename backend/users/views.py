"""Views for users app."""
from rest_framework import viewsets, views, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from .models import User
from .serializers import (
    UserSerializer,
    UserDetailSerializer,
    RegisterSerializer,
    LoginSerializer,
    RefreshTokenSerializer,
    ChangePasswordSerializer,
    PasswordResetSerializer,
    PasswordResetConfirmSerializer,
    VerifyEmailSerializer,
    LogoutSerializer,
    UpdateProfileSerializer,
)
from .permissions import (
    IsNotAuthenticated,
    IsEmailVerified,
    IsAccountActive,
    IsOwnerOrReadOnly,
)
from .services import TokenService, EmailService, AuthenticationService
import logging

logger = logging.getLogger(__name__)


class RegisterView(views.APIView):
    """API endpoint for user registration."""
    
    permission_classes = [IsNotAuthenticated]
    
    def post(self, request):
        """Register a new user."""
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.save()
        
        # Send welcome email (optional in development)
        # EmailService.send_welcome_email(user)
        
        return Response(
            {
                'success': True,
                'message': _('User registered successfully. Please check your email to verify your account.'),
                'user': UserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED
        )


class LoginView(views.APIView):
    """API endpoint for user login."""
    
    permission_classes = [IsNotAuthenticated]
    
    def post(self, request):
        """Login user and return tokens."""
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        
        # Update last login
        ip_address = self._get_client_ip(request)
        AuthenticationService.update_last_login(user, ip_address)
        
        # Generate tokens
        tokens = TokenService.get_tokens_for_user(user)
        
        logger.info(f'User logged in: {user.email}')
        
        return Response(
            {
                'success': True,
                'message': _('Login successful.'),
                'user': UserSerializer(user).data,
                'tokens': tokens,
            },
            status=status.HTTP_200_OK
        )
    
    @staticmethod
    def _get_client_ip(request):
        """Get client IP address from request."""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class RefreshTokenView(views.APIView):
    """API endpoint for refreshing access token."""
    
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        """Refresh access token using refresh token."""
        serializer = RefreshTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            access_token = TokenService.refresh_access_token(
                serializer.validated_data['refresh']
            )
            return Response(
                {
                    'success': True,
                    'access': access_token,
                },
                status=status.HTTP_200_OK
            )
        except TokenError as e:
            logger.warning(f'Token refresh failed: {str(e)}')
            return Response(
                {
                    'success': False,
                    'error': _('Invalid or expired refresh token.'),
                },
                status=status.HTTP_401_UNAUTHORIZED
            )


class LogoutView(views.APIView):
    """API endpoint for user logout."""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        """Logout user (invalidate refresh token if using token blacklist)."""
        # In a stateless JWT system, logout is typically handled on the client side
        # by removing tokens. This endpoint is for future token blacklist implementation.
        
        logger.info(f'User logged out: {request.user.email}')
        
        return Response(
            {
                'success': True,
                'message': _('Logout successful.'),
            },
            status=status.HTTP_200_OK
        )


class ChangePasswordView(views.APIView):
    """API endpoint for changing user password."""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        """Change user password."""
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        
        logger.info(f'Password changed for user: {user.email}')
        
        return Response(
            {
                'success': True,
                'message': _('Password changed successfully.'),
            },
            status=status.HTTP_200_OK
        )


class PasswordResetView(views.APIView):
    """API endpoint for requesting password reset."""
    
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        """Request password reset."""
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        
        try:
            user = User.objects.get(email=email)
            
            # Generate password reset token
            token = user.generate_password_reset_token()
            user.save()
            
            # Send password reset email
            reset_url = f"{request.build_absolute_uri('/')[:-1]}/reset-password/{token}"
            EmailService.send_password_reset_email(user, reset_url)
            
            logger.info(f'Password reset requested for: {email}')
            
        except User.DoesNotExist:
            # Security: Don't reveal if user exists
            logger.warning(f'Password reset requested for non-existent email: {email}')
        
        # Always return success for security
        return Response(
            {
                'success': True,
                'message': _('If an account with that email exists, a password reset link has been sent.'),
            },
            status=status.HTTP_200_OK
        )


class PasswordResetConfirmView(views.APIView):
    """API endpoint for confirming password reset with token."""
    
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        """Confirm password reset with token."""
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        token = serializer.validated_data['token']
        new_password = serializer.validated_data['new_password']
        
        try:
            user = User.objects.get(password_reset_token=token)
        except User.DoesNotExist:
            return Response(
                {
                    'success': False,
                    'error': _('Invalid or expired reset token.'),
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Verify token
        if not AuthenticationService.verify_password_reset_token(user, token):
            return Response(
                {
                    'success': False,
                    'error': _('Invalid or expired reset token.'),
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Reset password
        user.set_password(new_password)
        user.password_reset_token = None
        user.password_reset_expires = None
        user.save()
        
        logger.info(f'Password reset completed for: {user.email}')
        
        return Response(
            {
                'success': True,
                'message': _('Password reset successfully. You can now login with your new password.'),
            },
            status=status.HTTP_200_OK
        )


class VerifyEmailView(views.APIView):
    """API endpoint for verifying email address."""
    
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        """Verify email with token."""
        serializer = VerifyEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        token = serializer.validated_data['token']
        
        try:
            user = User.objects.get(email_verification_token=token)
        except User.DoesNotExist:
            return Response(
                {
                    'success': False,
                    'error': _('Invalid verification token.'),
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Verify token
        if not AuthenticationService.verify_email_token(user, token):
            return Response(
                {
                    'success': False,
                    'error': _('Invalid verification token.'),
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Mark email as verified
        user.verify_email()
        user.save()
        
        logger.info(f'Email verified for user: {user.email}')
        
        return Response(
            {
                'success': True,
                'message': _('Email verified successfully.'),
                'user': UserSerializer(user).data,
            },
            status=status.HTTP_200_OK
        )


class ResendVerificationEmailView(views.APIView):
    """API endpoint for resending verification email."""
    
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        """Resend verification email."""
        email = request.data.get('email')
        
        if not email:
            return Response(
                {
                    'success': False,
                    'error': _('Email is required.'),
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = User.objects.get(email=email)
            
            if user.is_email_verified:
                return Response(
                    {
                        'success': False,
                        'error': _('Email is already verified.'),
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Generate new token
            token = user.generate_email_verification_token()
            user.save()
            
            # Send email
            verify_url = f"{request.build_absolute_uri('/')[:-1]}/verify-email/{token}"
            EmailService.send_email_verification(user, verify_url)
            
            logger.info(f'Verification email resent to: {email}')
            
        except User.DoesNotExist:
            # Security: Don't reveal if user exists
            logger.warning(f'Verification email resent requested for non-existent email: {email}')
        
        return Response(
            {
                'success': True,
                'message': _('If an account with that email exists, a verification email has been sent.'),
            },
            status=status.HTTP_200_OK
        )


class CurrentUserView(views.APIView):
    """API endpoint for getting current authenticated user."""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        """Get current user details."""
        serializer = UserDetailSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for User model."""
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        """Get appropriate serializer based on action."""
        if self.action == 'create':
            return RegisterSerializer
        elif self.action == 'update' or self.action == 'partial_update':
            return UpdateProfileSerializer
        elif self.action == 'retrieve':
            return UserDetailSerializer
        return UserSerializer
    
    def get_permissions(self):
        """Get permissions based on action."""
        if self.action == 'create':
            return [IsNotAuthenticated()]
        elif self.action in ['update', 'partial_update']:
            return [permissions.IsAuthenticated(), IsOwnerOrReadOnly()]
        return [permission() for permission in self.permission_classes]
    
    def retrieve(self, request, *args, **kwargs):
        """Get user details."""
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def update(self, request, *args, **kwargs):
        """Update user profile (full update)."""
        partial = False
        instance = self.get_object()
        
        # Check permissions
        if instance != request.user and not request.user.is_staff:
            return Response(
                {'error': _('You can only edit your own profile.')},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        logger.info(f'User profile updated: {instance.email}')
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def partial_update(self, request, *args, **kwargs):
        """Update user profile (partial update)."""
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'], url_path='me')
    def get_current_user(self, request):
        """Get current authenticated user."""
        serializer = UserDetailSerializer(request.user)
        return Response(serializer.data)
