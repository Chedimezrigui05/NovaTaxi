/**
 * Forgot Password Page - Request password reset email
 * 
 * Features:
 * - Email validation
 * - Send reset link functionality
 * - Success message with instructions
 * - Error handling
 * - Link back to login
 * - Framer Motion animations
 */

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Mail, ArrowLeft, Mail as MailIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { FormCard } from '@/components/auth/FormCard';
import { FormInput } from '@/components/auth/FormInput';
import { FormButton } from '@/components/auth/FormButton';
import { Alert } from '@/components/auth/Alert';

import { forgotPasswordSchema } from '@/lib/validations';
import { authAPI } from '@/lib/api';
import { errorUtils } from '@/lib/auth-utils';
import { parseApiError } from '@/lib/validations';

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const email = watch('email');

  /**
   * Handle forgot password form submission
   * 1. Validate email
   * 2. Call API to send reset email
   * 3. Show success message
   */
  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      setGeneralError(null);

      // Call forgot password API
      await authAPI.requestPasswordReset({
        email: data.email,
      });

      // Show success state
      setSubmittedEmail(data.email);
      setIsSubmitted(true);

      // Show success toast
      toast.success('Reset email sent successfully!', {
        duration: 3000,
        icon: '📧',
      });
    } catch (error) {
      console.error('Forgot password error:', error);

      // Parse and display API errors
      const apiErrors = parseApiError(error);

      if (apiErrors) {
        if (apiErrors.email) {
          setError('email', { message: String(apiErrors.email) });
        } else if (apiErrors.non_field_errors) {
          setGeneralError(String(apiErrors.non_field_errors));
        } else {
          setGeneralError(errorUtils.getErrorMessage(error));
        }
      } else {
        setGeneralError(errorUtils.getErrorMessage(error));
      }

      // Show error toast
      toast.error('Failed to send reset email. Please try again.');
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

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="Password reset instructions have been sent"
        showGradient
      >
        <FormCard
          title="Reset Email Sent"
          footer={{
            text: 'Remember your password?',
            link: '/login',
            linkText: 'Back to login',
          }}
        >
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Success Message */}
            <Alert
              variant="success"
              title="Email Sent Successfully"
              message={`We've sent a password reset link to ${submittedEmail}. Please check your email and follow the instructions to reset your password.`}
            />

            {/* Instructions */}
            <motion.div variants={itemVariants} className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium text-gray-900 dark:text-white">
                What's next?
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Check your email for a message from NovaTaxi</li>
                <li>Click the password reset link in the email</li>
                <li>Create a new password</li>
                <li>Sign in with your new password</li>
              </ul>
            </motion.div>

            {/* Help Text */}
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
            >
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <span className="font-medium">💡 Tip:</span> The reset link will expire in 24 hours. If you don't receive the email,
                check your spam folder or request a new one.
              </p>
            </motion.div>

            {/* Resend Button */}
            <motion.div variants={itemVariants}>
              <FormButton
                onClick={() => setIsSubmitted(false)}
                variant="secondary"
                fullWidth
              >
                Send Another Email
              </FormButton>
            </motion.div>

            {/* Back to Login */}
            <motion.div variants={itemVariants}>
              <Link
                href="/login"
                className="inline-flex items-center justify-center w-full gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </motion.div>
          </motion.div>
        </FormCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="We'll help you reset your password"
      showGradient
    >
      <FormCard
        title="Reset Password"
        description="Enter your email and we'll send you a link to reset your password"
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

          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <FormInput
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
              icon={Mail}
              error={errors.email}
              required
              {...register('email')}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <FormButton
              type="submit"
              isLoading={isLoading}
              loadingText="Sending..."
              icon={!isLoading && <MailIcon className="w-4 h-4" />}
              fullWidth
            >
              Send Reset Link
            </FormButton>
          </motion.div>

          {/* Info Box */}
          <motion.div
            variants={itemVariants}
            className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3"
          >
            <p className="text-xs text-amber-900 dark:text-amber-100">
              <span className="font-medium">Note:</span> Check your spam folder if you don't receive the email
              within a few minutes.
            </p>
          </motion.div>

          {/* Back to Login Link */}
          <motion.div variants={itemVariants} className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Login
            </Link>
          </motion.div>
        </form>
      </FormCard>
    </AuthLayout>
  );
}
