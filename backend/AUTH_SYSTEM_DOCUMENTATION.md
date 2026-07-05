"""
NOVATAXI AUTHENTICATION SYSTEM DOCUMENTATION
Complete Production-Ready Authentication Backend

================================================================================
TABLE OF CONTENTS
================================================================================

1. Overview & Architecture
2. Key Features
3. API Endpoints
4. User Registration Flow
5. Login Flow
6. Password Management
7. Email Verification Flow
8. Token Management
9. Security Features
10. Error Handling
11. Configuration
12. Migration Instructions


================================================================================
1. OVERVIEW & ARCHITECTURE
================================================================================

The NovaTaxi authentication system is built with Django REST Framework and 
SimpleJWT, providing enterprise-grade security with the following principles:

CLEAN ARCHITECTURE PRINCIPLES:
- Separation of Concerns: Models, Serializers, Views, Services clearly separated
- Reusability: Services can be used across different views/applications
- Testability: Each component can be tested independently
- Maintainability: Code is well-organized and documented

SOLID PRINCIPLES APPLIED:
- Single Responsibility: Each class/function has one purpose
- Open/Closed: Open for extension, closed for modification
- Liskov Substitution: Base classes can be substituted by their subclasses
- Interface Segregation: Small, focused interfaces
- Dependency Inversion: Depend on abstractions, not concrete implementations


================================================================================
2. KEY FEATURES
================================================================================

✅ CUSTOM USER MODEL
   - Extends Django's AbstractUser
   - Role-based access control (client, driver, admin)
   - Email-based authentication
   - Phone number support
   - Profile picture storage

✅ REGISTRATION SYSTEM
   - Comprehensive validation
   - Password strength requirements
   - Email uniqueness checking
   - Automatic email verification token generation
   - Optional welcome email

✅ LOGIN SYSTEM
   - Email + password authentication
   - Account lockout after failed attempts (brute force protection)
   - IP address tracking
   - Automatic session timestamp updates
   - Token generation on successful login

✅ JWT TOKEN MANAGEMENT
   - Access tokens (30 minutes default)
   - Refresh tokens (1 day default)
   - Token expiration and validation
   - Token refresh capability
   - Stateless authentication

✅ PASSWORD MANAGEMENT
   - Password change by authenticated user
   - Password reset via email token
   - Password strength validation
   - Secure password hashing (PBKDF2)
   - Token expiration on reset

✅ EMAIL VERIFICATION
   - Token-based email verification
   - Verification link expiration (24 hours)
   - Resend verification email option
   - HTML formatted emails with branding

✅ SECURITY FEATURES
   - CORS protection
   - CSRF tokens for form submissions
   - Rate limiting ready (can be added)
   - Account lockout mechanism
   - Failed login attempt tracking
   - Secure token generation (secrets module)
   - Password hashing with salt


================================================================================
3. API ENDPOINTS
================================================================================

AUTH ENDPOINTS (users/):

Registration:
  POST   /api/users/register/
  - Public endpoint (no authentication required)
  - Request: {username, email, password, password_confirm, first_name, last_name, phone_number, role}
  - Response: {success, message, user}
  - Status: 201 CREATED

Login:
  POST   /api/users/login/
  - Public endpoint
  - Request: {email, password}
  - Response: {success, message, user, tokens: {access, refresh}}
  - Status: 200 OK

Logout:
  POST   /api/users/logout/
  - Requires authentication
  - Request: {refresh} (optional for future token blacklist)
  - Response: {success, message}
  - Status: 200 OK

Refresh Token:
  POST   /api/users/refresh/
  - Public endpoint
  - Request: {refresh}
  - Response: {success, access}
  - Status: 200 OK

Change Password:
  POST   /api/users/change-password/
  - Requires authentication
  - Request: {old_password, new_password, new_password_confirm}
  - Response: {success, message}
  - Status: 200 OK

Password Reset (Request):
  POST   /api/users/password-reset/
  - Public endpoint
  - Request: {email}
  - Response: {success, message}
  - Status: 200 OK
  - Security: Always returns success (doesn't reveal if email exists)

Password Reset (Confirm):
  POST   /api/users/password-reset/confirm/
  - Public endpoint
  - Request: {token, new_password, new_password_confirm}
  - Response: {success, message}
  - Status: 200 OK or 400 if token invalid

Email Verification:
  POST   /api/users/verify-email/
  - Public endpoint
  - Request: {token}
  - Response: {success, message, user}
  - Status: 200 OK or 400 if token invalid

Resend Verification Email:
  POST   /api/users/resend-verification/
  - Public endpoint
  - Request: {email}
  - Response: {success, message}
  - Status: 200 OK

Get Current User:
  GET    /api/users/me/
  - Requires authentication
  - Response: {id, username, email, first_name, last_name, role, phone_number, profile_picture, is_email_verified, is_active, date_joined, last_login, last_login_ip}
  - Status: 200 OK

User Detail:
  GET    /api/users/{id}/
  - Requires authentication
  - Response: User object with full details
  - Status: 200 OK

Update Profile:
  PUT    /api/users/{id}/
  - Requires authentication + ownership or staff status
  - Request: {first_name, last_name, phone_number, profile_picture}
  - Response: Updated user object
  - Status: 200 OK

Partial Update Profile:
  PATCH  /api/users/{id}/
  - Requires authentication + ownership or staff status
  - Request: Partial fields
  - Response: Updated user object
  - Status: 200 OK


================================================================================
4. USER REGISTRATION FLOW
================================================================================

REQUEST DATA VALIDATION:
1. Username validation:
   - Length: 3-30 characters
   - Characters: alphanumeric, underscore, hyphen, period
   - Cannot start with number
   - Must be unique

2. Email validation:
   - Valid RFC 5322 format
   - Maximum 254 characters
   - Must be unique in system

3. Password validation:
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one digit
   - At least one special character (!@#$%^&*(),.?":{}|<>)

4. Passwords must match
5. Phone number validation (optional)

REGISTRATION PROCESS:
1. POST request to /api/users/register/
2. All fields validated
3. User object created with provided data
4. Password hashed using PBKDF2
5. Email verification token generated
6. User saved to database
7. Response returned with user details
8. (Optional) Welcome email sent
9. (Optional) Verification email sent

RESPONSE EXAMPLE:
{
  "success": true,
  "message": "User registered successfully. Please check your email to verify your account.",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "client",
    "phone_number": "+1234567890",
    "profile_picture": null,
    "is_email_verified": false,
    "date_joined": "2024-01-15T10:30:00Z",
    "last_login": null
  }
}


================================================================================
5. LOGIN FLOW
================================================================================

LOGIN PROCESS:
1. POST request to /api/users/login/ with email and password
2. User lookup by email
3. Check if account is locked (brute force protection)
4. Check if account is active
5. Verify password against hash
6. If password wrong:
   - Increment failed login attempts
   - Lock account if max attempts exceeded
   - Save and return error
7. If password correct:
   - Reset failed login attempts counter
   - Update last_login timestamp
   - Update last_login_ip address
   - Generate access and refresh tokens
   - Log successful login
   - Return user details and tokens

TOKEN RESPONSE EXAMPLE:
{
  "success": true,
  "message": "Login successful.",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "client",
    "is_email_verified": true,
    "date_joined": "2024-01-15T10:30:00Z",
    "last_login": "2024-01-15T15:45:00Z"
  },
  "tokens": {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  }
}

ACCOUNT LOCKOUT PROTECTION:
- Default: 5 failed attempts lock account for 15 minutes
- Configurable via environment variables
- Automatically unlocks after timeout expires
- User sees clear error message


================================================================================
6. PASSWORD MANAGEMENT
================================================================================

PASSWORD CHANGE (Authenticated User):
1. POST to /api/users/change-password/
2. Old password verified
3. New password validated for strength
4. Ensure new ≠ old password
5. Ensure passwords match
6. Password updated (hashed)
7. Confirmation response returned

PASSWORD RESET (Anonymous User):
1. POST to /api/users/password-reset/ with email
2. User lookup (security: doesn't reveal if exists)
3. Reset token generated
4. Token expiry set to 24 hours from now
5. Reset email sent with token
6. Always returns success response

PASSWORD RESET CONFIRM:
1. POST to /api/users/password-reset/confirm/
2. Lookup user by reset token
3. Verify token validity and expiration
4. New password validated for strength
5. Passwords must match
6. Password updated
7. Reset token cleared
8. Confirmation response returned

SECURITY CONSIDERATIONS:
- Passwords always hashed with PBKDF2
- Reset tokens expire after 24 hours
- Only user with valid token can reset
- Failed reset attempts don't lock account
- Old password required for change (not reset)


================================================================================
7. EMAIL VERIFICATION FLOW
================================================================================

INITIAL VERIFICATION:
1. User registers
2. Email verification token generated (secrets.token_urlsafe)
3. Email sent with verification link
4. Link valid for 24 hours
5. User clicks link or posts token

VERIFICATION PROCESS:
1. POST to /api/users/verify-email/
2. Lookup user by verification token
3. Verify token is valid (not expired)
4. Mark email as verified (is_email_verified = True)
5. Set email_verified_at timestamp
6. Clear verification token
7. Return user details

RESEND VERIFICATION:
1. POST to /api/users/resend-verification/ with email
2. Lookup user by email
3. Check if already verified
4. Generate new token
5. Send verification email
6. Always returns success (security)

EMAIL TEMPLATES:
- email_verification.html: Verification link and instructions
- password_reset.html: Password reset link and instructions
- welcome.html: Welcome message after registration


================================================================================
8. TOKEN MANAGEMENT
================================================================================

JWT TOKENS:
Access Token:
  - Lifetime: 30 minutes (configurable)
  - Contains: user_id, username, email, role
  - Used: For authenticating API requests
  - Includes: Issued at (iat), Expiration (exp)

Refresh Token:
  - Lifetime: 1 day (configurable)
  - Used: To get new access token
  - Returned: On login
  - Endpoint: /api/users/refresh/

TOKEN REFRESH PROCESS:
1. POST to /api/users/refresh/ with refresh token
2. Verify refresh token validity
3. Generate new access token from refresh
4. Return new access token
5. Client updates local storage

USING TOKENS:
- Add to Authorization header: "Authorization: Bearer {access_token}"
- Make authenticated requests
- Token verified on each request
- Expired token returns 401 Unauthorized

TOKEN VALIDATION:
- Signature verified with SECRET_KEY
- Expiration checked (iat + lifetime > now)
- User_id verified exists in system
- Can be extended with custom claims


================================================================================
9. SECURITY FEATURES
================================================================================

PASSWORD SECURITY:
✅ PBKDF2 hashing with salt (Django default)
✅ Password strength requirements enforced
✅ Failed attempts tracked
✅ Account lockout after N attempts
✅ Automatic lockout timeout
✅ No password reset without email

TOKEN SECURITY:
✅ JWT signed with SECRET_KEY
✅ HS256 algorithm
✅ Tokens include expiration
✅ Refresh token separated from access token
✅ Tokens can be blacklisted (future implementation)

REQUEST SECURITY:
✅ CORS whitelist validation
✅ CSRF tokens for state-changing requests
✅ Content-Type validation
✅ SQL injection protection (Django ORM)
✅ XSS protection (JSON responses)

DATA SECURITY:
✅ Emails unique (prevents enumeration)
✅ Usernames unique
✅ Email verification required
✅ Password reset tokens secure (secrets module)
✅ Verification tokens secure
✅ IP address logging for audit

FUTURE ENHANCEMENTS:
- Rate limiting (per IP, per user)
- Token blacklist on logout
- Two-factor authentication
- Social login integration
- Device management
- Login alerts
- Suspicious activity detection


================================================================================
10. ERROR HANDLING
================================================================================

ERROR RESPONSES:

400 Bad Request:
{
  "success": false,
  "error": "Error message describing what went wrong",
  "details": {...} // Additional validation details
}

401 Unauthorized:
{
  "detail": "Invalid credentials" or "Token is invalid or expired"
}

403 Forbidden:
{
  "detail": "You do not have permission to perform this action"
}

404 Not Found:
{
  "detail": "Not found"
}

429 Too Many Requests: (Rate limiting)
{
  "detail": "Request throttled. Try again in X seconds."
}

500 Internal Server Error:
{
  "detail": "Internal server error. Please try again later."
}

VALIDATION ERRORS:
{
  "success": false,
  "errors": {
    "email": ["Email is already in use."],
    "password": ["Password must contain at least one uppercase letter."],
    "username": ["Username must be 3-30 characters."]
  }
}

COMMON ERROR MESSAGES:
- "Invalid email or password" - Login failed
- "Email is already in use" - Registration with duplicate email
- "Username is already in use" - Registration with duplicate username
- "Passwords do not match" - Password confirmation mismatch
- "Invalid verification token" - Email verification token expired or invalid
- "Invalid or expired reset token" - Password reset token invalid
- "Your account is temporarily locked" - Too many failed login attempts
- "Your account has been deactivated" - Account inactive


================================================================================
11. CONFIGURATION
================================================================================

ENVIRONMENT VARIABLES:

Authentication:
  JWT_ACCESS_TOKEN_LIFETIME_MINUTES=30
  JWT_REFRESH_TOKEN_LIFETIME_DAYS=1
  AUTH_PASSWORD_MIN_LENGTH=8
  AUTH_REQUIRE_UPPERCASE=True
  AUTH_REQUIRE_LOWERCASE=True
  AUTH_REQUIRE_DIGITS=True
  AUTH_REQUIRE_SPECIAL_CHARS=True
  AUTH_MAX_LOGIN_ATTEMPTS=5
  AUTH_LOCKOUT_DURATION_MINUTES=15
  EMAIL_VERIFICATION_TOKEN_EXPIRY_HOURS=24
  PASSWORD_RESET_TOKEN_EXPIRY_HOURS=24

Email:
  EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
  EMAIL_HOST=smtp.gmail.com
  EMAIL_PORT=587
  EMAIL_USE_TLS=True
  EMAIL_HOST_USER=your-email@gmail.com
  EMAIL_HOST_PASSWORD=your-password
  DEFAULT_FROM_EMAIL=noreply@novataxi.com
  SEND_VERIFICATION_EMAIL=True
  SEND_WELCOME_EMAIL=True
  FRONTEND_VERIFY_EMAIL_URL=http://localhost:3000/verify-email
  FRONTEND_RESET_PASSWORD_URL=http://localhost:3000/reset-password

Security:
  SECRET_KEY=<generate-random-key>
  DEBUG=False (production)
  SECURE_SSL_REDIRECT=True (production)
  SESSION_COOKIE_SECURE=True (production)
  CSRF_COOKIE_SECURE=True (production)


================================================================================
12. MIGRATION INSTRUCTIONS
================================================================================

APPLYING MIGRATIONS:
1. python manage.py makemigrations
2. python manage.py migrate
3. Verify: python manage.py showmigrations users

MIGRATION FILES:
- 0001_initial.py: Initial User model
- 0002_user_enhancements.py: Auth fields and indexes

TESTING THE SYSTEM:
1. Create superuser:
   python manage.py createsuperuser

2. Test registration:
   curl -X POST http://localhost:8000/api/users/register/ \\
     -H "Content-Type: application/json" \\
     -d '{"username":"test","email":"test@test.com","password":"TestPass123!","password_confirm":"TestPass123!","role":"client"}'

3. Test login:
   curl -X POST http://localhost:8000/api/users/login/ \\
     -H "Content-Type: application/json" \\
     -d '{"email":"test@test.com","password":"TestPass123!"}'

4. Test authenticated request:
   curl http://localhost:8000/api/users/me/ \\
     -H "Authorization: Bearer {access_token}"

PRODUCTION DEPLOYMENT:
1. Generate new SECRET_KEY
2. Set DEBUG=False
3. Update ALLOWED_HOSTS
4. Configure email backend (SMTP)
5. Enable HTTPS (SECURE_SSL_REDIRECT)
6. Run migrations: python manage.py migrate
7. Create admin user
8. Collect static files: python manage.py collectstatic
9. Set up logging
10. Configure monitoring

MONITORING:
- Check logs for failed login attempts
- Monitor email delivery
- Track token validation errors
- Alert on account lockouts
- Monitor password reset requests


================================================================================
FILE STRUCTURE
================================================================================

users/
├── models.py                 - Custom User model with auth fields
├── serializers.py            - Serializers for all auth operations
├── views.py                  - Views for auth endpoints
├── validators.py             - Custom validators (password, email, etc)
├── permissions.py            - Permission classes
├── services.py               - Email, token, authentication services
├── urls.py                   - URL routing
├── admin.py                  - Admin interface
├── apps.py                   - App configuration
├── migrations/
│   ├── __init__.py
│   ├── 0001_initial.py       - Initial User model
│   └── 0002_user_enhancements.py - Auth fields and indexes
├── templates/users/emails/
│   ├── email_verification.html
│   ├── password_reset.html
│   └── welcome.html
└── __init__.py


================================================================================
TESTING EXAMPLES
================================================================================

REGISTRATION WITH CURL:
curl -X POST http://localhost:8000/api/users/register/ \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "password_confirm": "SecurePass123!",
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "+1234567890",
    "role": "client"
  }'

LOGIN WITH CURL:
curl -X POST http://localhost:8000/api/users/login/ \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'

REFRESH TOKEN:
curl -X POST http://localhost:8000/api/users/refresh/ \\
  -H "Content-Type: application/json" \\
  -d '{"refresh": "your-refresh-token"}'

CHANGE PASSWORD:
curl -X POST http://localhost:8000/api/users/change-password/ \\
  -H "Authorization: Bearer your-access-token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "old_password": "SecurePass123!",
    "new_password": "NewSecurePass456!",
    "new_password_confirm": "NewSecurePass456!"
  }'

PASSWORD RESET:
curl -X POST http://localhost:8000/api/users/password-reset/ \\
  -H "Content-Type: application/json" \\
  -d '{"email": "john@example.com"}'

VERIFY EMAIL:
curl -X POST http://localhost:8000/api/users/verify-email/ \\
  -H "Content-Type: application/json" \\
  -d '{"token": "email-verification-token"}'


================================================================================
NEXT STEPS
================================================================================

1. Configure email backend (SMTP or SendGrid)
2. Set email settings in .env
3. Test email delivery
4. Deploy to production
5. Configure SSL/HTTPS
6. Set up monitoring and logging
7. Implement rate limiting
8. Add two-factor authentication (optional)
9. Set up admin dashboard
10. Create user documentation


================================================================================
SUPPORT
================================================================================

For issues or questions:
- Check documentation
- Review error messages
- Check logs
- Consult Django REST Framework docs
- Consult SimpleJWT docs


"""
