"""Serializers for dashboard app."""
from rest_framework import serializers


class DashboardStatsSerializer(serializers.Serializer):
    """Serializer for dashboard statistics."""
    total_rides = serializers.IntegerField()
    total_clients = serializers.IntegerField()
    total_drivers = serializers.IntegerField()
    total_revenue = serializers.DecimalField(max_digits=12, decimal_places=2)
    rides_today = serializers.IntegerField()
    revenue_today = serializers.DecimalField(max_digits=12, decimal_places=2)
    active_drivers = serializers.IntegerField()
    pending_rides = serializers.IntegerField()
