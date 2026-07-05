"""Custom validators for NovaTaxi API."""
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
import re


def validate_phone_number(value):
    """Validate phone number format."""
    pattern = r'^\+?1?\d{9,15}$'
    if not re.match(pattern, value.replace(' ', '').replace('-', '')):
        raise ValidationError(
            _('%(value)s is not a valid phone number'),
            params={'value': value},
        )


def validate_vehicle_plate(value):
    """Validate vehicle license plate format."""
    pattern = r'^[A-Z0-9\-]{3,10}$'
    if not re.match(pattern, value.upper()):
        raise ValidationError(
            _('%(value)s is not a valid vehicle plate'),
            params={'value': value},
        )


def validate_license_number(value):
    """Validate driver's license number."""
    if not (3 <= len(value) <= 20):
        raise ValidationError(
            _('License number must be between 3 and 20 characters')
        )


def validate_latitude(value):
    """Validate latitude coordinate."""
    if not (-90 <= value <= 90):
        raise ValidationError(
            _('Latitude must be between -90 and 90')
        )


def validate_longitude(value):
    """Validate longitude coordinate."""
    if not (-180 <= value <= 180):
        raise ValidationError(
            _('Longitude must be between -180 and 180')
        )
