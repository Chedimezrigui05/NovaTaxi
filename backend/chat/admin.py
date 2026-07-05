"""Admin configuration for chat app."""
from django.contrib import admin
from .models import ChatRoom, Message


@admin.register(ChatRoom)
class ChatRoomAdmin(admin.ModelAdmin):
    list_display = ('ride', 'created_at')
    search_fields = ('ride__id',)
    list_filter = ('created_at',)


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('room', 'sender', 'content', 'is_read', 'created_at')
    search_fields = ('sender__username', 'content')
    list_filter = ('is_read', 'created_at')
    date_hierarchy = 'created_at'
