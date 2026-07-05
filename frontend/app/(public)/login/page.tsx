/**
 * Login Page - User authentication with email and password
 * 
 * Features:
 * - Email and password validation
 * - Remember me checkbox
 * - Loading button with spinner
 * - Error handling with Alert component
 * - Links to Register and Forgot Password
 * - Framer Motion animations
 * - Success notification
 */

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { FormCard } from '@/components/auth/FormCard';
import { FormInput } from '@/components/auth/FormInput';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { FormButton } from '@/components/auth/FormButton';
import { Alert } from '@/components/auth/Alert';
import { SocialLogin } from '@/components/auth/SocialLogin';

import { loginSchema } from '@/lib/validations';
import { authAPI } from '@/lib/api';
import { tokenUtils, sessionUtils, errorUtils } from '@/lib/auth-utils';
import { parseApiError } from '@/lib/validations';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  /**
   * Handle login form submission
   * 1. Validate form data with Zod
   * 2. Call API to authenticate
   * 3. Save tokens and user info
   * 4. Redirect to dashboard
   */
  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setGeneralError(null);

      // Call login API
      const response = await authAPI.login({
        email: data.email,
        password: data.password,
      });

      // Save tokens and user info
      tokenUtils.saveTokens(response.access, response.refresh);
      sessionUtils.saveUser(response.user);

      // Show success notification
      toast.success('Login successful! Redirecting...', {
        duration: 2000,
        icon: '🎉',
      });

      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (error) {
      console.error('Login error:', error);

      // Parse and display API errors
      const apiErrors = parseApiError(error);

      if (apiErrors) {
        // Set field-level errors
        Object.entries(apiErrors).forEach(([field, message]) => {
          if (field === 'email' || field === 'password') {
            setError(field, { message: String(message) });
          }
        });

        // Set general error if no field-specific error
        if (apiErrors.non_field_errors) {
          setGeneralError(String(apiErrors.non_field_errors));
        } else if (!apiErrors.email && !apiErrors.password) {
          setGeneralError(errorUtils.getErrorMessage(error));
        }
      } else {
        setGeneralError(errorUtils.getErrorMessage(error));
      }

      // Show error toast
      toast.error('Login failed. Please try again.');
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

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your NovaTaxi account"
      showGradient
    >
      <FormCard
        title="Login"
        description="Enter your credentials to access your account"
        footer={{
          text: "Don't have an account?",
          link: '/register',
          linkText: 'Sign up',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* General Error Alert */}
          {generalError && (
            <motion.div variants={itemVariants}>
              <Alert
                variant="error"
                title="Login Failed"
                message={generalError}
                onDismiss={() => setGeneralError(null)}
              />
            </motion.div>
          )}

          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <FormInput
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              icon={Mail}
              error={errors.email}
              required
              {...register('email')}
            />
          </motion.div>

          {/* Password Field */}
          <motion.div variants={itemVariants}>
            <div className="space-y-2">
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                error={errors.password}
                required
                {...register('password')}
              />
              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Remember Me Checkbox */}
          <motion.div variants={itemVariants} className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
            >
              Remember me
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <FormButton
              type="submit"
              isLoading={isLoading}
              loadingText="Signing in..."
              icon={!isLoading && <ArrowRight className="w-4 h-4" />}
              fullWidth
            >
              Sign In
            </FormButton>
          </motion.div>

          {/* Social Login */}
          <motion.div variants={itemVariants}>
            <SocialLogin isLoading={isLoading} />
          </motion.div>
        </form>
      </FormCard>
    </AuthLayout>
  );
}
