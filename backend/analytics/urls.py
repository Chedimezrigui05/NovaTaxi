"""URL configuration for analytics app."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DailyAnalyticsViewSet

app_name = 'analytics'

router = DefaultRouter()
router.register(r'daily', DailyAnalyticsViewSet, basename='daily-analytics')

urlpatterns = [
    path('', include(router.urls)),
]
