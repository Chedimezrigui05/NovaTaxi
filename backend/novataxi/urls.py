"""NovaTaxi URL Configuration."""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


def health(request):
    return JsonResponse({'status': 'ok', 'message': 'NovaTaxi API is running'})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', health, name='health'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/users/', include('users.urls', namespace='users')),
    path('api/clients/', include('clients.urls', namespace='clients')),
    path('api/drivers/', include('drivers.urls', namespace='drivers')),
    path('api/rides/', include('rides.urls', namespace='rides')),
    path('api/tracking/', include('tracking.urls', namespace='tracking')),
    path('api/notifications/', include('notifications.urls', namespace='notifications')),
    path('api/chat/', include('chat.urls', namespace='chat')),
    path('api/payments/', include('payments.urls', namespace='payments')),
    path('api/dashboard/', include('dashboard.urls', namespace='dashboard')),
    path('api/analytics/', include('analytics.urls', namespace='analytics')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
