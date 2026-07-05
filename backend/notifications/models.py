"""Models for notifications app."""
from django.db import models
from core.models import TimeStampedModel
from users.models import User


class Notification(TimeStampedModel):
    """Notification model."""
    
    TYPE_CHOICES = (
        ('ride_request', 'Ride Request'),
        ('ride_accepted', 'Ride Accepted'),
        ('ride_started', 'Ride Started'),
        ('ride_completed', 'Ride Completed'),
        ('ride_cancelled', 'Ride Cancelled'),
        ('payment_received', 'Payment Received'),
        ('new_message', 'New Message'),
        ('system', 'System'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    type = models.CharField(max_length=30, choices=TYPE_CHOICES)
    title = models.CharField(max_length=255)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    read_at = models.DateTimeField(null=True, blank=True)
    related_object_id = models.IntegerField(null=True, blank=True)
    related_object_type = models.CharField(max_length=50, null=True, blank=True)
    
    def __str__(self):
        return f'Notification for {self.user.username} - {self.type}'
