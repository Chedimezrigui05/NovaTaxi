"""Views for analytics app."""
from rest_framework import viewsets, permissions
from .models import DailyAnalytics
from .serializers import DailyAnalyticsSerializer


class DailyAnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for DailyAnalytics model (read-only)."""
    queryset = DailyAnalytics.objects.all()
    serializer_class = DailyAnalyticsSerializer
    permission_classes = [permissions.IsAdminUser]
