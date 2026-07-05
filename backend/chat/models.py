"""Models for chat app."""
from django.db import models
from core.models import TimeStampedModel
from users.models import User
from rides.models import Ride


class ChatRoom(TimeStampedModel):
    """Chat room model for a ride."""
    ride = models.OneToOneField(Ride, on_delete=models.CASCADE, related_name='chat_room')
    participants = models.ManyToManyField(User, related_name='chat_rooms')
    
    def __str__(self):
        return f'Chat Room for Ride {self.ride.id}'


class Message(TimeStampedModel):
    """Message model for chat."""
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    read_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f'Message from {self.sender.username} - {self.created_at}'
