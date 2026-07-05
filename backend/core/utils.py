"""Utility functions for NovaTaxi API."""
from django.core.mail import send_mail
from django.conf import settings
from decimal import Decimal
import logging

logger = logging.getLogger(__name__)


def send_email_notification(subject, message, recipient_list, html_message=None):
    """Send email notification."""
    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            recipient_list,
            html_message=html_message,
            fail_silently=False,
        )
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False


def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculate distance between two coordinates (Haversine formula)."""
    from math import radians, cos, sin, asin, sqrt
    
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    km = 6371 * c
    return km


def format_currency(amount, currency='USD'):
    """Format amount as currency."""
    if isinstance(amount, Decimal):
        amount = float(amount)
    return f"${amount:.2f}" if currency == 'USD' else f"{amount:.2f} {currency}"


def get_client_ip(request):
    """Get client IP address from request."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
