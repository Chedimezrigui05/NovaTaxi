/**
 * Register Page - New user account creation
 * 
 * Features:
 * - Email, password, and profile information
 * - Password strength indicator with Framer Motion
 * - Phone number formatting
 * - Role selection (client/driver)
 * - Duplicate email/username error handling
 * - Terms and conditions checkbox
 * - Error handling with Alert component
 * - Success notification
 */

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, User, Phone, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { FormCard } from '@/components/auth/FormCard';
import { FormInput } from '@/components/auth/FormInput';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { FormButton } from '@/components/auth/FormButton';
import { Alert } from '@/components/auth/Alert';
import { SocialLogin } from '@/components/auth/SocialLogin';

import { registerSchema } from '@/lib/validations';
import { authAPI } from '@/lib/api';
import { tokenUtils, sessionUtils, errorUtils, formUtils } from '@/lib/auth-utils';
import { parseApiError } from '@/lib/validations';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  phone_number?: string;
  role: 'client' | 'driver';
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'client',
    },
  });

  const passwordValue = watch('password');

  /**
   * Handle register form submission
   * 1. Validate form data with Zod
   * 2. Call API to create account
   * 3. Save tokens and user info
   * 4. Redirect to dashboard (auto-login)
   */
  const onSubmit = async (data: RegisterFormData) => {
    if (!agreeToTerms) {
      setGeneralError(
        'Please agree to the terms and conditions to continue'
      );
      return;
    }

    try {
      setIsLoading(true);
      setGeneralError(null);

      // Call register API
      const response = await authAPI.register({
        username: data.username,
        email: data.email,
        password: data.password,
        password_confirm: data.password_confirm,
        phone_number: data.phone_number || undefined,
        role: data.role,
      });

      // Save tokens and user info
      tokenUtils.saveTokens(response.access, response.refresh);
      sessionUtils.saveUser(response.user);

      // Show success notification
      toast.success('Account created successfully! Redirecting...', {
        duration: 2000,
        icon: '🎉',
      });

      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (error) {
      console.error('Register error:', error);

      // Parse and display API errors
      const apiErrors = parseApiError(error);

      if (apiErrors) {
        // Set field-level errors
        Object.entries(apiErrors).forEach(([field, message]) => {
          if (
            field === 'username' ||
            field === 'email' ||
            field === 'password' ||
            field === 'password_confirm' ||
            field === 'phone_number' ||
            field === 'role'
          ) {
            setError(field as any, { message: String(message) });
          }
        });

        // Set general error
        if (apiErrors.non_field_errors) {
          setGeneralError(String(apiErrors.non_field_errors));
        } else if (
          !apiErrors.username &&
          !apiErrors.email &&
          !apiErrors.password
        ) {
          setGeneralError(errorUtils.getErrorMessage(error));
        }
      } else {
        setGeneralError(errorUtils.getErrorMessage(error));
      }

      // Show error toast
      toast.error('Registration failed. Please try again.');
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
      title="Join NovaTaxi"
      subtitle="Create your account in minutes"
      showGradient
    >
      <FormCard
        title="Create Account"
        description="Become part of the NovaTaxi community"
        footer={{
          text: 'Already have an account?',
          link: '/login',
          linkText: 'Sign in',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* General Error Alert */}
          {generalError && (
            <motion.div variants={itemVariants}>
              <Alert
                variant="error"
                title="Registration Error"
                message={generalError}
                onDismiss={() => setGeneralError(null)}
              />
            </motion.div>
          )}

          {/* Username Field */}
          <motion.div variants={itemVariants}>
            <FormInput
              label="Username"
              placeholder="Choose a username"
              type="text"
              icon={User}
              error={errors.username}
              helperText="3-30 characters, alphanumeric and special chars (_.-)"
              required
              {...register('username')}
            />
          </motion.div>

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
            <PasswordInput
              label="Password"
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
              placeholder="Re-enter your password"
              error={errors.password_confirm}
              required
              {...register('password_confirm')}
            />
          </motion.div>

          {/* Phone Number Field */}
          <motion.div variants={itemVariants}>
            <FormInput
              label="Phone Number (Optional)"
              placeholder="Enter your phone number"
              type="tel"
              icon={Phone}
              error={errors.phone_number}
              helperText="7-15 digits"
              {...register('phone_number')}
            />
          </motion.div>

          {/* Role Selection */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              I am a <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'client', label: 'Passenger', desc: 'Book rides' },
                { value: 'driver', label: 'Driver', desc: 'Offer rides' },
              ].map((option) => (
                <label
                  key={option.value}
                  className="relative flex items-center"
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...register('role')}
                    className="sr-only peer"
                  />
                  <div
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-700
                      peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20
                      cursor-pointer transition-all hover:border-gray-400 dark:hover:border-gray-600"
                  >
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {option.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div variants={itemVariants} className="flex items-start">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer mt-0.5"
            />
            <label
              htmlFor="agreeToTerms"
              className="ml-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
            >
              I agree to the{' '}
              <Link
                href="/terms"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Terms and Conditions
              </Link>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <FormButton
              type="submit"
              isLoading={isLoading}
              loadingText="Creating account..."
              icon={!isLoading && <ArrowRight className="w-4 h-4" />}
              fullWidth
            >
              Create Account
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
