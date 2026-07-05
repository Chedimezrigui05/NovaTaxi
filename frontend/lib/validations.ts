/**
 * Zod validation schemas for authentication forms
 * 
 * Each schema defines:
 * - Field types and constraints
 * - Custom error messages
 * - Validation rules (regex patterns, min/max, etc.)
 */

import { z } from 'zod';

/**
 * Base email validation - reusable across forms
 */
const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .max(254, 'Email is too long');

/**
 * Base password validation - reusable across forms
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one digit
 * - At least one special character
 */
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/\d/, 'Password must contain at least one digit')
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)'
  );

/**
 * Username validation
 * - 3-30 characters
 * - Can contain letters, numbers, underscore, hyphen, period
 * - Cannot start with number
 */
const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username must be at most 30 characters')
  .regex(
    /^[a-zA-Z][a-zA-Z0-9_.-]*$/,
    'Username can only contain letters, numbers, underscore, hyphen, and period. Must start with a letter.'
  );

/**
 * Phone number validation (optional)
 * - 7-15 digits
 */
const phoneSchema = z
  .string()
  .optional()
  .refine(
    (val) => !val || /^\d{7,15}$/.test(val.replace(/[\s()+-]/g, '')),
    'Phone number must be 7-15 digits'
  );

/**
 * Login form schema
 * Required fields: email, password
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Register form schema
 * Required fields: username, email, password, password_confirm
 * Optional fields: first_name, last_name, phone_number, role
 */
export const registerSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone_number: phoneSchema,
    password: passwordSchema,
    password_confirm: z.string().min(1, 'Please confirm your password'),
    role: z.enum(['client', 'driver', 'admin']).default('client'),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords don't match",
    path: ['password_confirm'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Forgot password form schema
 * Required fields: email
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

/**
 * Reset password form schema
 * Required fields: token, new_password, new_password_confirm
 */
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    new_password: passwordSchema,
    new_password_confirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.new_password === data.new_password_confirm, {
    message: "Passwords don't match",
    path: ['new_password_confirm'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

/**
 * Change password form schema
 * Required fields: old_password, new_password, new_password_confirm
 */
export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, 'Current password is required'),
    new_password: passwordSchema,
    new_password_confirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.new_password === data.new_password_confirm, {
    message: "Passwords don't match",
    path: ['new_password_confirm'],
  })
  .refine((data) => data.old_password !== data.new_password, {
    message: 'New password must be different from current password',
    path: ['new_password'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

/**
 * Email verification form schema
 * Required fields: token
 */
export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

/**
 * Helper function to parse API error response
 * Returns field-level errors in format compatible with react-hook-form
 */
export const parseApiError = (error: any): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (error.response?.data?.errors) {
    // Multiple field errors
    Object.entries(error.response.data.errors).forEach(([field, messages]: [string, any]) => {
      errors[field] = Array.isArray(messages) ? messages[0] : messages;
    });
  } else if (error.response?.data?.error) {
    // Single error message
    errors.general = error.response.data.error;
  } else if (error.response?.data?.detail) {
    // DRF detail error
    errors.general = error.response.data.detail;
  } else if (error.message) {
    // Network or other error
    errors.general = error.message;
  } else {
    errors.general = 'An unexpected error occurred. Please try again.';
  }

  return errors;
};
