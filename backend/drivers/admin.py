"""Admin configuration for drivers app."""
from django.contrib import admin
from .models import Driver


@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = ('user', 'license_number', 'vehicle_plate', 'status', 'rating', 'total_rides', 'created_at')
    search_fields = ('user__username', 'user__email', 'license_number', 'vehicle_plate', 'vehicle_model')
    list_filter = ('status', 'rating', 'created_at')
