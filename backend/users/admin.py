"""Admin configuration for users app."""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Admin class for User model."""
    list_display = ('username', 'email', 'role', 'is_verified', 'is_staff', 'date_joined')
    list_filter = ('role', 'is_verified', 'is_staff', 'is_superuser', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name', 'phone_number')
    ordering = ('-date_joined',)
    
    fieldsets = BaseUserAdmin.fieldsets + (
        (None, {'fields': ('role', 'phone_number', 'profile_picture', 'is_verified')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        (None, {'fields': ('role', 'phone_number', 'profile_picture', 'is_verified')}),
    )
