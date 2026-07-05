/**
 * Reset Password Page - Reset password using token from email link
 * 
 * Features:
 * - Extract token from URL query parameters
 * - Validate token format
 * - Password strength indicator
 * - Confirm password validation
 * - Error handling for invalid/expired tokens
 * - Success notification
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { FormCard } from '@/components/auth/FormCard';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { FormButton } from '@/components/auth/FormButton';
import { Alert } from '@/components/auth/Alert';

import { resetPasswordSchema } from '@/lib/validations';
import { authAPI } from '@/lib/api';
import { urlUtils, errorUtils } from '@/lib/auth-utils';
import { parseApiError } from '@/lib/validations';

interface ResetPasswordFormData {
  password: string;
  password_confirm: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  /**
   * Extract and validate token from URL on component mount
   */
  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');

    if (!tokenFromUrl) {
      setTokenError(
        'Invalid reset link. Please request a new password reset email.'
      );
      return;
    }

    // Basic token format validation (should be alphanumeric and hyphens)
    if (!/^[a-zA-Z0-9-]+$/.test(tokenFromUrl)) {
      setTokenError('Invalid token format. Please request a new reset link.');
      return;
    }

    setToken(tokenFromUrl);
  }, [searchParams]);

  /**
   * Handle reset password form submission
   * 1. Validate form data with Zod
   * 2. Call API to reset password with token
   * 3. Show success message
   * 4. Redirect to login
   */
  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setTokenError('Invalid or missing reset token.');
      return;
    }

    try {
      setIsLoading(true);
      setGeneralError(null);

      // Call reset password API
      await authAPI.confirmPasswordReset({
        token: token,
        new_password: data.password,
        new_password_confirm: data.password_confirm,
      });

      // Show success notification
      toast.success('Password reset successfully! Redirecting to login...', {
        duration: 2000,
        icon: '🎉',
      });

      // Redirect to login
      setTimeout(() => {
        router.push('/login');
      }, 500);
    } catch (error) {
      console.error('Reset password error:', error);

      // Parse and display API errors
      const apiErrors = parseApiError(error);

      if (apiErrors) {
        // Check for token-related errors
        if (apiErrors.token) {
          setTokenError(String(apiErrors.token));
        } else if (apiErrors.non_field_errors) {
          // Check if it's an expired token error
          const errorMsg = String(apiErrors.non_field_errors);
          if (
            errorMsg.includes('expired') ||
            errorMsg.includes('invalid') ||
            errorMsg.includes('used')
          ) {
            setTokenError(errorMsg);
          } else {
            setGeneralError(errorMsg);
          }
        } else {
          // Set field-level errors
          Object.entries(apiErrors).forEach(([field, message]) => {
            if (field === 'password' || field === 'password_confirm') {
              setError(field as any, { message: String(message) });
            }
          });
          if (!apiErrors.password && !apiErrors.password_confirm) {
            setGeneralError(errorUtils.getErrorMessage(error));
          }
        }
      } else {
        setGeneralError(errorUtils.getErrorMessage(error));
      }

      // Show error toast
      toast.error('Password reset failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  if (tokenError) {
    return (
      <AuthLayout
        title="Reset Link Invalid"
        subtitle="Your password reset link has expired or is invalid"
        showGradient
      >
        <FormCard
          title="Link Expired"
          footer={{
            text: 'Need to reset your password?',
            link: '/forgot-password',
            linkText: 'Request new link',
          }}
        >
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Error Alert */}
            <Alert
              variant="error"
              title="Invalid or Expired Link"
              message={
                tokenError ||
                'Your password reset link has expired or is invalid. Please request a new one.'
              }
            />

            {/* Reasons List */}
            <motion.div variants={itemVariants} className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium text-gray-900 dark:text-white">
                Why did this happen?
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>The link has expired (valid for 24 hours)</li>
                <li>The link has already been used</li>
                <li>The link may be incorrectly formatted</li>
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Link href="/forgot-password" className="block">
                <FormButton fullWidth variant="primary">
                  Request New Reset Link
                </FormButton>
              </Link>
              <Link href="/login" className="block">
                <FormButton fullWidth variant="secondary">
                  Back to Login
                </FormButton>
              </Link>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
            >
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <span className="font-medium">Need help?</span> If you're having trouble
                resetting your password,{' '}
                <Link
                  href="/contact"
                  className="underline hover:no-underline font-semibold"
                >
                  contact our support team
                </Link>
                .
              </p>
            </motion.div>
          </motion.div>
        </FormCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Create a new password for your NovaTaxi account"
      showGradient
    >
      <FormCard
        title="Create New Password"
        description="Enter your new password below"
        footer={{
          text: 'Remember your password?',
          link: '/login',
          linkText: 'Back to login',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* General Error Alert */}
          {generalError && (
            <motion.div variants={itemVariants}>
              <Alert
                variant="error"
                title="Error"
                message={generalError}
                onDismiss={() => setGeneralError(null)}
              />
            </motion.div>
          )}

          {/* New Password Field */}
          <motion.div variants={itemVariants}>
            <PasswordInput
              label="New Password"
              placeholder="Create a strong password"
              error={errors.password}
              showStrength={true}
              required
              {...register('password')}
            />
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div variants={itemVariants}>
            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter your new password"
              error={errors.password_confirm}
              required
              {...register('password_confirm')}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <FormButton
              type="submit"
              isLoading={isLoading}
              loadingText="Resetting..."
              icon={!isLoading && <ArrowRight className="w-4 h-4" />}
              fullWidth
            >
              Reset Password
            </FormButton>
          </motion.div>

          {/* Password Requirements */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-3"
          >
            <p className="text-xs font-medium text-gray-900 dark:text-white mb-2">
              Password requirements:
            </p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li>At least 8 characters long</li>
              <li>Contains uppercase and lowercase letters</li>
              <li>Contains at least one number</li>
              <li>Contains at least one special character (!@#$%^&*)</li>
            </ul>
          </motion.div>

          {/* Back to Login Link */}
          <motion.div variants={itemVariants} className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            >
              Back to Login
            </Link>
          </motion.div>
        </form>
      </FormCard>
    </AuthLayout>
  );
}
