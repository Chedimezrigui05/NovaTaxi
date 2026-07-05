"""Models for clients app."""
from django.db import models
from core.models import TimeStampedModel
from users.models import User


class Client(TimeStampedModel):
    """Client profile model extending User."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='client_profile')
    home_address = models.TextField(blank=True, null=True)
    work_address = models.TextField(blank=True, null=True)
    preferred_payment_method = models.CharField(max_length=50, blank=True, null=True)
    
    def __str__(self):
        return f'{self.user.username} - Client'
