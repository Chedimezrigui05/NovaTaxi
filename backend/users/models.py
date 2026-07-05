"""Custom User model for NovaTaxi."""
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _
from core.models import TimeStampedModel
from django.utils import timezone
from datetime import timedelta


class CustomUserManager(BaseUserManager):
    """Custom User Manager for creating users with email as unique identifier."""
    
    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular user."""
        if not email:
            raise ValueError(_('Email field is required'))
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a superuser."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True'))
        
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser, TimeStampedModel):
    """Custom User model with authentication and profile fields."""
    
    ROLE_CHOICES = (
        ('client', 'Client'),
        ('driver', 'Driver'),
        ('admin', 'Admin'),
    )
    
    email = models.EmailField(unique=True, verbose_name=_('Email Address'))
    role = models.CharField(
        max_length=20, 
        choices=ROLE_CHOICES, 
        default='client',
        verbose_name=_('User Role')
    )
    phone_number = models.CharField(
        max_length=20, 
        blank=True, 
        null=True,
        verbose_name=_('Phone Number')
    )
    profile_picture = models.ImageField(
        upload_to='profile_pictures/', 
        blank=True, 
        null=True,
        verbose_name=_('Profile Picture')
    )
    
    # Email verification
    is_email_verified = models.BooleanField(
        default=False,
        verbose_name=_('Email Verified')
    )
    email_verification_token = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        unique=True,
        verbose_name=_('Email Verification Token')
    )
    email_verified_at = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name=_('Email Verified At')
    )
    
    # Password reset
    password_reset_token = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        unique=True,
        verbose_name=_('Password Reset Token')
    )
    password_reset_expires = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name=_('Password Reset Expires')
    )
    
    # Legacy field (for backward compatibility)
    is_verified = models.BooleanField(default=False)
    
    # Account status
    is_active = models.BooleanField(
        default=True,
        verbose_name=_('Is Active')
    )
    
    # Last login tracking
    last_login_ip = models.GenericIPAddressField(
        blank=True,
        null=True,
        verbose_name=_('Last Login IP')
    )
    
    # Account lockout
    failed_login_attempts = models.IntegerField(
        default=0,
        verbose_name=_('Failed Login Attempts')
    )
    is_locked = models.BooleanField(
        default=False,
        verbose_name=_('Is Locked')
    )
    locked_until = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name=_('Locked Until')
    )
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        ordering = ['-date_joined']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['username']),
            models.Index(fields=['role']),
            models.Index(fields=['is_email_verified']),
        ]

    def __str__(self):
        return f'{self.email} ({self.role})'
    
    def is_password_reset_token_valid(self):
        """Check if password reset token is valid and not expired."""
        if not self.password_reset_token or not self.password_reset_expires:
            return False
        return timezone.now() < self.password_reset_expires
    
    def generate_email_verification_token(self):
        """Generate email verification token."""
        import secrets
        token = secrets.token_urlsafe(32)
        self.email_verification_token = token
        return token
    
    def generate_password_reset_token(self, expiry_hours=24):
        """Generate password reset token with expiry."""
        import secrets
        token = secrets.token_urlsafe(32)
        self.password_reset_token = token
        self.password_reset_expires = timezone.now() + timedelta(hours=expiry_hours)
        return token
    
    def verify_email(self):
        """Mark email as verified."""
        self.is_email_verified = True
        self.is_verified = True  # Backward compatibility
        self.email_verification_token = None
        self.email_verified_at = timezone.now()
    
    def reset_failed_login_attempts(self):
        """Reset failed login attempts counter."""
        self.failed_login_attempts = 0
        self.is_locked = False
        self.locked_until = None
    
    def increment_failed_login_attempts(self, max_attempts=5, lockout_minutes=15):
        """Increment failed login attempts and lock account if needed."""
        self.failed_login_attempts += 1
        if self.failed_login_attempts >= max_attempts:
            self.is_locked = True
            self.locked_until = timezone.now() + timedelta(minutes=lockout_minutes)
    
    def is_account_locked(self):
        """Check if account is locked and lockout has expired."""
        if not self.is_locked:
            return False
        if self.locked_until and timezone.now() > self.locked_until:
            self.reset_failed_login_attempts()
            self.save()
            return False
        return True
