"""Core serializers for NovaTaxi."""
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class BaseSerializer(serializers.ModelSerializer):
    """Base serializer with common fields and methods."""
    
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        fields = ['id', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class UserBasicSerializer(serializers.ModelSerializer):
    """Basic user info for nested serialization."""
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']
        read_only_fields = fields
