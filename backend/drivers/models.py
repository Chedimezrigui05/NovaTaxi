"""Models for drivers app."""
from django.db import models
from core.models import TimeStampedModel
from users.models import User


class Driver(TimeStampedModel):
    """Driver profile model extending User."""
    
    STATUS_CHOICES = (
        ('available', 'Available'),
        ('busy', 'Busy'),
        ('offline', 'Offline'),
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='driver_profile')
    license_number = models.CharField(max_length=50, unique=True)
    vehicle_type = models.CharField(max_length=50)
    vehicle_model = models.CharField(max_length=100)
    vehicle_plate = models.CharField(max_length=20, unique=True)
    vehicle_color = models.CharField(max_length=30, blank=True, null=True)
    vehicle_year = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='offline')
    current_location = models.CharField(max_length=255, blank=True, null=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.0)
    total_rides = models.IntegerField(default=0)
    
    def __str__(self):
        return f'{self.user.username} - Driver'
