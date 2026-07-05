"""Serializers for chat app."""
from rest_framework import serializers
from .models import ChatRoom, Message
from core.serializers import UserBasicSerializer


class MessageSerializer(serializers.ModelSerializer):
    """Serializer for Message model."""
    sender = UserBasicSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = [
            'id', 'room', 'sender', 'content', 'is_read', 'read_at',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'sender', 'created_at', 'updated_at']


class ChatRoomSerializer(serializers.ModelSerializer):
    """Serializer for ChatRoom model."""
    participants = UserBasicSerializer(many=True, read_only=True)
    messages = MessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = ChatRoom
        fields = ['id', 'ride', 'participants', 'messages', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
from users.serializers import UserSerializer


class MessageSerializer(serializers.ModelSerializer):
    """Serializer for Message model."""
    sender = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'room', 'sender', 'content', 'is_read', 'read_at', 'created_at']
        read_only_fields = ['id', 'created_at']


class ChatRoomSerializer(serializers.ModelSerializer):
    """Serializer for ChatRoom model."""
    participants = UserSerializer(many=True, read_only=True)
    messages = MessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = ChatRoom
        fields = ['id', 'ride', 'participants', 'messages', 'created_at']
        read_only_fields = ['id', 'created_at']
