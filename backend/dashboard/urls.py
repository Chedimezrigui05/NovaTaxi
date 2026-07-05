"""URL configuration for dashboard app."""
from django.urls import path
from .views import DashboardStatsView, DashboardChartView

app_name = 'dashboard'

urlpatterns = [
    path('stats/', DashboardStatsView.as_view(), name='stats'),
    path('chart-data/', DashboardChartView.as_view(), name='chart-data'),
]
