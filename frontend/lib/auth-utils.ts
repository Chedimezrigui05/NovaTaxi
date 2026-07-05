/**
 * Utility functions for authentication
 * 
 * Handles:
 * - Token storage and retrieval
 * - User session management
 * - Token expiration checking
 * - Local storage helpers
 */

/**
 * Token management utilities
 */
export const tokenUtils = {
  /**
   * Save tokens to localStorage
   */
  saveTokens: (accessToken: string, refreshToken: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  /**
   * Get access token from localStorage
   */
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  },

  /**
   * Get refresh token from localStorage
   */
  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
  },

  /**
   * Clear all tokens
   */
  clearTokens: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  /**
   * Check if token exists
   */
  hasToken: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('accessToken');
  },

  /**
   * Decode JWT token (basic decode without verification)
   * Note: Only for client-side, doesn't verify signature
   */
  decodeToken: (token: string): Record<string, any> | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  },

  /**
   * Check if token is expired
   */
  isTokenExpired: (token: string): boolean => {
    const decoded = tokenUtils.decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  },

  /**
   * Check if token is about to expire (within 5 minutes)
   */
  isTokenExpiringSoon: (token: string): boolean => {
    const decoded = tokenUtils.decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    const fiveMinutes = 5 * 60;
    return decoded.exp < now + fiveMinutes;
  },
};

/**
 * User session utilities
 */
export const sessionUtils = {
  /**
   * Save user info to localStorage
   */
  saveUser: (user: any) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Get user info from localStorage
   */
  getUser: (): any | null => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Clear user session
   */
  clearSession: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('accessToken') && !!localStorage.getItem('user');
  },

  /**
   * Get user role
   */
  getUserRole: (): string | null => {
    if (typeof window === 'undefined') return null;
    const user = sessionUtils.getUser();
    return user?.role || null;
  },
};

/**
 * Error handling utilities
 */
export const errorUtils = {
  /**
   * Get user-friendly error message from API error
   */
  getErrorMessage: (error: any): string => {
    if (typeof error === 'string') return error;

    if (error?.response?.data?.error) {
      return error.response.data.error;
    }

    if (error?.response?.data?.detail) {
      return error.response.data.detail;
    }

    if (error?.response?.status === 404) {
      return 'Resource not found';
    }

    if (error?.response?.status === 500) {
      return 'Server error. Please try again later.';
    }

    if (error?.message === 'Network Error') {
      return 'Network error. Please check your connection.';
    }

    return error?.message || 'An unexpected error occurred';
  },

  /**
   * Check if error is network error
   */
  isNetworkError: (error: any): boolean => {
    return error?.message === 'Network Error' || !error?.response;
  },

  /**
   * Check if error is validation error
   */
  isValidationError: (error: any): boolean => {
    return error?.response?.status === 400 || !!error?.response?.data?.errors;
  },
};

/**
 * Form utilities
 */
export const formUtils = {
  /**
   * Format phone number as user types
   */
  formatPhoneNumber: (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
  },

  /**
   * Validate password strength (0-4)
   */
  getPasswordStrength: (password: string): 0 | 1 | 2 | 3 | 4 => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    return strength as 0 | 1 | 2 | 3 | 4;
  },

  /**
   * Get password strength label and color
   */
  getPasswordStrengthLabel: (strength: number): { label: string; color: string } => {
    switch (strength) {
      case 0:
      case 1:
        return { label: 'Weak', color: 'text-red-500' };
      case 2:
        return { label: 'Fair', color: 'text-yellow-500' };
      case 3:
        return { label: 'Good', color: 'text-blue-500' };
      case 4:
        return { label: 'Strong', color: 'text-green-500' };
      default:
        return { label: 'Unknown', color: 'text-gray-500' };
    }
  },

  /**
   * Debounce function for form validation
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
};

/**
 * URL utilities
 */
export const urlUtils = {
  /**
   * Get query parameter
   */
  getQueryParam: (param: string): string | null => {
    if (typeof window === 'undefined') return null;
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
  },

  /**
   * Build URL with query parameters
   */
  buildQueryString: (params: Record<string, string | number | boolean>): string => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      query.append(key, String(value));
    });
    return query.toString();
  },
};

/**
 * Validation utilities for specific fields
 */
export const validateUtils = {
  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength
   */
  isStrongPassword: (password: string): boolean => {
    return formUtils.getPasswordStrength(password) >= 3;
  },

  /**
   * Validate username format
   */
  isValidUsername: (username: string): boolean => {
    return /^[a-zA-Z][a-zA-Z0-9_.-]{2,29}$/.test(username);
  },

  /**
   * Validate phone number
   */
  isValidPhoneNumber: (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 7 && cleaned.length <= 15;
  },
};
