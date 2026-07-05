"""Models for payments app."""
from django.db import models
from core.models import TimeStampedModel
from users.models import User
from rides.models import Ride


class Payment(TimeStampedModel):
    """Payment model."""
    
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    )
    
    METHOD_CHOICES = (
        ('credit_card', 'Credit Card'),
        ('debit_card', 'Debit Card'),
        ('cash', 'Cash'),
        ('wallet', 'Wallet'),
    )
    
    ride = models.ForeignKey(Ride, on_delete=models.CASCADE, related_name='payments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    method = models.CharField(max_length=20, choices=METHOD_CHOICES)
    transaction_id = models.CharField(max_length=255, blank=True, null=True, unique=True)
    payment_details = models.JSONField(blank=True, null=True)
    
    def __str__(self):
        return f'Payment {self.id} - Ride {self.ride.id} - {self.amount}'
