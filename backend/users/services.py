"""Services for authentication operations."""
import logging
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

logger = logging.getLogger(__name__)


class EmailService:
    """Service for sending emails."""
    
    FROM_EMAIL = settings.DEFAULT_FROM_EMAIL
    
    @classmethod
    def send_email_verification(cls, user, verification_url):
        """
        Send email verification email to user.
        
        Args:
            user: User object
            verification_url: URL for email verification link
            
        Returns:
            bool: True if email sent successfully
        """
        try:
            subject = _('Verify Your Email Address - NovaTaxi')
            context = {
                'user': user,
                'verification_url': verification_url,
                'support_email': 'support@novataxi.com',
            }
            
            html_message = render_to_string(
                'users/emails/email_verification.html',
                context
            )
            plain_message = strip_tags(html_message)
            
            send_mail(
                subject,
                plain_message,
                cls.FROM_EMAIL,
                [user.email],
                html_message=html_message,
                fail_silently=False,
            )
            
            logger.info(f'Email verification sent to {user.email}')
            return True
            
        except Exception as e:
            logger.error(f'Failed to send email verification: {str(e)}')
            return False
    
    @classmethod
    def send_password_reset_email(cls, user, reset_url):
        """
        Send password reset email to user.
        
        Args:
            user: User object
            reset_url: URL for password reset link
            
        Returns:
            bool: True if email sent successfully
        """
        try:
            subject = _('Reset Your Password - NovaTaxi')
            context = {
                'user': user,
                'reset_url': reset_url,
                'support_email': 'support@novataxi.com',
            }
            
            html_message = render_to_string(
                'users/emails/password_reset.html',
                context
            )
            plain_message = strip_tags(html_message)
            
            send_mail(
                subject,
                plain_message,
                cls.FROM_EMAIL,
                [user.email],
                html_message=html_message,
                fail_silently=False,
            )
            
            logger.info(f'Password reset email sent to {user.email}')
            return True
            
        except Exception as e:
            logger.error(f'Failed to send password reset email: {str(e)}')
            return False
    
    @classmethod
    def send_welcome_email(cls, user):
        """
        Send welcome email to newly registered user.
        
        Args:
            user: User object
            
        Returns:
            bool: True if email sent successfully
        """
        try:
            subject = _('Welcome to NovaTaxi!')
            context = {
                'user': user,
                'app_name': 'NovaTaxi',
                'support_email': 'support@novataxi.com',
            }
            
            html_message = render_to_string(
                'users/emails/welcome.html',
                context
            )
            plain_message = strip_tags(html_message)
            
            send_mail(
                subject,
                plain_message,
                cls.FROM_EMAIL,
                [user.email],
                html_message=html_message,
                fail_silently=False,
            )
            
            logger.info(f'Welcome email sent to {user.email}')
            return True
            
        except Exception as e:
            logger.error(f'Failed to send welcome email: {str(e)}')
            return False


class TokenService:
    """Service for JWT token operations."""
    
    @staticmethod
    def get_tokens_for_user(user):
        """
        Get refresh and access tokens for a user.
        
        Args:
            user: User object
            
        Returns:
            dict: Dictionary with access and refresh tokens
        """
        try:
            refresh = RefreshToken.for_user(user)
            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        except Exception as e:
            logger.error(f'Failed to generate tokens for user {user.id}: {str(e)}')
            raise
    
    @staticmethod
    def verify_token(token, token_type='access'):
        """
        Verify a JWT token.
        
        Args:
            token: Token string to verify
            token_type: Type of token ('access' or 'refresh')
            
        Returns:
            bool: True if token is valid
        """
        try:
            if token_type == 'refresh':
                RefreshToken(token)
            else:
                from rest_framework_simplejwt.tokens import AccessToken
                AccessToken(token)
            return True
        except TokenError:
            return False
    
    @staticmethod
    def refresh_access_token(refresh_token):
        """
        Generate new access token from refresh token.
        
        Args:
            refresh_token: Refresh token string
            
        Returns:
            str: New access token
            
        Raises:
            TokenError: If refresh token is invalid
        """
        try:
            refresh = RefreshToken(refresh_token)
            return str(refresh.access_token)
        except TokenError as e:
            logger.warning(f'Failed to refresh token: {str(e)}')
            raise


class AuthenticationService:
    """Service for authentication operations."""
    
    @staticmethod
    def verify_password_reset_token(user, token):
        """
        Verify password reset token.
        
        Args:
            user: User object
            token: Token to verify
            
        Returns:
            bool: True if token is valid
        """
        if not user.password_reset_token or user.password_reset_token != token:
            return False
        
        if not user.is_password_reset_token_valid():
            return False
        
        return True
    
    @staticmethod
    def verify_email_token(user, token):
        """
        Verify email verification token.
        
        Args:
            user: User object
            token: Token to verify
            
        Returns:
            bool: True if token is valid
        """
        if not user.email_verification_token or user.email_verification_token != token:
            return False
        
        return True
    
    @staticmethod
    def update_last_login(user, ip_address=None):
        """
        Update user's last login timestamp and IP.
        
        Args:
            user: User object
            ip_address: IP address of the login
        """
        from django.utils import timezone
        user.last_login = timezone.now()
        if ip_address:
            user.last_login_ip = ip_address
        user.save(update_fields=['last_login', 'last_login_ip'])
