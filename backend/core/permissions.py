"""Enhanced permissions for NovaTaxi API."""
from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.owner == request.user


class IsClient(permissions.BasePermission):
    """Permission to check if user has 'client' role."""
    
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'client'


class IsDriver(permissions.BasePermission):
    """Permission to check if user has 'driver' role."""
    
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'driver'


class IsAdmin(permissions.BasePermission):
    """Permission to check if user has 'admin' role or is superuser."""
    
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and (
            request.user.role == 'admin' or request.user.is_superuser
        )


class IsClientOrDriver(permissions.BasePermission):
    """Permission to check if user is either client or driver."""
    
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role in ['client', 'driver']


class IsOwner(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to access it.
    Assumes the model instance has a `user` attribute.
    """
    
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class IsOwnerProfile(permissions.BasePermission):
    """
    Object-level permission for profile objects.
    Assumes the model instance has a `user` attribute.
    """
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user
