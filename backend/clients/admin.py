"""Admin configuration for clients app."""
from django.contrib import admin
from .models import Client


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('user', 'home_address', 'work_address', 'created_at')
    search_fields = ('user__username', 'user__email', 'home_address', 'work_address')
    list_filter = ('created_at',)
