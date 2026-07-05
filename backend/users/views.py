"""Views for users app."""
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer, UserCreateSerializer


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for User model."""
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permission() for permission in self.permission_classes]
    
    @action(detail=False, methods=['get'], url_path='me')
    def get_current_user(self, request):
        """Get current authenticated user."""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
