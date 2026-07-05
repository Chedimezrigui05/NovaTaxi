"""Views for payments app."""
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Payment
from .serializers import PaymentSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    """ViewSet for Payment model."""
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Filter payments by user."""
        return Payment.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Associate payment with current user."""
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'], url_path='process')
    def process_payment(self, request, pk=None):
        """Process payment (placeholder for payment gateway integration)."""
        payment = self.get_object()
        
        if payment.status != 'pending':
            return Response(
                {'error': 'Payment cannot be processed in current status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # TODO: Integrate with payment gateway (Stripe, PayPal, etc.)
        payment.status = 'completed'
        payment.transaction_id = f"TXN_{payment.id}_{request.user.id}"
        payment.save()
        
        serializer = self.get_serializer(payment)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='refund')
    def refund_payment(self, request, pk=None):
        """Refund payment."""
        payment = self.get_object()
        
        if payment.status != 'completed':
            return Response(
                {'error': 'Only completed payments can be refunded'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # TODO: Integrate refund with payment gateway
        payment.status = 'refunded'
        payment.save()
        
        serializer = self.get_serializer(payment)
        return Response(serializer.data)


class PaymentViewSet(viewsets.ModelViewSet):
    """ViewSet for Payment model."""
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
