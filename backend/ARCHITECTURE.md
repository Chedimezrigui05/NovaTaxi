"""NovaTaxi Backend Architecture Documentation

SCALABLE ARCHITECTURE OVERVIEW
==============================

Project Structure:
└── backend/
    ├── manage.py                 # Django management script
    ├── requirements.txt          # Python dependencies
    ├── Dockerfile               # Docker configuration
    ├── .env.example             # Environment variables template
    │
    ├── novataxi/               # Project configuration
    │   ├── __init__.py
    │   ├── settings.py         # Django settings with JWT, DRF, PostgreSQL
    │   ├── urls.py             # Main URL router
    │   ├── asgi.py             # ASGI for async support
    │   └── wsgi.py             # WSGI for production servers
    │
    ├── core/                   # Shared core functionality
    │   ├── models.py           # Abstract base models (TimeStampedModel)
    │   ├── permissions.py      # Custom permission classes
    │   ├── serializers.py      # Base serializers
    │   ├── utils.py            # Utility functions
    │   ├── validators.py       # Custom validators
    │   ├── exceptions.py       # Custom exceptions
    │   ├── pagination.py       # Custom pagination
    │   ├── filters.py          # Custom filters
    │   └── views.py            # Base viewsets
    │
    ├── users/                  # User management
    │   ├── models.py           # Custom User model with roles
    │   ├── serializers.py      # User serializers
    │   ├── views.py            # User viewsets
    │   ├── urls.py             # User URL routing
    │   ├── admin.py            # Django admin configuration
    │   ├── apps.py             # App configuration
    │   └── migrations/         # Database migrations
    │
    ├── clients/                # Client profiles & management
    │   ├── models.py           # Client model
    │   ├── serializers.py      # Client serializers
    │   ├── views.py            # Client viewsets
    │   ├── urls.py             # Client URL routing
    │   ├── admin.py            # Django admin configuration
    │   ├── apps.py             # App configuration
    │   └── migrations/         # Database migrations
    │
    ├── drivers/                # Driver profiles & management
    │   ├── models.py           # Driver model with status/rating
    │   ├── serializers.py      # Driver serializers
    │   ├── views.py            # Driver viewsets
    │   ├── urls.py             # Driver URL routing
    │   ├── admin.py            # Django admin configuration
    │   ├── apps.py             # App configuration
    │   └── migrations/         # Database migrations
    │
    ├── rides/                  # Ride management
    │   ├── models.py           # Ride model (bookings/transactions)
    │   ├── serializers.py      # Ride serializers
    │   ├── views.py            # Ride viewsets
    │   ├── urls.py             # Ride URL routing
    │   ├── admin.py            # Django admin configuration
    │   ├── apps.py             # App configuration
    │   └── migrations/         # Database migrations
    │
    ├── tracking/               # Real-time location tracking
    │   ├── models.py           # Location tracking model
    │   ├── serializers.py      # Tracking serializers
    │   ├── views.py            # Tracking viewsets
    │   ├── urls.py             # Tracking URL routing
    │   ├── admin.py            # Django admin configuration
    │   ├── apps.py             # App configuration
    │   └── migrations/         # Database migrations
    │
    ├── notifications/          # Notifications system
    │   ├── models.py           # Notification model
    │   ├── serializers.py      # Notification serializers
    │   ├── views.py            # Notification viewsets
    │   ├── urls.py             # Notification URL routing
    │   ├── admin.py            # Django admin configuration
    │   ├── apps.py             # App configuration
    │   └── migrations/         # Database migrations
    │
    ├── chat/                   # Chat/Messaging system
    │   ├── models.py           # Message/Chat model
    │   ├── serializers.py      # Chat serializers
    │   ├── views.py            # Chat viewsets
    │   ├── urls.py             # Chat URL routing
    │   ├── admin.py            # Django admin configuration
    │   ├── apps.py             # App configuration
    │   └── migrations/         # Database migrations
    │
    ├── payments/               # Payment processing
    │   ├── models.py           # Payment model
    │   ├── serializers.py      # Payment serializers
    │   ├── views.py            # Payment viewsets
    │   ├── urls.py             # Payment URL routing
    │   ├── admin.py            # Django admin configuration
    │   ├── apps.py             # App configuration
    │   └── migrations/         # Database migrations
    │
    ├── dashboard/              # Analytics dashboard
    │   ├── models.py           # Dashboard metrics model
    │   ├── serializers.py      # Dashboard serializers
    │   ├── views.py            # Dashboard viewsets
    │   ├── urls.py             # Dashboard URL routing
    │   ├── admin.py            # Django admin configuration
    │   ├── apps.py             # App configuration
    │   └── migrations/         # Database migrations
    │
    └── analytics/              # Advanced analytics
        ├── models.py           # Analytics model
        ├── serializers.py      # Analytics serializers
        ├── views.py            # Analytics viewsets
        ├── urls.py             # Analytics URL routing
        ├── admin.py            # Django admin configuration
        ├── apps.py             # App configuration
        └── migrations/         # Database migrations


KEY ARCHITECTURAL DECISIONS
==========================

1. CUSTOM USER MODEL (users/models.py)
   - Extends Django's AbstractUser
   - Includes role field: client, driver, admin
   - Additional fields: phone_number, profile_picture, is_verified
   - Benefit: Flexible user management for multi-role system

2. TIME-STAMPED BASE MODEL (core/models.py)
   - Abstract base model for all data models
   - Provides created_at, updated_at fields automatically
   - Benefit: Consistent audit trail across all entities

3. REST FRAMEWORK CONFIGURATION (settings.py)
   - JWT authentication for stateless API
   - Pagination: 20 items per page
   - Filtering: DjangoFilterBackend, SearchFilter, OrderingFilter
   - Benefit: Scalable, flexible API responses

4. JWT CONFIGURATION (settings.py)
   - Access tokens: 30-minute lifetime
   - Refresh tokens: 1-day lifetime
   - HS256 algorithm
   - Benefit: Secure, stateless authentication

5. DATABASE: PostgreSQL
   - Relational model for complex relationships
   - Connection pooling support
   - Native JSON support
   - Benefit: Production-ready, scalable

6. LOGGING CONFIGURATION
   - Separate loggers for Django and NovaTaxi
   - Configurable via environment variables
   - Console output for container visibility
   - Benefit: Easy debugging and monitoring

7. ENVIRONMENT VARIABLES (.env)
   - Sensitive config externalized
   - 12-factor app compliance
   - Environment-specific settings
   - Benefit: Security, flexibility

8. CORS CONFIGURATION
   - Whitelist-based origin control
   - Supports multiple frontend URLs
   - Credentials allowed for auth
   - Benefit: Security against cross-origin attacks

9. PERMISSIONS (core/permissions.py)
   - IsOwnerOrReadOnly: Object-level ownership checks
   - RoleBasedPermission: Role-based access control
   - IsClientOrDriver: Role-specific endpoints
   - Benefit: Fine-grained access control

10. SERIALIZERS HIERARCHY
    - Base serializer in core for common fields
    - Model-specific serializers in each app
    - Separate create/update serializers when needed
    - Benefit: Code reuse, flexibility


API ENDPOINTS STRUCTURE
=======================

Authentication (no implementation per requirements):
POST   /api/token/                    # Obtain access & refresh tokens
POST   /api/token/refresh/            # Refresh access token
POST   /api/token/verify/             # Verify token validity

Users:
GET    /api/users/                    # List all users (paginated)
POST   /api/users/                    # Create new user
GET    /api/users/{id}/               # Retrieve specific user
PUT    /api/users/{id}/               # Update user
DELETE /api/users/{id}/               # Delete user
GET    /api/users/me/                 # Get current authenticated user

Clients:
GET    /api/clients/                  # List clients
POST   /api/clients/                  # Create client profile
GET    /api/clients/{id}/             # Retrieve client
PUT    /api/clients/{id}/             # Update client
DELETE /api/clients/{id}/             # Delete client

Drivers:
GET    /api/drivers/                  # List drivers
POST   /api/drivers/                  # Create driver profile
GET    /api/drivers/{id}/             # Retrieve driver
PUT    /api/drivers/{id}/             # Update driver
DELETE /api/drivers/{id}/             # Delete driver
GET    /api/drivers/available/        # List available drivers

Rides:
GET    /api/rides/                    # List rides
POST   /api/rides/                    # Create new ride
GET    /api/rides/{id}/               # Retrieve ride
PUT    /api/rides/{id}/               # Update ride
DELETE /api/rides/{id}/               # Cancel ride

Tracking:
GET    /api/tracking/                 # Get location history
POST   /api/tracking/                 # Submit current location
GET    /api/tracking/live/            # WebSocket for live tracking

Notifications:
GET    /api/notifications/            # List notifications
POST   /api/notifications/            # Create notification
PATCH  /api/notifications/{id}/read/  # Mark as read
DELETE /api/notifications/{id}/       # Delete notification

Chat:
GET    /api/chat/                     # List conversations
POST   /api/chat/                     # Start conversation
GET    /api/chat/{id}/messages/       # Get conversation messages
POST   /api/chat/{id}/messages/       # Send message

Payments:
GET    /api/payments/                 # List payments
POST   /api/payments/                 # Create payment
GET    /api/payments/{id}/            # Retrieve payment
POST   /api/payments/{id}/refund/     # Refund payment

Dashboard:
GET    /api/dashboard/stats/          # Get dashboard statistics
GET    /api/dashboard/charts/         # Get chart data

Analytics:
GET    /api/analytics/usage/          # Usage analytics
GET    /api/analytics/revenue/        # Revenue analytics
GET    /api/analytics/drivers/        # Driver analytics


SCALABILITY CONSIDERATIONS
==========================

1. Database Optimization
   - Indexes on frequently queried fields
   - Connection pooling via psycopg2
   - Query optimization in serializers

2. API Performance
   - Pagination to limit response sizes
   - Filtering and search for efficiency
   - Async views for heavy operations

3. Caching Strategy
   - Redis for session storage
   - Query result caching
   - Real-time data (tracking) bypass cache

4. Monitoring & Logging
   - Structured logging with levels
   - Error tracking integration points
   - Request/response logging

5. Security
   - CORS whitelist validation
   - JWT token expiration
   - HTTPS in production
   - Rate limiting (add via django-ratelimit)

6. Deployment
   - Containerized with Docker
   - Environment-based configuration
   - Database migration handling
   - Static file serving


DEPENDENCIES (requirements.txt)
==============================
- Django 5.0+: Web framework
- djangorestframework: REST API
- djangorestframework-simplejwt: JWT auth
- django-cors-headers: CORS handling
- django-environ: Environment variables
- psycopg2-binary: PostgreSQL adapter
- django-filter: API filtering
- Pillow: Image processing (user profiles)
- celery: Async task queue (optional)
- redis: Caching & sessions (optional)


NEXT STEPS TO COMPLETE
======================
1. Implement WebSocket support for live tracking (channels)
2. Add Celery for async tasks (payments, notifications)
3. Implement Redis caching
4. Add comprehensive test suites
5. API documentation (drf-spectacular or drf-yasg)
6. Rate limiting (django-ratelimit)
7. Monitoring (Sentry integration)
8. Load testing with locust
"""
