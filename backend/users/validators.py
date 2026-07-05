"""Validators for authentication."""
import re
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import get_password_validators
from django.utils.translation import gettext_lazy as _


class PasswordValidator:
    """Custom password validator with strength requirements."""
    
    MIN_LENGTH = 8
    REQUIRE_UPPERCASE = True
    REQUIRE_LOWERCASE = True
    REQUIRE_DIGITS = True
    REQUIRE_SPECIAL = True
    
    @classmethod
    def validate(cls, password):
        """
        Validate password against strength requirements.
        
        Args:
            password (str): Password to validate
            
        Raises:
            ValidationError: If password doesn't meet requirements
        """
        errors = []
        
        # Check minimum length
        if len(password) < cls.MIN_LENGTH:
            errors.append(
                _('Password must be at least %(min_length)d characters long.')
                % {'min_length': cls.MIN_LENGTH}
            )
        
        # Check for uppercase letters
        if cls.REQUIRE_UPPERCASE and not re.search(r'[A-Z]', password):
            errors.append(_('Password must contain at least one uppercase letter.'))
        
        # Check for lowercase letters
        if cls.REQUIRE_LOWERCASE and not re.search(r'[a-z]', password):
            errors.append(_('Password must contain at least one lowercase letter.'))
        
        # Check for digits
        if cls.REQUIRE_DIGITS and not re.search(r'\d', password):
            errors.append(_('Password must contain at least one digit.'))
        
        # Check for special characters
        if cls.REQUIRE_SPECIAL and not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            errors.append(
                _('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>).')
            )
        
        if errors:
            raise ValidationError(errors)
        
        return True


class EmailValidator:
    """Email validation."""
    
    # RFC 5322 simplified email regex
    EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    @classmethod
    def validate(cls, email):
        """
        Validate email format.
        
        Args:
            email (str): Email to validate
            
        Raises:
            ValidationError: If email format is invalid
        """
        if not re.match(cls.EMAIL_REGEX, email):
            raise ValidationError(_('Invalid email format.'))
        
        if len(email) > 254:
            raise ValidationError(_('Email is too long.'))
        
        return True


class UsernameValidator:
    """Username validation."""
    
    MIN_LENGTH = 3
    MAX_LENGTH = 30
    # Allow alphanumeric, underscore, hyphen, period
    USERNAME_REGEX = r'^[a-zA-Z0-9_.-]+$'
    
    @classmethod
    def validate(cls, username):
        """
        Validate username format.
        
        Args:
            username (str): Username to validate
            
        Raises:
            ValidationError: If username format is invalid
        """
        if len(username) < cls.MIN_LENGTH:
            raise ValidationError(
                _('Username must be at least %(min_length)d characters long.')
                % {'min_length': cls.MIN_LENGTH}
            )
        
        if len(username) > cls.MAX_LENGTH:
            raise ValidationError(
                _('Username must be at most %(max_length)d characters long.')
                % {'max_length': cls.MAX_LENGTH}
            )
        
        if not re.match(cls.USERNAME_REGEX, username):
            raise ValidationError(
                _('Username can only contain letters, numbers, underscores, hyphens, and periods.')
            )
        
        # Check if username starts with a number
        if username[0].isdigit():
            raise ValidationError(_('Username cannot start with a number.'))
        
        return True


class PhoneNumberValidator:
    """Phone number validation."""
    
    @classmethod
    def validate(cls, phone_number):
        """
        Validate phone number format.
        
        Args:
            phone_number (str): Phone number to validate
            
        Raises:
            ValidationError: If phone number format is invalid
        """
        if not phone_number:
            return True  # Allow empty
        
        # Remove common formatting characters
        cleaned = re.sub(r'[\s()+-]', '', phone_number)
        
        # Check if it's all digits and has reasonable length (7-15)
        if not cleaned.isdigit() or not (7 <= len(cleaned) <= 15):
            raise ValidationError(
                _('Invalid phone number format. Must be 7-15 digits.')
            )
        
        return True


def validate_password_match(password, password_confirm):
    """
    Validate that two passwords match.
    
    Args:
        password (str): First password
        password_confirm (str): Confirmation password
        
    Raises:
        ValidationError: If passwords don't match
    """
    if password != password_confirm:
        raise ValidationError(_('Passwords do not match.'))


def validate_password_not_same_as_old(new_password, old_password):
    """
    Validate that new password is different from old password.
    
    Args:
        new_password (str): New password
        old_password (str): Old password
        
    Raises:
        ValidationError: If new password is same as old
    """
    if new_password == old_password:
        raise ValidationError(
            _('New password must be different from the current password.')
        )
