"""
NOVATAXI BACKEND - COMPLETE SETUP GUIDE & EXPLANATIONS

This document provides complete explanations for every file, folder, and configuration
in the NovaTaxi backend architecture.

================================================================================
PART 1: PROJECT STRUCTURE & FILE EXPLANATIONS
================================================================================

ROOT DIRECTORY: backend/
├── manage.py                 # Django management script
│                             # Used for: migrations, running server, creating superuser
│                             # Command: python manage.py <command>
│
├── requirements.txt          # Python dependencies list
│                             # Contains: Django, DRF, JWT, PostgreSQL driver, etc.
│                             # Install with: pip install -r requirements.txt
│
├── Dockerfile               # Docker image definition
│                             # Builds containerized Python app
│                             # Used by: docker-compose.yml
│
├── .env.example             # Environment variables template
│                             # NEVER commit .env file!
│                             # Copy to .env and update values
│
├── ARCHITECTURE.md          # Complete architecture documentation
│                             # Details: design decisions, scalability, future enhancements
│
└── novataxi/                # Main Django project configuration
    ├── __init__.py          # Makes novataxi a Python package
    ├── settings.py          # Central Django configuration
    │                         # Contains: DATABASE, INSTALLED_APPS, REST_FRAMEWORK config
    ├── urls.py              # Root URL router
    │                         # Maps: /api/* paths to app routers
    ├── asgi.py              # ASGI application (async support)
    └── wsgi.py              # WSGI application (production servers like Gunicorn)


================================================================================
CORE APP: core/
Provides shared functionality for all other apps
================================================================================

core/models.py
  - TimeStampedModel: Abstract base model
    * EXTENDS: models.Model
    * PURPOSE: Automatic audit trail for all entities
    * FIELDS:
      - created_at: timestamp when created (auto)
      - updated_at: timestamp when last modified (auto)
    * USAGE: All models inherit from this for automatic timestamps
    * EXAMPLE: class Client(TimeStampedModel) adds timestamps automatically

core/permissions.py
  - IsOwnerOrReadOnly: Object-level ownership checks
    * ALLOWS: GET/HEAD/OPTIONS for everyone, editing only for owner
    * USE CASE: Users editing their own profiles
  - IsClient: Only users with role='client'
    * USE CASE: Client-only endpoints
  - IsDriver: Only users with role='driver'
    * USE CASE: Driver-only endpoints
  - IsAdmin: Only admins or superusers
    * USE CASE: Dashboard and admin endpoints
  - IsClientOrDriver: Either client or driver (excludes admins)
    * USE CASE: Ride-related endpoints (both sides)
  - IsOwner: User owns the specific object instance
    * USE CASE: Profile ownership checks

core/serializers.py
  - BaseSerializer: Reusable base with common fields
    * PROVIDES: created_at, updated_at (read-only)
    * BENEFIT: Don't repeat these fields in every serializer
  - UserBasicSerializer: Minimal user info for nesting
    * FIELDS: id, username, email, first_name, last_name, role
    * USE: When embedding user data in other responses

core/validators.py
  - validate_phone_number(): Validates phone format
  - validate_vehicle_plate(): Validates license plate format
  - validate_license_number(): Validates driver license format
  - validate_latitude/longitude(): Ensures valid GPS coordinates
  - PURPOSE: Reusable validation logic across apps

core/utils.py
  - send_email_notification(): Send emails (uses Django's send_mail)
  - calculate_distance(): Haversine formula for GPS distance
  - format_currency(): Format amounts as currency
  - get_client_ip(): Extract client IP from request
  - PURPOSE: Common utility functions

core/pagination.py
  - StandardPagination: 20 items per page (default)
  - LargeResultsSetPagination: 100 items per page
  - SmallResultsSetPagination: 5 items per page
  - StandardCursorPagination: Cursor-based (better performance)
  - PURPOSE: Reusable pagination configurations

core/filters.py
  - BaseFilter: Date range filtering foundation
  - DateRangeFilter: Filter by created_at date range
  - PURPOSE: Common filter logic for querysets

core/exceptions.py
  - BusinessLogicException: Custom 400 error
  - ResourceNotAvailableException: Custom 409 error (conflict)
  - InvalidStatusTransitionException: Custom 400 error
  - InsufficientCreditsException: Custom 402 error (payment required)
  - PURPOSE: Consistent error handling across API

core/views.py
  - BaseViewSet: Base viewset with common CRUD logic
  - ReadOnlyViewSet: For read-only endpoints
  - PURPOSE: DRY principle for view implementations

core/apps.py
  - CoreConfig: App configuration class
  - PURPOSE: Django app metadata


================================================================================
USERS APP: users/
Custom user management with role-based access
================================================================================

users/models.py
  - User: Custom user model extending Django's AbstractUser
    * REPLACES: Django's built-in User model
    * FIELDS:
      - username, password: Standard auth (from AbstractUser)
      - email, first_name, last_name: Standard (from AbstractUser)
      - role: 'client', 'driver', or 'admin' - determines access level
      - phone_number: Contact number (optional)
      - profile_picture: Image file for user avatar
      - is_verified: Email verification status
    * TIMESTAMPS: created_at, updated_at (from TimeStampedModel)
    * CONFIGURATION: Set in settings.py as AUTH_USER_MODEL = 'users.User'
    * WHY CUSTOM: Needed role field for multi-tenant system

users/serializers.py
  - UserSerializer: Full user data (read-only nested fields)
    * FIELDS: id, username, email, role, phone_number, etc.
    * READ_ONLY: id, date_joined, is_verified
    * USE: Retrieving user info
  - UserCreateSerializer: For registration with validation
    * REQUIRES: password, password_confirm (must match)
    * VALIDATES: Passwords match before creation
    * HASHES: Password automatically using create_user()

users/views.py
  - UserViewSet: Full CRUD operations on users
    * GET /api/users/: List all users
    * POST /api/users/: Create new user (public - AllowAny)
    * GET /api/users/{id}/: Retrieve specific user
    * PUT /api/users/{id}/: Update user
    * DELETE /api/users/{id}/: Delete user
    * GET /api/users/me/: Get current authenticated user (custom action)
    * LOGIC: Uses different serializers for create vs. retrieve

users/admin.py
  - UserAdmin: Custom Django admin interface
    * DISPLAYS: username, email, role, is_verified, is_staff
    * SEARCHABLE: username, email, name, phone_number
    * FILTERABLE: role, is_verified, is_staff, date_joined
    * ORDERED: By date_joined (newest first)

users/apps.py
  - UsersConfig: App configuration


================================================================================
CLIENTS APP: clients/
Client profile management
================================================================================

clients/models.py
  - Client: Client profile (1:1 relation to User)
    * RELATION: OneToOneField(User, related_name='client_profile')
    * FIELDS:
      - user: Link to User model
      - home_address: Saved home location
      - work_address: Saved work location
      - preferred_payment_method: Default payment option
    * TIMESTAMPS: created_at, updated_at
    * WHY SEPARATE: Keeps user auth separate from profile data

clients/serializers.py
  - ClientSerializer: Returns client data with nested user info
    * NESTED: Includes full user details
    * FIELDS: user, addresses, payment_method, timestamps
    * READ_ONLY: id, user, created_at

clients/views.py
  - ClientViewSet: CRUD for client profiles
    * PERMISSION: IsAuthenticated only
    * FILTERS: Automatically by user (can't see other's profiles)
    * USE: Manage client addresses and preferences

clients/admin.py
  - ClientAdmin: Admin interface for client management
    * DISPLAYS: user, addresses, created_at
    * SEARCHABLE: username, email, address


================================================================================
DRIVERS APP: drivers/
Driver profile with status and rating tracking
================================================================================

drivers/models.py
  - Driver: Driver profile with operational fields
    * RELATION: OneToOneField(User, related_name='driver_profile')
    * STATUS: 'available', 'busy', 'offline' - tracked from app
    * VEHICLE FIELDS:
      - license_number: Driver's license (unique)
      - vehicle_type: 'sedan', 'suv', 'van', etc.
      - vehicle_model: 'Toyota Camry', etc.
      - vehicle_plate: License plate (unique, validated)
      - vehicle_color: For identification
      - vehicle_year: Vehicle age
    * METRICS:
      - current_location: Last known GPS location (updated per request)
      - rating: Average rating (1-5 stars, starts at 5.0)
      - total_rides: Lifetime ride count (for sorting)
    * TIMESTAMPS: created_at, updated_at

drivers/serializers.py
  - DriverSerializer: Full driver profile with user data
    * NESTED: Full user information
    * READ_ONLY: rating, total_rides (calculated fields)
    * INCLUDES: Vehicle and operational data

drivers/views.py
  - DriverViewSet: CRUD for driver profiles
    * CUSTOM ACTION: available/ - List drivers with status='available'
    * PERMISSION: IsAuthenticated
    * FILTER: Can't edit other drivers' profiles

drivers/admin.py
  - DriverAdmin: Admin dashboard for drivers
    * DISPLAYS: User, license, vehicle plate, status, rating, rides
    * SEARCHABLE: Username, license, vehicle
    * FILTERABLE: Status, rating range, date_joined


================================================================================
RIDES APP: rides/
Core ride booking and completion system
================================================================================

rides/models.py
  - Ride: Represents a single ride transaction
    * PARTICIPANTS:
      - client: Who requested the ride (FK → Client)
      - driver: Who accepted the ride (FK → Driver, nullable initially)
    * LOCATIONS:
      - pickup_location: Street address (text)
      - dropoff_location: Street address (text)
      - pickup_latitude/longitude: GPS coordinates
      - dropoff_latitude/longitude: GPS coordinates
    * RIDE METRICS:
      - status: Flow: requested→accepted→in_progress→completed/cancelled
      - distance: Calculated distance in km
      - duration: Estimated/actual time in minutes
      - fare: Price charged to client
      - started_at: When driver started driving
      - completed_at: When ride finished
    * FEEDBACK:
      - rating: 1-5 star rating by client
      - feedback: Text feedback comment
    * TIMESTAMPS: created_at, updated_at

rides/serializers.py
  - RideSerializer: Full ride details with nested client/driver
  - RideCreateSerializer: For creating new rides (simplified)

rides/views.py
  - RideViewSet: Complete ride lifecycle management
    * ACTIONS:
      - accept_ride: Driver accepts pending ride
      - start_ride: Begin tracking ride
      - complete_ride: Mark ride as done
      - cancel_ride: Cancel any non-completed ride
      - get_active_rides: Get ongoing rides
    * FILTERING: Users see only their own rides
    * LOGIC: Status validation at each step

rides/admin.py
  - RideAdmin: Admin oversight of rides
    * DISPLAYS: Ride ID, participants, status, fare, distance


================================================================================
TRACKING APP: tracking/
Real-time location tracking
================================================================================

tracking/models.py
  - DriverLocation: Timestamped GPS location points
    * RECORD: Every location update from driver app
    * FIELDS:
      - driver: FK to driver
      - latitude/longitude: GPS coordinates
      - speed: Km/h at point (for speed monitoring)
      - heading: 0-360 degrees (direction)
      - accuracy: GPS accuracy in meters
    * USE: Build live map, route visualization, speed alerts
  - RideLocation: Track ride's actual path
    * RECORD: Driver's location points during ride
    * LINKED: To specific ride for history

tracking/serializers.py
  - DriverLocationSerializer: Serializes location with metadata
  - RideLocationSerializer: Ride history locations

tracking/views.py
  - DriverLocationViewSet: Driver location endpoints
    * CUSTOM ACTION: latest/ - Get driver's most recent location
    * PERMISSION: IsDriver - Only drivers can submit locations
  - RideLocationViewSet: Ride history locations
    * FILTERING: Auto-filter to user's rides only
    * USE: History of ride path taken

tracking/admin.py
  - Admins can see all location history for debugging/support


================================================================================
NOTIFICATIONS APP: notifications/
System-wide notification delivery
================================================================================

notifications/models.py
  - Notification: Message to user about events
    * TYPES: ride_request, ride_accepted, ride_completed, payment_received, etc.
    * FIELDS:
      - user: FK to recipient
      - type: Event type (choices)
      - title: Short notification title
      - message: Detailed message text
      - is_read: Read status (default False)
      - read_at: When user read it (nullable)
      - related_object_id/type: Reference to ride/payment/etc for linking
    * CREATION: Auto-triggered by ride state changes (via signals, not yet impl)

notifications/serializers.py
  - NotificationSerializer: Includes read status and metadata

notifications/views.py
  - NotificationViewSet: User notification management
    * ACTIONS:
      - get_unread: List unread notifications with count
      - mark_as_read: Mark one notification read
      - mark_all_as_read: Bulk mark all as read (with timestamp)
    * FILTERING: Each user sees only their notifications

notifications/admin.py
  - Support team can send/manage notifications from admin


================================================================================
CHAT APP: chat/
In-app messaging between ride participants
================================================================================

chat/models.py
  - ChatRoom: Conversation space for a ride
    * 1:1 relation to Ride
    * participants: ManyToMany to User (driver + client)
  - Message: Individual messages
    * FIELDS:
      - room: FK to ChatRoom
      - sender: FK to User
      - content: Message text
      - is_read: Read status
      - read_at: When recipient read it
    * ORDERING: By created_at (oldest first)

chat/serializers.py
  - MessageSerializer: Individual messages with sender info
  - ChatRoomSerializer: Full room with all messages and participants

chat/views.py
  - ChatRoomViewSet: Room management
    * CUSTOM ACTIONS:
      - send_message: Post new message to room
      - get_messages: Retrieve conversation history
    * FILTERING: User sees only rooms they're in
  - MessageViewSet: Individual message operations
    * mark_as_read: Recipient marks message as read

chat/admin.py
  - Support team can view all conversations for mediation


================================================================================
PAYMENTS APP: payments/
Payment transaction tracking
================================================================================

payments/models.py
  - Payment: Financial transaction record
    * FIELDS:
      - ride: FK to associated Ride
      - user: FK to User (who paid)
      - amount: Transaction amount
      - status: pending→completed/failed/refunded
      - method: credit_card, debit_card, cash, wallet
      - transaction_id: Payment gateway transaction ID (unique)
      - payment_details: JSON field for gateway responses
    * PURPOSE: Reconciliation, audit trail, charge disputes

payments/serializers.py
  - PaymentSerializer: Full payment details
    * READ_ONLY: user (set automatically), transaction_id (generated)

payments/views.py
  - PaymentViewSet: Payment operations
    * ACTIONS:
      - process_payment: Submit to payment gateway (placeholder)
      - refund_payment: Reverse a completed payment
    * TODO: Integrate Stripe, PayPal, or other gateway
    * LOGIC: Status validation (can't refund pending payment, etc.)

payments/admin.py
  - Finance team monitors payments, reconciliation, disputes


================================================================================
DASHBOARD APP: dashboard/
Admin analytics overview
================================================================================

dashboard/views.py
  - DashboardStatsView: Real-time statistics
    * CALCULATES:
      - total_rides: All rides ever
      - total_clients/drivers: All registered
      - total_revenue: Sum of completed payments
      - rides_today: Today's rides
      - revenue_today: Today's earnings
      - active_drivers: Count with status='available'
      - pending_rides: Rides awaiting driver
    * PERMISSION: IsAdmin only
  - DashboardChartView: Historical trend data
    * DATA: Last 30 days of rides and revenue
    * USE: Line charts for KPI trends

dashboard/serializers.py
  - DashboardStatsSerializer: Response structure for stats
  - DashboardChartDataSerializer: Daily data points

dashboard/urls.py
  - /stats/: Real-time metrics
  - /chart-data/: 30-day history


================================================================================
ANALYTICS APP: analytics/
Historical analytics and insights
================================================================================

analytics/models.py
  - DailyAnalytics: Aggregated daily metrics
    * RECORD: One record per date
    * FIELDS: date (unique), total_rides, total_revenue, new_clients,
      new_drivers, completed/cancelled rides
    * PURPOSE: Fast historical queries (aggregated vs raw rides)
    * CREATION: Nightly batch job (to be implemented)

analytics/serializers.py
  - DailyAnalyticsSerializer: Serialize daily aggregate data

analytics/views.py
  - DailyAnalyticsViewSet: Analytics read operations
    * ACTIONS:
      - usage_analytics: Query rides by period (30 days default)
      - revenue_analytics: Calculate total, average revenue
      - driver_analytics: Driver count, availability, avg rating
    * PERMISSION: IsAdmin
    * USE CASE: C-level dashboards, business reports


================================================================================
PART 2: CONFIGURATION FILES
================================================================================

novataxi/settings.py - EXPLAINED SECTION BY SECTION

# INSTALLED_APPS
django.contrib.*: Django built-in apps (admin, auth, sessions, etc.)
rest_framework: Django REST Framework for APIs
rest_framework_simplejwt: JWT token authentication
corsheaders: Handle CORS for frontend
django_filters: API filtering capabilities
core, users, clients, drivers, rides, tracking, notifications, chat, payments, dashboard, analytics: Our custom apps

# DATABASES
DATABASE_URL: Environment variable with PostgreSQL connection string
Format: postgres://user:password@host:port/database
psycopg2-binary: Python PostgreSQL driver

# AUTH_USER_MODEL = 'users.User'
Tells Django to use our custom User model instead of default

# REST_FRAMEWORK Configuration
DEFAULT_AUTHENTICATION_CLASSES: JWT + SessionAuth (fallback)
DEFAULT_PERMISSION_CLASSES: IsAuthenticated (user must be logged in)
DEFAULT_PAGINATION_CLASS: 20 items per page by default
DEFAULT_FILTER_BACKENDS: DjangoFilterBackend, SearchFilter, OrderingFilter

# SIMPLE_JWT Configuration
ACCESS_TOKEN_LIFETIME: 30 minutes (short-lived)
REFRESH_TOKEN_LIFETIME: 1 day (long-lived)
ALGORITHM: HS256 (HMAC-SHA256)
SIGNING_KEY: Uses SECRET_KEY for token signing
ROTATE_REFRESH_TOKENS: Disabled (stateless)
UPDATE_LAST_LOGIN: Track login time
USER_ID_FIELD: 'id' (what identifies user in token)
USER_ID_CLAIM: 'user_id' (claim name in JWT payload)

# LOGGING Configuration
Two loggers:
  - django: Framework logs (INFO level default)
  - novataxi: Application logs (DEBUG level default)
Console handler: Output visible in Docker/terminal
Formatters: verbose (timestamp + module) or simple

# CORS_ALLOWED_ORIGINS
Whitelist of frontend domains allowed to access API
Example: http://localhost:3000,https://app.example.com
Must match frontend URL exactly

# MEDIA & STATIC FILES
MEDIA_URL/ROOT: User uploads (profile pictures, etc.)
STATIC_URL/ROOT: CSS, JS, images (served by frontend in production)


novataxi/urls.py - URL ROUTING

Pattern: /api/{app}/{resource}/ maps to each app's router

/api/token/ → JWT token endpoints (DRF Simple JWT)
/api/users/ → Users app router
/api/clients/ → Clients app router
/api/drivers/ → Drivers app router
/api/rides/ → Rides app router
/api/tracking/ → Tracking app router
/api/notifications/ → Notifications app router
/api/chat/ → Chat app router
/api/payments/ → Payments app router
/api/dashboard/ → Dashboard app
/api/analytics/ → Analytics app router

Each app uses DefaultRouter which auto-generates:
  GET /{resource}/            → List + Create
  GET /{resource}/{id}/       → Retrieve
  PUT /{resource}/{id}/       → Update
  PATCH /{resource}/{id}/     → Partial Update
  DELETE /{resource}/{id}/    → Delete
  Plus custom @action endpoints


================================================================================
PART 3: SETUP & DEPLOYMENT
================================================================================

INITIAL SETUP

1. Copy .env.example → .env
2. Update database credentials in .env
3. Create Python virtual environment
4. Install dependencies: pip install -r requirements.txt
5. Run migrations: python manage.py migrate
6. Create superuser: python manage.py createsuperuser
7. Run server: python manage.py runserver
8. Access admin: http://localhost:8000/admin
9. Test API: http://localhost:8000/api/users/

DOCKER SETUP

1. docker-compose up -d
2. docker-compose exec backend python manage.py migrate
3. docker-compose exec backend python manage.py createsuperuser
4. Access: http://localhost:8000

ENVIRONMENT VARIABLES (.env)

DEBUG: Set to False for production
SECRET_KEY: Generate with: python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
DATABASE_URL: PostgreSQL connection string
ALLOWED_HOSTS: Comma-separated list of domains
CORS_ALLOWED_ORIGINS: Comma-separated list of frontend URLs
JWT_ACCESS_TOKEN_LIFETIME_MINUTES: 30
JWT_REFRESH_TOKEN_LIFETIME_DAYS: 1
DJANGO_LOG_LEVEL: INFO or DEBUG
NOVATAXI_LOG_LEVEL: DEBUG or INFO


================================================================================
PART 4: API AUTHENTICATION ARCHITECTURE (Not Implemented per Requirements)
================================================================================

NOTE: Authentication endpoints are available but implementation not required.

Token Flow (when implemented):
1. POST /api/token/
   - Input: username, password
   - Output: access_token, refresh_token
2. Use access_token in Authorization header: "Bearer {access_token}"
3. When token expires (30 min), POST /api/token/refresh/
   - Input: refresh_token
   - Output: new access_token
4. POST /api/token/verify/
   - Input: token
   - Output: token_type_id
   - Use: Validate token client-side

JWT Payload Structure (when implemented):
{
  "token_type": "access",
  "exp": 1234567890,        # Expiration time
  "iat": 1234567800,        # Issued at
  "jti": "abc123",          # JWT ID
  "user_id": 5,             # User's database ID
  "username": "john_driver",# User's username
}

Every API request needs: Authorization: Bearer {token} header


================================================================================
PART 5: PERMISSION SYSTEM EXPLAINED
================================================================================

HIERARCHY:

1. Authentication Level
   - IsAuthenticated: User must be logged in
   - AllowAny: No authentication needed

2. Role Level  
   - IsClient: User role == 'client'
   - IsDriver: User role == 'driver'
   - IsAdmin: User role == 'admin' or is_superuser
   - IsClientOrDriver: Either client or driver

3. Object Level
   - IsOwner: req.user == obj.user
   - IsOwnerOrReadOnly: Can view (GET) or edit if owner
   - IsOwnerProfile: Edit own profile only

USAGE EXAMPLE:

class RideViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsClientOrDriver]
    # Only authenticated users who are client or driver can access
    # They can only see their own rides (filtered in get_queryset)


================================================================================
PART 6: SERIALIZER PATTERNS
================================================================================

PATTERN 1: Nested Relationships

class RideSerializer(ModelSerializer):
    client = ClientSerializer(read_only=True)  # Nested full data
    driver = DriverSerializer(read_only=True)
    # When retrieving a ride, includes full client/driver objects
    # When creating/updating, ignore these fields (read_only)

PATTERN 2: Separate Create/Update Serializers

class RideCreateSerializer(ModelSerializer):
    # Simplified for creation: only client locations
    # Can't edit driver (assigned by system)
    
class RideSerializer(ModelSerializer):
    # Full serializer for retrieval: includes driver, status, timestamps

ViewSet determines which to use:
    def get_serializer_class(self):
        if self.action == 'create':
            return RideCreateSerializer
        return RideSerializer

PATTERN 3: Read-Only Fields

class UserSerializer(ModelSerializer):
    class Meta:
        fields = ['id', 'username', 'email', 'date_joined']
        read_only_fields = ['id', 'date_joined']
    # Users can't set their own ID or join date - auto-managed


================================================================================
PART 7: VIEWSET ACTIONS
================================================================================

STANDARD CRUD (auto-generated by DefaultRouter)

GET    /resource/              → list()           List all
POST   /resource/              → create()         Create one
GET    /resource/{id}/         → retrieve()       Get one
PUT    /resource/{id}/         → update()         Replace all fields
PATCH  /resource/{id}/         → partial_update() Update some fields
DELETE /resource/{id}/         → destroy()        Delete one

CUSTOM ACTIONS (@action decorator)

@action(detail=False, methods=['get'])          # List-level action
def custom_action(self, request):               # /resource/custom_action/
    ...

@action(detail=True, methods=['post'])          # Object-level action
def custom_action(self, request, pk=None):      # /resource/{id}/custom_action/
    resource = self.get_object()
    ...

EXAMPLE from RideViewSet:

@action(detail=True, methods=['post'])
def accept_ride(self, request, pk=None):
    ride = self.get_object()
    # POST /api/rides/{id}/accept/ - driver accepts ride


================================================================================
PART 8: QUERY OPTIMIZATION
================================================================================

PREFETCHING (Reduce Database Queries)

class RideViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return Ride.objects.prefetch_related(
            'client',      # Fetch client in one query
            'driver',      # Fetch driver in one query
        )
# Without prefetch: 1 query for rides + N queries for clients = N+1 total
# With prefetch: 1 query for rides + 1 query for clients = 2 total

FILTERING (Let Database Filter)

class RideViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        user = self.request.user
        # Only user's rides (filter in database, not in Python)
        return Ride.objects.filter(
            Q(client__user=user) | Q(driver__user=user)
        )


================================================================================
PART 9: EXTENDING THE SYSTEM
================================================================================

TO ADD A NEW APP (e.g., 'reviews'):

1. python manage.py startapp reviews
2. Create reviews/models.py with Review model
3. Create reviews/serializers.py with ReviewSerializer
4. Create reviews/views.py with ReviewViewSet
5. Create reviews/urls.py with router
6. Create reviews/admin.py with ReviewAdmin
7. Add 'reviews' to INSTALLED_APPS in settings.py
8. Add reviews URL to novataxi/urls.py
9. Create migration: python manage.py makemigrations reviews
10. Apply migration: python manage.py migrate

TO ADD A NEW FIELD:

1. Update model: class Ride(TimeStampedModel): new_field = models.CharField(...)
2. Update serializer: Add 'new_field' to fields list
3. Create migration: python manage.py makemigrations
4. Apply migration: python manage.py migrate
5. Update admin if needed


================================================================================
PART 10: TROUBLESHOOTING
================================================================================

ERROR: relation \"users_user\" does not exist
CAUSE: Migrations not run
FIX: python manage.py migrate

ERROR: 403 Forbidden
CAUSE: Permission denied or not authenticated
FIX: Check permission_classes, ensure user has proper role

ERROR: 404 Not Found
CAUSE: URL pattern not matching
FIX: Check urls.py routing, router registration

ERROR: 400 Bad Request - \"This field is required\"
CAUSE: Serializer validation failed
FIX: Check required fields in serializer and request data

ERROR: 500 Internal Server Error
CAUSE: Application error
FIX: Check Django logs (console output in development)


================================================================================
PART 11: NEXT STEPS
================================================================================

IMMEDIATE (Phase 2):
1. Implement WebSocket for real-time tracking (django-channels)
2. Add Celery for async tasks (emails, notifications, analytics)
3. Integrate payment gateway (Stripe or PayPal)
4. Create comprehensive test suites (pytest)
5. Add API documentation (drf-spectacular)

MEDIUM TERM (Phase 3):
1. Implement Redis caching layer
2. Add rate limiting (django-ratelimit)
3. Implement monitoring/error tracking (Sentry)
4. Add SMS notifications (Twilio)
5. Implement surge pricing algorithm

LONG TERM (Phase 4):
1. Machine learning for ride matching
2. Advanced analytics dashboard
3. Multi-language support
4. White-label/franchise mode
5. Mobile app SDKs

================================================================================

This completes the comprehensive documentation for NovaTaxi backend!

For questions or clarifications, refer to:
- ARCHITECTURE.md: High-level design overview
- Each app's views.py: Specific business logic
- This file: General principles and patterns
"""
