"""Admin configuration for rides app."""
from django.contrib import admin
from .models import Ride


@admin.register(Ride)
class RideAdmin(admin.ModelAdmin):
    list_display = ('id', 'client', 'driver', 'status', 'pickup_location', 'dropoff_location', 'fare', 'created_at')
    search_fields = ('client__user__username', 'driver__user__username', 'pickup_location', 'dropoff_location')
    list_filter = ('status', 'created_at', 'rating')
    date_hierarchy = 'created_at'
