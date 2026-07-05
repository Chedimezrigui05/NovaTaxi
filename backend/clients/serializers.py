"""Serializers for clients app."""
from rest_framework import serializers
from .models import Client
from users.serializers import UserSerializer


class ClientSerializer(serializers.ModelSerializer):
    """Serializer for Client model."""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Client
        fields = ['id', 'user', 'home_address', 'work_address', 'preferred_payment_method', 'created_at']
        read_only_fields = ['id', 'created_at']
