"""URL configuration for tracking app."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DriverLocationViewSet, RideLocationViewSet

app_name = 'tracking'

router = DefaultRouter()
router.register(r'driver-locations', DriverLocationViewSet, basename='driver-location')
router.register(r'ride-locations', RideLocationViewSet, basename='ride-location')

urlpatterns = [
    path('', include(router.urls)),
]

app_name = 'tracking'

router = DefaultRouter()
router.register(r'drivers', DriverLocationViewSet, basename='driver-location')
router.register(r'rides', RideLocationViewSet, basename='ride-location')

urlpatterns = [
    path('', include(router.urls)),
]
