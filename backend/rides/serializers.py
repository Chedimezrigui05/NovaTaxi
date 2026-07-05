"""Serializers for rides app."""
from rest_framework import serializers
from .models import Ride
from clients.serializers import ClientSerializer
from drivers.serializers import DriverSerializer


class RideSerializer(serializers.ModelSerializer):
    """Serializer for Ride model."""
    client = ClientSerializer(read_only=True)
    driver = DriverSerializer(read_only=True)
    
    class Meta:
        model = Ride
        fields = [
            'id', 'client', 'driver', 'pickup_location', 'dropoff_location',
            'pickup_latitude', 'pickup_longitude', 'dropoff_latitude', 'dropoff_longitude',
            'status', 'distance', 'duration', 'fare', 'rating', 'feedback',
            'started_at', 'completed_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class RideCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating rides."""
    
    class Meta:
        model = Ride
        fields = [
            'pickup_location', 'dropoff_location', 'pickup_latitude',
            'pickup_longitude', 'dropoff_latitude', 'dropoff_longitude'
        ]
