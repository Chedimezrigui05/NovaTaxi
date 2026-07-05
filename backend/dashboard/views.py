"""Views for dashboard app."""
from rest_framework import views, permissions
from rest_framework.response import Response
from django.db.models import Sum, Count, Avg
from django.utils import timezone
from datetime import timedelta
from rides.models import Ride
from users.models import User
from drivers.models import Driver
from payments.models import Payment
from .serializers import DashboardStatsSerializer, DashboardChartDataSerializer
from core.permissions import IsAdmin


class DashboardStatsView(views.APIView):
    """View for dashboard statistics."""
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    
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


class DashboardChartView(views.APIView):
    """View for dashboard chart data."""
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    
    def get(self, request):
        """Get chart data for last 30 days."""
        start_date = timezone.now().date() - timedelta(days=30)
        end_date = timezone.now().date()
        
        chart_data = []
        current_date = start_date
        while current_date <= end_date:
            daily_rides = Ride.objects.filter(
                created_at__date=current_date
            ).count()
            daily_revenue = Payment.objects.filter(
                created_at__date=current_date,
                status='completed'
            ).aggregate(total=Sum('amount'))['total'] or 0
            
            chart_data.append({
                'date': current_date,
                'rides': daily_rides,
                'revenue': daily_revenue
            })
            current_date += timedelta(days=1)
        
        serializer = DashboardChartDataSerializer(chart_data, many=True)
        return Response(serializer.data)
