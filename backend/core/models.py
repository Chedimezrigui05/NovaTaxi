"""Core abstract models for NovaTaxi."""
from django.db import models
from django.utils import timezone


class TimeStampedModel(models.Model):
    """Abstract model that provides self-updating `created_at` and `updated_at` fields."""
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True
        ordering = ['-created_at']
