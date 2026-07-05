"""Serializers for notifications app."""
from rest_framework import serializers
from .models import Notification
from core.serializers import UserBasicSerializer


class NotificationSerializer(serializers.ModelSerializer):
    """Serializer for Notification model."""
    user = UserBasicSerializer(read_only=True)
    
    class Meta:
        model = Notification
        fields = [
            'id', 'user', 'type', 'title', 'message', 'is_read', 'read_at',
            'related_object_id', 'related_object_type', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class NotificationSerializer(serializers.ModelSerializer):
    """Serializer for Notification model."""
    
    class Meta:
        model = Notification
        fields = [
            'id', 'user', 'type', 'title', 'message', 'is_read',
            'read_at', 'related_object_id', 'related_object_type',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
