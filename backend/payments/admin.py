"""Admin configuration for payments app."""
from django.contrib import admin
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'ride', 'amount', 'status', 'method', 'created_at')
    search_fields = ('user__username', 'transaction_id', 'ride__id')
    list_filter = ('status', 'method', 'created_at')
    readonly_fields = ('created_at', 'updated_at', 'transaction_id')


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'ride', 'user', 'amount', 'status', 'method', 'transaction_id', 'created_at')
    search_fields = ('ride__id', 'user__username', 'transaction_id')
    list_filter = ('status', 'method', 'created_at')
    date_hierarchy = 'created_at'
