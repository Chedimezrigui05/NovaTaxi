"""Admin configuration for notifications app."""
from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'type', 'title', 'is_read', 'created_at')
    search_fields = ('user__username', 'title', 'message')
    list_filter = ('type', 'is_read', 'created_at')
    date_hierarchy = 'created_at'
