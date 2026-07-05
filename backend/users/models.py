"""Custom User model for NovaTaxi."""
from django.contrib.auth.models import AbstractUser
from django.db import models
from core.models import TimeStampedModel


class User(AbstractUser, TimeStampedModel):
    """Custom User model with additional fields for NovaTaxi."""
    
    ROLE_CHOICES = (
        ('client', 'Client'),
        ('driver', 'Driver'),
        ('admin', 'Admin'),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client')
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-date_joined']

    def __str__(self):
        return f'{self.username} ({self.role})'
