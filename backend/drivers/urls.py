"""URL configuration for drivers app."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DriverViewSet

app_name = 'drivers'

router = DefaultRouter()
router.register(r'', DriverViewSet, basename='driver')

urlpatterns = [
    path('', include(router.urls)),
]
