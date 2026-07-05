/**
 * PasswordInput Component - Password input with visibility toggle
 * 
 * Features:
 * - Eye icon toggle for password visibility
 * - Password strength indicator
 * - Integrated with React Hook Form
 * - Tailwind styling
 * - Dark mode compatible
 */

'use client';

import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formUtils } from '@/lib/auth-utils';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  required?: boolean;
  showStrength?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      className,
      disabled,
      showStrength = false,
      value,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState<0 | 1 | 2 | 3 | 4>(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (showStrength) {
        setPasswordStrength(formUtils.getPasswordStrength(e.target.value));
      }
      props.onChange?.(e);
    };

    const strength = formUtils.getPasswordStrengthLabel(passwordStrength);

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock
              className={cn(
                'w-5 h-5',
                error
                  ? 'text-red-500'
                  : 'text-gray-400 dark:text-gray-500'
              )}
            />
          </div>

          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            className={cn(
              'w-full px-4 py-2.5 pl-10 pr-10 border rounded-lg',
              'bg-white dark:bg-gray-800',
              'text-gray-900 dark:text-white',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'border-gray-300 dark:border-gray-600',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'transition-colors duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error &&
                'border-red-500 focus:ring-red-500 dark:focus:ring-red-500',
              !error &&
                'focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500',
              className
            )}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {showStrength && value && (
          <div className="space-y-1">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-colors',
                    i < passwordStrength
                      ? strength.color.replace('text-', 'bg-')
                      : 'bg-gray-200 dark:bg-gray-700'
                  )}
                />
              ))}
            </div>
            <p className={cn('text-xs font-medium', strength.color)}>
              Strength: {strength.label}
            </p>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {error.message}
          </p>
        )}

        {helperText && !error && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
