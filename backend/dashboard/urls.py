"""URL configuration for dashboard app."""
from django.urls import path
from .views import DashboardStatsView

app_name = 'dashboard'

urlpatterns = [
    path('stats/', DashboardStatsView.as_view(), name='stats'),
]
