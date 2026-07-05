"""Views for tracking app."""
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import DriverLocation, RideLocation
from .serializers import DriverLocationSerializer, RideLocationSerializer
from core.permissions import IsDriver, IsClientOrDriver


class DriverLocationViewSet(viewsets.ModelViewSet):
    """ViewSet for DriverLocation model."""
    queryset = DriverLocation.objects.all()
    serializer_class = DriverLocationSerializer
    permission_classes = [permissions.IsAuthenticated, IsDriver]
    
    def get_queryset(self):
        """Filter locations by driver."""
        return DriverLocation.objects.filter(driver__user=self.request.user)
    
    def perform_create(self, serializer):
        """Associate location with current driver."""
        try:
            driver = self.request.user.driver_profile
            serializer.save(driver=driver)
        except:
            return Response(
                {'error': 'User is not a driver'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=False, methods=['get'], url_path='latest')
    def get_latest_location(self, request):
        """Get latest driver location."""
        try:
            driver = request.user.driver_profile
            location = driver.locations.latest('created_at')
            serializer = self.get_serializer(location)
            return Response(serializer.data)
        except DriverLocation.DoesNotExist:
            return Response(
                {'error': 'No location found'},
                status=status.HTTP_404_NOT_FOUND
            )


class RideLocationViewSet(viewsets.ModelViewSet):
    """ViewSet for RideLocation model."""
    queryset = RideLocation.objects.all()
    serializer_class = RideLocationSerializer
    permission_classes = [permissions.IsAuthenticated, IsClientOrDriver]
    
    def get_queryset(self):
        """Filter ride locations by user's rides."""
        user = self.request.user
        return RideLocation.objects.filter(
            ride__client__user=user
        ) | RideLocation.objects.filter(
            ride__driver__user=user
        )


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
