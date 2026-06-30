from django.urls import path, include
from django.http import JsonResponse

def health(request):
    return JsonResponse({'status': 'ok'})

urlpatterns = [
    path('health/', health),
    # API routes will be added under /api/ ...
    path('api/', include('rest_framework.urls')),
]
