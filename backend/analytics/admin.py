"""Admin configuration for analytics app."""
from django.contrib import admin
from .models import DailyAnalytics


@admin.register(DailyAnalytics)
class DailyAnalyticsAdmin(admin.ModelAdmin):
    list_display = ('date', 'total_rides', 'total_revenue', 'completed_rides', 'cancelled_rides')
    search_fields = ('date',)
    list_filter = ('date',)
    readonly_fields = ('created_at', 'updated_at')
from .models import DailyAnalytics


@admin.register(DailyAnalytics)
class DailyAnalyticsAdmin(admin.ModelAdmin):
    list_display = ('date', 'total_rides', 'total_revenue', 'new_clients', 'new_drivers', 'created_at')
    search_fields = ('date',)
    list_filter = ('date', 'created_at')
    date_hierarchy = 'date'
