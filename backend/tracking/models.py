"""Models for tracking app."""
from django.db import models
from core.models import TimeStampedModel
from drivers.models import Driver
from rides.models import Ride


class DriverLocation(TimeStampedModel):
    """Driver location tracking model."""
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name='locations')
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    speed = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # in km/h
    heading = models.IntegerField(null=True, blank=True)  # 0-360 degrees
    accuracy = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # in meters
    
    def __str__(self):
        return f'{self.driver.user.username} - {self.created_at}'


class RideLocation(TimeStampedModel):
    """Ride location tracking model."""
    ride = models.ForeignKey(Ride, on_delete=models.CASCADE, related_name='locations')
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    
    def __str__(self):
        return f'Ride {self.ride.id} - {self.created_at}'
