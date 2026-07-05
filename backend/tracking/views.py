"""Views for tracking app."""
from rest_framework import viewsets, permissions
from .models import DriverLocation, RideLocation
from .serializers import DriverLocationSerializer, RideLocationSerializer


class DriverLocationViewSet(viewsets.ModelViewSet):
    """ViewSet for DriverLocation model."""
    queryset = DriverLocation.objects.all()
    serializer_class = DriverLocationSerializer
    permission_classes = [permissions.IsAuthenticated]


class RideLocationViewSet(viewsets.ModelViewSet):
    """ViewSet for RideLocation model."""
    queryset = RideLocation.objects.all()
    serializer_class = RideLocationSerializer
    permission_classes = [permissions.IsAuthenticated]
