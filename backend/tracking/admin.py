"""Admin configuration for tracking app."""
from django.contrib import admin
from .models import DriverLocation, RideLocation


@admin.register(DriverLocation)
class DriverLocationAdmin(admin.ModelAdmin):
    list_display = ('driver', 'latitude', 'longitude', 'speed', 'created_at')
    search_fields = ('driver__user__username',)
    list_filter = ('created_at',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(RideLocation)
class RideLocationAdmin(admin.ModelAdmin):
    list_display = ('ride', 'latitude', 'longitude', 'created_at')
    search_fields = ('ride__id',)
    list_filter = ('created_at',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(DriverLocation)
class DriverLocationAdmin(admin.ModelAdmin):
    list_display = ('driver', 'latitude', 'longitude', 'speed', 'created_at')
    search_fields = ('driver__user__username',)
    list_filter = ('created_at',)
    date_hierarchy = 'created_at'


@admin.register(RideLocation)
class RideLocationAdmin(admin.ModelAdmin):
    list_display = ('ride', 'latitude', 'longitude', 'created_at')
    search_fields = ('ride__id',)
    list_filter = ('created_at',)
    date_hierarchy = 'created_at'
