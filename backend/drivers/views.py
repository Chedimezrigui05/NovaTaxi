"""Views for drivers app."""
from rest_framework import viewsets, permissions
from .models import Driver
from .serializers import DriverSerializer


class DriverViewSet(viewsets.ModelViewSet):
    """ViewSet for Driver model."""
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    permission_classes = [permissions.IsAuthenticated]
