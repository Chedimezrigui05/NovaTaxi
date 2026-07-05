/**
 * API client setup with Axios
 * 
 * This module configures Axios with:
 * - Base URL from environment variables
 * - Automatic JWT token injection
 * - Error interceptor for global error handling
 * - Request/response interceptors
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Create Axios instance with default configuration
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/**
 * Request interceptor - Add JWT token to requests
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage (or session storage)
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('accessToken') 
      : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - Handle common errors
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 - Token expired or invalid
    if (error.response?.status === 401) {
      // Clear tokens
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        // Redirect to login (handled by middleware)
      }
    }

    // Handle 403 - Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }

    return Promise.reject(error);
  }
);

/**
 * API service for authentication endpoints
 */
export const authAPI = {
  /**
   * Register new user
   */
  register: (data: {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    role?: string;
  }) => {
    return apiClient.post('/users/register/', data);
  },

  /**
   * Login user
   */
  login: (data: { email: string; password: string }) => {
    return apiClient.post('/users/login/', data);
  },

  /**
   * Refresh access token
   */
  refreshToken: (refreshToken: string) => {
    return apiClient.post('/users/refresh/', { refresh: refreshToken });
  },

  /**
   * Logout user
   */
  logout: () => {
    return apiClient.post('/users/logout/', {});
  },

  /**
   * Get current user
   */
  getCurrentUser: () => {
    return apiClient.get('/users/me/');
  },

  /**
   * Change password
   */
  changePassword: (data: {
    old_password: string;
    new_password: string;
    new_password_confirm: string;
  }) => {
    return apiClient.post('/users/change-password/', data);
  },

  /**
   * Request password reset
   */
  requestPasswordReset: (email: string) => {
    return apiClient.post('/users/password-reset/', { email });
  },

  /**
   * Confirm password reset
   */
  confirmPasswordReset: (data: {
    token: string;
    new_password: string;
    new_password_confirm: string;
  }) => {
    return apiClient.post('/users/password-reset/confirm/', data);
  },

  /**
   * Verify email
   */
  verifyEmail: (token: string) => {
    return apiClient.post('/users/verify-email/', { token });
  },

  /**
   * Resend verification email
   */
  resendVerificationEmail: (email: string) => {
    return apiClient.post('/users/resend-verification/', { email });
  },

  /**
   * Update user profile
   */
  updateProfile: (userId: string | number, data: FormData) => {
    return apiClient.patch(`/users/${userId}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default apiClient;
