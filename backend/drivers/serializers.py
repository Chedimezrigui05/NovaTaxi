"""Serializers for drivers app."""
from rest_framework import serializers
from .models import Driver
from users.serializers import UserSerializer


class DriverSerializer(serializers.ModelSerializer):
    """Serializer for Driver model."""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Driver
        fields = [
            'id', 'user', 'license_number', 'vehicle_type', 'vehicle_model',
            'vehicle_plate', 'vehicle_color', 'vehicle_year', 'status',
            'current_location', 'rating', 'total_rides', 'created_at'
        ]
        read_only_fields = ['id', 'rating', 'total_rides', 'created_at']
