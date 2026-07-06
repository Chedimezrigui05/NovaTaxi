'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

import { Alert } from '@/components/auth/Alert';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { FormButton } from '@/components/auth/FormButton';
import { FormCard } from '@/components/auth/FormCard';
import { FormInput } from '@/components/auth/FormInput';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { SocialLogin } from '@/components/auth/SocialLogin';
import { authAPI } from '@/lib/api';
import { errorUtils, sessionUtils, tokenUtils } from '@/lib/auth-utils';
import { loginSchema, parseApiError } from '@/lib/validations';

type LoginRole = 'client' | 'driver';

interface LoginFormData {
  email: string;
  password: string;
}

interface RoleLoginFormProps {
  role: LoginRole;
  title: string;
  subtitle: string;
  cardTitle: string;
  cardDescription: string;
  redirectPath: string;
}

type LoginResponse = {
  access: string;
  refresh: string;
  user: {
    role?: string;
  };
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export function RoleLoginForm({
  role,
  title,
  subtitle,
  cardTitle,
  cardDescription,
  redirectPath,
}: RoleLoginFormProps) {
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

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setGeneralError(null);

      const response = await authAPI.login({
        email: data.email,
        password: data.password,
      });
      const payload = (response.data ?? response) as LoginResponse;

      if (payload.user?.role && payload.user.role !== role) {
        tokenUtils.clearTokens();
        sessionUtils.clearSession();
        setGeneralError(`This sign in page is reserved for ${role}s.`);
        return;
      }

      tokenUtils.saveTokens(payload.access, payload.refresh);
      sessionUtils.saveUser(payload.user);

      toast.success('Login successful! Redirecting...', {
        duration: 2000,
      });

      setTimeout(() => {
        router.push(redirectPath);
      }, 500);
    } catch (error) {
      console.error('Login error:', error);

      const apiErrors = parseApiError(error);

      if (apiErrors) {
        Object.entries(apiErrors).forEach(([field, message]) => {
          if (field === 'email' || field === 'password') {
            setError(field, { message: String(message) });
          }
        });

        if (apiErrors.non_field_errors) {
          setGeneralError(String(apiErrors.non_field_errors));
        } else if (!apiErrors.email && !apiErrors.password) {
          setGeneralError(errorUtils.getErrorMessage(error));
        }
      } else {
        setGeneralError(errorUtils.getErrorMessage(error));
      }

      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title={title} subtitle={subtitle} showGradient>
      <FormCard
        title={cardTitle}
        description={cardDescription}
        footer={{
          text: "Don't have an account?",
          link: '/register',
          linkText: 'Sign up',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <motion.div variants={itemVariants}>
            <div className="space-y-2">
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                error={errors.password}
                required
                {...register('password')}
              />
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center">
            <input
              type="checkbox"
              id={`${role}RememberMe`}
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor={`${role}RememberMe`}
              className="ml-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400"
            >
              Remember me
            </label>
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormButton
              type="submit"
              isLoading={isLoading}
              loadingText="Signing in..."
              icon={!isLoading && <ArrowRight className="h-4 w-4" />}
              fullWidth
            >
              Sign In
            </FormButton>
          </motion.div>

          <motion.div variants={itemVariants}>
            <SocialLogin isLoading={isLoading} />
          </motion.div>
        </form>
      </FormCard>
    </AuthLayout>
  );
}
