"""Models for analytics app."""
from django.db import models
from core.models import TimeStampedModel


class DailyAnalytics(TimeStampedModel):
    """Daily analytics model."""
    date = models.DateField(unique=True)
    total_rides = models.IntegerField(default=0)
    total_revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    new_clients = models.IntegerField(default=0)
    new_drivers = models.IntegerField(default=0)
    completed_rides = models.IntegerField(default=0)
    cancelled_rides = models.IntegerField(default=0)
    
    def __str__(self):
        return f'Daily Analytics - {self.date}'
