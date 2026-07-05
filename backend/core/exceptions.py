"""Custom exceptions for NovaTaxi API."""
from rest_framework.exceptions import APIException


class BusinessLogicException(APIException):
    """Exception for business logic violations."""
    status_code = 400
    default_detail = 'Business logic error.'
    default_code = 'business_logic_error'


class ResourceNotAvailableException(APIException):
    """Exception when a resource is not available."""
    status_code = 409
    default_detail = 'Resource is not available.'
    default_code = 'resource_not_available'


class InvalidStatusTransitionException(APIException):
    """Exception for invalid status transitions."""
    status_code = 400
    default_detail = 'Invalid status transition.'
    default_code = 'invalid_status_transition'


class InsufficientCreditsException(APIException):
    """Exception for insufficient credits/funds."""
    status_code = 402
    default_detail = 'Insufficient credits.'
    default_code = 'insufficient_credits'
