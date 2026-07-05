"""Serializers for tracking app."""
from rest_framework import serializers
from .models import DriverLocation, RideLocation
from core.serializers import UserBasicSerializer


class DriverLocationSerializer(serializers.ModelSerializer):
    """Serializer for DriverLocation model."""
    
    class Meta:
        model = DriverLocation
        fields = [
            'id', 'driver', 'latitude', 'longitude', 'speed', 
            'heading', 'accuracy', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class RideLocationSerializer(serializers.ModelSerializer):
    """Serializer for RideLocation model."""
    
    class Meta:
        model = RideLocation
        fields = ['id', 'ride', 'latitude', 'longitude', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
from rest_framework import serializers
from .models import DriverLocation, RideLocation


class DriverLocationSerializer(serializers.ModelSerializer):
    """Serializer for DriverLocation model."""
    
    class Meta:
        model = DriverLocation
        fields = ['id', 'driver', 'latitude', 'longitude', 'speed', 'heading', 'accuracy', 'created_at']
        read_only_fields = ['id', 'created_at']


class RideLocationSerializer(serializers.ModelSerializer):
    """Serializer for RideLocation model."""
    
    class Meta:
        model = RideLocation
        fields = ['id', 'ride', 'latitude', 'longitude', 'created_at']
        read_only_fields = ['id', 'created_at']
