"""Views for dashboard app."""
from rest_framework import views, permissions
from rest_framework.response import Response
from django.db.models import Sum, Count
from django.utils import timezone
from rides.models import Ride
from users.models import User
from drivers.models import Driver
from payments.models import Payment
from .serializers import DashboardStatsSerializer


class DashboardStatsView(views.APIView):
    """View for dashboard statistics."""
    permission_classes = [permissions.IsAdminUser]
    
    def get(self, request):
        """Get dashboard statistics."""
        today = timezone.now().date()
        
        total_rides = Ride.objects.count()
        total_clients = User.objects.filter(role='client').count()
        total_drivers = User.objects.filter(role='driver').count()
        total_revenue = Payment.objects.filter(status='completed').aggregate(Sum('amount'))['amount__sum'] or 0
        rides_today = Ride.objects.filter(created_at__date=today).count()
        revenue_today = Payment.objects.filter(status='completed', created_at__date=today).aggregate(Sum('amount'))['amount__sum'] or 0
        active_drivers = Driver.objects.filter(status='available').count()
        pending_rides = Ride.objects.filter(status='requested').count()
        
        data = {
            'total_rides': total_rides,
            'total_clients': total_clients,
            'total_drivers': total_drivers,
            'total_revenue': total_revenue,
            'rides_today': rides_today,
            'revenue_today': revenue_today,
            'active_drivers': active_drivers,
            'pending_rides': pending_rides,
        }
        
        serializer = DashboardStatsSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        return Response(serializer.data)
