/**
 * FormInput Component - Reusable text input field
 * 
 * Features:
 * - Integrated with React Hook Form
 * - Tailwind styling
 * - Error message display
 * - Icon support
 * - Responsive design
 * - Dark mode compatible
 */

'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  icon?: LucideIcon;
  helperText?: string;
  required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      icon: Icon,
      helperText,
      required,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Icon
                className={cn(
                  'w-5 h-5',
                  error
                    ? 'text-red-500'
                    : 'text-gray-400 dark:text-gray-500'
                )}
              />
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full px-4 py-2.5 border rounded-lg',
              'bg-white dark:bg-gray-800',
              'text-gray-900 dark:text-white',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'border-gray-300 dark:border-gray-600',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'transition-colors duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              Icon && 'pl-10',
              error &&
                'border-red-500 focus:ring-red-500 dark:focus:ring-red-500',
              !error &&
                'focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500',
              className
            )}
            {...props}
          />
        </div>

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

FormInput.displayName = 'FormInput';
