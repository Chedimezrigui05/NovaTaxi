"""URL configuration for users app."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    RegisterView,
    LoginView,
    RefreshTokenView,
    LogoutView,
    ChangePasswordView,
    PasswordResetView,
    PasswordResetConfirmView,
    VerifyEmailView,
    ResendVerificationEmailView,
    CurrentUserView,
)

app_name = 'users'

# Router for ViewSets
router = DefaultRouter()
router.register(r'', UserViewSet, basename='user')

# Auth endpoints (non-viewset)
auth_patterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('refresh/', RefreshTokenView.as_view(), name='refresh'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('resend-verification/', ResendVerificationEmailView.as_view(), name='resend-verification'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
]

urlpatterns = auth_patterns + [
    path('', include(router.urls)),
]
