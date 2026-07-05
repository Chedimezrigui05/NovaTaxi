"""Serializers for payments app."""
from rest_framework import serializers
from .models import Payment
from users.serializers import UserSerializer


class PaymentSerializer(serializers.ModelSerializer):
    """Serializer for Payment model."""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Payment
        fields = [
            'id', 'ride', 'user', 'amount', 'status', 'method',
            'transaction_id', 'payment_details', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
