"""Views for rides app."""
from rest_framework import viewsets, permissions
from .models import Ride
from .serializers import RideSerializer


class RideViewSet(viewsets.ModelViewSet):
    """ViewSet for Ride model."""
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    permission_classes = [permissions.IsAuthenticated]
