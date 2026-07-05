"""Permissions for authentication."""
from rest_framework import permissions
from django.utils.translation import gettext_lazy as _


class IsNotAuthenticated(permissions.BasePermission):
    """
    Permission to allow only unauthenticated users.
    Used for registration and login endpoints.
    """
    
    message = _('You are already authenticated.')
    
    def has_permission(self, request, view):
        return not request.user or not request.user.is_authenticated


class IsEmailVerified(permissions.BasePermission):
    """
    Permission to allow only users with verified email addresses.
    """
    
    message = _('Please verify your email address first.')
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return request.user.is_email_verified


class IsAccountActive(permissions.BasePermission):
    """
    Permission to allow only users with active accounts.
    """
    
    message = _('Your account is inactive.')
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return request.user.is_active and not request.user.is_locked


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Permission to allow users to only edit their own profile.
    """
    
    message = _('You do not have permission to perform this action.')
    
    def has_object_permission(self, request, view, obj):
        # Read permissions allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions only to the owner
        return obj == request.user
