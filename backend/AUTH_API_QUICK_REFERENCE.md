"""
NOVATAXI AUTHENTICATION API - QUICK REFERENCE GUIDE

================================================================================
QUICK START
================================================================================

BASE URL: http://localhost:8000/api/users/

HEADERS REQUIRED:
- Content-Type: application/json
- Authorization: Bearer {access_token}  (for authenticated endpoints)


================================================================================
ENDPOINTS SUMMARY
================================================================================

PUBLIC ENDPOINTS (No Authentication Required):
✓ POST   /register/              - User registration
✓ POST   /login/                 - User login
✓ POST   /refresh/               - Refresh access token
✓ POST   /password-reset/        - Request password reset
✓ POST   /password-reset/confirm/ - Confirm password reset
✓ POST   /verify-email/          - Verify email with token
✓ POST   /resend-verification/   - Resend verification email

AUTHENTICATED ENDPOINTS:
✓ GET    /me/                    - Get current user
✓ POST   /change-password/       - Change password
✓ POST   /logout/                - Logout (optional)
✓ GET    /                       - List users
✓ GET    /{id}/                  - Get user by ID
✓ PUT    /{id}/                  - Update user profile
✓ PATCH  /{id}/                  - Partial update user


================================================================================
ENDPOINT DETAILS
================================================================================

1. REGISTER
   Endpoint: POST /register/
   Auth: No
   
   Request:
   {
     "username": "johndoe",           (required, 3-30 chars)
     "email": "john@example.com",     (required, unique)
     "password": "SecurePass123!",    (required, 8+ chars, uppercase, lowercase, digit, special)
     "password_confirm": "SecurePass123!", (required, must match password)
     "first_name": "John",            (optional)
     "last_name": "Doe",              (optional)
     "phone_number": "+1234567890",   (optional, 7-15 digits)
     "role": "client"                 (optional, default: client, options: client, driver, admin)
   }
   
   Response (201 Created):
   {
     "success": true,
     "message": "User registered successfully...",
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
       "date_joined": "2024-01-15T10:30:00Z"
     }
   }

---

2. LOGIN
   Endpoint: POST /login/
   Auth: No
   
   Request:
   {
     "email": "john@example.com",     (required)
     "password": "SecurePass123!"     (required)
   }
   
   Response (200 OK):
   {
     "success": true,
     "message": "Login successful.",
     "user": {
       "id": 1,
       "username": "johndoe",
       "email": "john@example.com",
       "is_email_verified": true,
       ...
     },
     "tokens": {
       "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
       "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
     }
   }
   
   Error (400):
   {
     "success": false,
     "error": "Invalid email or password."
   }

---

3. REFRESH TOKEN
   Endpoint: POST /refresh/
   Auth: No
   
   Request:
   {
     "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
   }
   
   Response (200 OK):
   {
     "success": true,
     "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
   }

---

4. CHANGE PASSWORD
   Endpoint: POST /change-password/
   Auth: Yes (Bearer token)
   
   Request:
   {
     "old_password": "SecurePass123!",
     "new_password": "NewSecurePass456!",
     "new_password_confirm": "NewSecurePass456!"
   }
   
   Response (200 OK):
   {
     "success": true,
     "message": "Password changed successfully."
   }

---

5. PASSWORD RESET (Request)
   Endpoint: POST /password-reset/
   Auth: No
   
   Request:
   {
     "email": "john@example.com"
   }
   
   Response (200 OK):
   {
     "success": true,
     "message": "If an account with that email exists, a password reset link has been sent."
   }

---

6. PASSWORD RESET (Confirm)
   Endpoint: POST /password-reset/confirm/
   Auth: No
   
   Request:
   {
     "token": "reset-token-from-email",
     "new_password": "NewSecurePass456!",
     "new_password_confirm": "NewSecurePass456!"
   }
   
   Response (200 OK):
   {
     "success": true,
     "message": "Password reset successfully. You can now login with your new password."
   }

---

7. VERIFY EMAIL
   Endpoint: POST /verify-email/
   Auth: No
   
   Request:
   {
     "token": "verification-token-from-email"
   }
   
   Response (200 OK):
   {
     "success": true,
     "message": "Email verified successfully.",
     "user": {...}
   }

---

8. RESEND VERIFICATION EMAIL
   Endpoint: POST /resend-verification/
   Auth: No
   
   Request:
   {
     "email": "john@example.com"
   }
   
   Response (200 OK):
   {
     "success": true,
     "message": "If an account with that email exists, a verification email has been sent."
   }

---

9. GET CURRENT USER
   Endpoint: GET /me/
   Auth: Yes (Bearer token)
   
   Response (200 OK):
   {
     "id": 1,
     "username": "johndoe",
     "email": "john@example.com",
     "first_name": "John",
     "last_name": "Doe",
     "role": "client",
     "phone_number": "+1234567890",
     "profile_picture": "https://...",
     "is_email_verified": true,
     "is_active": true,
     "is_locked": false,
     "failed_login_attempts": 0,
     "date_joined": "2024-01-15T10:30:00Z",
     "last_login": "2024-01-15T15:45:00Z",
     "last_login_ip": "192.168.1.1"
   }

---

10. UPDATE PROFILE
    Endpoint: PUT /users/{id}/
    Auth: Yes (Bearer token)
    
    Request:
    {
      "first_name": "Jonathan",
      "last_name": "Smith",
      "phone_number": "+1987654321",
      "profile_picture": <file>
    }
    
    Response (200 OK):
    Updated user object with all fields

---

11. LOGOUT
    Endpoint: POST /logout/
    Auth: Yes (Bearer token)
    
    Request: {} (empty body)
    
    Response (200 OK):
    {
      "success": true,
      "message": "Logout successful."
    }


================================================================================
AUTHENTICATION USAGE
================================================================================

Using access token in requests:

curl -X GET http://localhost:8000/api/users/me/ \\
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."

Python requests:
import requests

headers = {
    'Authorization': f'Bearer {access_token}'
}
response = requests.get('http://localhost:8000/api/users/me/', headers=headers)

JavaScript fetch:
fetch('/api/users/me/', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})

Store tokens (Frontend):
localStorage.setItem('accessToken', tokens.access)
localStorage.setItem('refreshToken', tokens.refresh)

Refresh expired token:
POST /refresh/ with {refresh: refreshToken}
Use new access token for subsequent requests


================================================================================
VALIDATION RULES
================================================================================

USERNAME:
- Length: 3-30 characters
- Characters: a-z, A-Z, 0-9, underscore, hyphen, period
- Cannot start with number
- Must be unique

EMAIL:
- Valid format
- Maximum 254 characters
- Must be unique

PASSWORD:
- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 digit (0-9)
- At least 1 special character (!@#$%^&*(),.?":{}|<>)

PHONE NUMBER:
- 7-15 digits
- Optional field
- Can include formatting characters

ROLE:
- Options: 'client', 'driver', 'admin'
- Default: 'client'


================================================================================
ERROR CODES & MESSAGES
================================================================================

400 Bad Request:
- Invalid field format
- Validation failed
- Required field missing
Example: {"success": false, "error": "Invalid email format."}

401 Unauthorized:
- Token expired
- Token invalid
- Authentication required
Example: {"detail": "Invalid credentials"}

403 Forbidden:
- Insufficient permissions
- Can't edit other user's profile
Example: {"error": "You can only edit your own profile."}

404 Not Found:
- User not found
- Invalid URL
Example: {"detail": "Not found"}

429 Too Many Requests:
- Rate limit exceeded
Example: {"detail": "Request throttled. Try again in 60 seconds."}

500 Internal Server Error:
- Server error
- Database error
Example: {"detail": "Internal server error. Please try again later."}


================================================================================
COMMON ERRORS & SOLUTIONS
================================================================================

Error: "Invalid email or password"
Solution: Check email and password are correct, email verified not required for login

Error: "Email is already in use"
Solution: Use different email or recover account via password reset

Error: "Username is already in use"
Solution: Choose different username

Error: "Passwords do not match"
Solution: Ensure password and password_confirm are identical

Error: "Password must contain at least one uppercase letter"
Solution: Add uppercase letter to password (A-Z)

Error: "Your account is temporarily locked"
Solution: Wait 15 minutes, then try login again

Error: "Invalid verification token"
Solution: Request new verification email via resend-verification

Error: "Invalid or expired reset token"
Solution: Request new password reset token via password-reset

Error: "Token is invalid or expired"
Solution: Refresh token using refresh endpoint

Error: "Authorization credentials not provided"
Solution: Add Authorization header with bearer token


================================================================================
TESTING WITH CURL
================================================================================

Test Registration:
curl -X POST http://localhost:8000/api/users/register/ \\
  -H "Content-Type: application/json" \\
  -d '{"username":"test","email":"test@test.com","password":"TestPass123!","password_confirm":"TestPass123!"}'

Test Login:
curl -X POST http://localhost:8000/api/users/login/ \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@test.com","password":"TestPass123!"}'

Test Authenticated Request:
curl -X GET http://localhost:8000/api/users/me/ \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

Test Change Password:
curl -X POST http://localhost:8000/api/users/change-password/ \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"old_password":"TestPass123!","new_password":"NewPass456!","new_password_confirm":"NewPass456!"}'


================================================================================
TOKEN INFORMATION
================================================================================

Access Token:
- Validity: 30 minutes (configurable)
- Used for: API requests
- Format: JWT (3 parts separated by dots)
- Contains: User ID, email, role, expiration time

Refresh Token:
- Validity: 1 day (configurable)
- Used for: Getting new access token
- Can be revoked (future implementation)
- Stored securely (httpOnly cookie recommended)

How tokens work:
1. Login → receive access + refresh tokens
2. Use access token for API requests
3. When access token expires (401 response)
4. Use refresh token to get new access token
5. Continue using new access token


================================================================================
FRONTEND INTEGRATION EXAMPLE
================================================================================

// Example: React component with authentication

import React, { useState } from 'react';
import axios from 'axios';

const AuthAPI = axios.create({
  baseURL: 'http://localhost:8000/api/users'
});

export const register = (data) => {
  return AuthAPI.post('/register/', data);
};

export const login = (email, password) => {
  return AuthAPI.post('/login/', { email, password });
};

export const refreshToken = (refresh) => {
  return AuthAPI.post('/refresh/', { refresh });
};

export const getCurrentUser = (accessToken) => {
  return AuthAPI.get('/me/', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

// Usage in component
const [user, setUser] = useState(null);
const [tokens, setTokens] = useState(null);

const handleLogin = async (email, password) => {
  try {
    const response = await login(email, password);
    setTokens(response.data.tokens);
    setUser(response.data.user);
    localStorage.setItem('accessToken', response.data.tokens.access);
    localStorage.setItem('refreshToken', response.data.tokens.refresh);
  } catch (error) {
    console.error('Login failed:', error.response.data);
  }
};


================================================================================
PRODUCTION DEPLOYMENT NOTES
================================================================================

1. Change SECRET_KEY in settings.py
2. Set DEBUG=False
3. Update ALLOWED_HOSTS
4. Configure email backend (SMTP)
5. Update CORS_ALLOWED_ORIGINS to production domain
6. Enable HTTPS (SECURE_SSL_REDIRECT=True)
7. Set secure cookie flags
8. Run migrations: python manage.py migrate
9. Create superuser
10. Set up logging
11. Monitor auth errors
12. Configure email delivery


================================================================================
SUPPORT & DOCUMENTATION
================================================================================

Full documentation: AUTH_SYSTEM_DOCUMENTATION.md
Commit details: AUTH_GIT_COMMIT_MESSAGE.md
Email templates: users/templates/users/emails/
Environment config: .env.example

For issues:
1. Check error message
2. Review API reference
3. Check validation rules
4. Review logs
5. Consult full documentation

"""
