"""Models for rides app."""
from django.db import models
from core.models import TimeStampedModel
from users.models import User
from drivers.models import Driver
from clients.models import Client


class Ride(TimeStampedModel):
    """Ride model."""
    
    STATUS_CHOICES = (
        ('requested', 'Requested'),
        ('accepted', 'Accepted'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='rides')
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, related_name='rides', null=True, blank=True)
    pickup_location = models.CharField(max_length=255)
    dropoff_location = models.CharField(max_length=255)
    pickup_latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    pickup_longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    dropoff_latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    dropoff_longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='requested')
    distance = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)  # in km
    duration = models.IntegerField(null=True, blank=True)  # in minutes
    fare = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, choices=[(i, i) for i in range(1, 6)])
    feedback = models.TextField(blank=True, null=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f'Ride {self.id} - {self.client.user.username}'
