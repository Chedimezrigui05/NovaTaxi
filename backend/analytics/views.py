"""Views for analytics app."""
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Avg, Count
from django.utils import timezone
from datetime import timedelta
from .models import DailyAnalytics
from .serializers import DailyAnalyticsSerializer
from rides.models import Ride
from payments.models import Payment
from drivers.models import Driver
from core.permissions import IsAdmin


class DailyAnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for DailyAnalytics model."""
    queryset = DailyAnalytics.objects.all()
    serializer_class = DailyAnalyticsSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    
    @action(detail=False, methods=['get'], url_path='usage')
    def usage_analytics(self, request):
        """Get usage analytics."""
        period = request.query_params.get('period', '30')  # days
        try:
            period = int(period)
        except:
            period = 30
        
        start_date = timezone.now().date() - timedelta(days=period)
        analytics = DailyAnalytics.objects.filter(date__gte=start_date)
        serializer = self.get_serializer(analytics, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='revenue')
    def revenue_analytics(self, request):
        """Get revenue analytics."""
        period = request.query_params.get('period', '30')
        try:
            period = int(period)
        except:
            period = 30
        
        start_date = timezone.now().date() - timedelta(days=period)
        analytics = DailyAnalytics.objects.filter(date__gte=start_date)
        
        total_revenue = analytics.aggregate(Sum('total_revenue'))['total_revenue__sum'] or 0
        avg_revenue = analytics.aggregate(Avg('total_revenue'))['total_revenue__avg'] or 0
        
        return Response({
            'total_revenue': total_revenue,
            'average_daily_revenue': avg_revenue,
            'period_days': period
        })
    
    @action(detail=False, methods=['get'], url_path='drivers')
    def driver_analytics(self, request):
        """Get driver analytics."""
        total_drivers = Driver.objects.count()
        available_drivers = Driver.objects.filter(status='available').count()
        busy_drivers = Driver.objects.filter(status='busy').count()
        offline_drivers = Driver.objects.filter(status='offline').count()
        
        avg_rating = Driver.objects.aggregate(Avg('rating'))['rating__avg'] or 0
        
        return Response({
            'total_drivers': total_drivers,
            'available_drivers': available_drivers,
            'busy_drivers': busy_drivers,
            'offline_drivers': offline_drivers,
            'average_rating': float(avg_rating)
        })
