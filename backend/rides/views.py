"""Views for rides app."""
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Ride
from .serializers import RideSerializer, RideCreateSerializer
from core.permissions import IsClientOrDriver


class RideViewSet(viewsets.ModelViewSet):
    """ViewSet for Ride model."""
    queryset = Ride.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsClientOrDriver]
    
    def get_serializer_class(self):
        """Use different serializers for different actions."""
        if self.action == 'create':
            return RideCreateSerializer
        return RideSerializer
    
    def get_queryset(self):
        """Filter rides by user."""
        user = self.request.user
        try:
            if user.role == 'client':
                return Ride.objects.filter(client__user=user)
            elif user.role == 'driver':
                return Ride.objects.filter(driver__user=user)
        except:
            pass
        return Ride.objects.none()
    
    def perform_create(self, serializer):
        """Create ride with current client."""
        try:
            client = self.request.user.client_profile
            serializer.save(client=client)
        except:
            return Response(
                {'error': 'User is not a client'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=False, methods=['get'], url_path='active')
    def get_active_rides(self, request):
        """Get active rides for user."""
        rides = self.get_queryset().filter(
            status__in=['requested', 'accepted', 'in_progress']
        )
        serializer = self.get_serializer(rides, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='accept')
    def accept_ride(self, request, pk=None):
        """Accept ride (for drivers)."""
        ride = self.get_object()
        if ride.status != 'requested':
            return Response(
                {'error': f'Cannot accept ride in {ride.status} status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            driver = request.user.driver_profile
            ride.driver = driver
            ride.status = 'accepted'
            ride.save()
            serializer = self.get_serializer(ride)
            return Response(serializer.data)
        except:
            return Response(
                {'error': 'User is not a driver'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=True, methods=['post'], url_path='start')
    def start_ride(self, request, pk=None):
        """Start ride."""
        ride = self.get_object()
        if ride.status != 'accepted':
            return Response(
                {'error': 'Ride must be accepted before starting'},
                status=status.HTTP_400_BAD_REQUEST
            )
        ride.status = 'in_progress'
        ride.started_at = timezone.now()
        ride.save()
        serializer = self.get_serializer(ride)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='complete')
    def complete_ride(self, request, pk=None):
        """Complete ride."""
        ride = self.get_object()
        if ride.status != 'in_progress':
            return Response(
                {'error': 'Only in-progress rides can be completed'},
                status=status.HTTP_400_BAD_REQUEST
            )
        ride.status = 'completed'
        ride.completed_at = timezone.now()
        ride.save()
        serializer = self.get_serializer(ride)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='cancel')
    def cancel_ride(self, request, pk=None):
        """Cancel ride."""
        ride = self.get_object()
        if ride.status == 'completed':
            return Response(
                {'error': 'Cannot cancel completed ride'},
                status=status.HTTP_400_BAD_REQUEST
            )
        ride.status = 'cancelled'
        ride.save()
        serializer = self.get_serializer(ride)
        return Response(serializer.data)
