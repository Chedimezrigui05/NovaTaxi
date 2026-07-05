"""Serializers for analytics app."""
from rest_framework import serializers
from .models import DailyAnalytics


class DailyAnalyticsSerializer(serializers.ModelSerializer):
    """Serializer for DailyAnalytics model."""
    
    class Meta:
        model = DailyAnalytics
        fields = [
            'id', 'date', 'total_rides', 'total_revenue', 'new_clients',
            'new_drivers', 'completed_rides', 'cancelled_rides', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
from rest_framework import serializers
from .models import DailyAnalytics


class DailyAnalyticsSerializer(serializers.ModelSerializer):
    """Serializer for DailyAnalytics model."""
    
    class Meta:
        model = DailyAnalytics
        fields = [
            'id', 'date', 'total_rides', 'total_revenue', 'new_clients',
            'new_drivers', 'completed_rides', 'cancelled_rides', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
