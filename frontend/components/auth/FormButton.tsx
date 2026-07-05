/**
 * FormButton Component - Button with loading state
 * 
 * Features:
 * - Loading spinner
 * - Disabled state
 * - Multiple variants (primary, secondary, outline)
 * - Full width option
 * - Tailwind styling
 * - Dark mode compatible
 */

'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  loadingText?: string;
}

export const FormButton: React.FC<FormButtonProps> = ({
  isLoading = false,
  children,
  variant = 'primary',
  fullWidth = true,
  icon,
  loadingText,
  className,
  disabled,
  type = 'submit',
  ...props
}) => {
  const baseStyles = cn(
    'px-4 py-2.5 rounded-lg font-medium',
    'transition-all duration-200',
    'flex items-center justify-center gap-2',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    fullWidth && 'w-full',
    'text-sm font-semibold'
  );

  const variantStyles = {
    primary: cn(
      'bg-blue-600 hover:bg-blue-700 text-white',
      'focus:ring-blue-500',
      'dark:bg-blue-600 dark:hover:bg-blue-700'
    ),
    secondary: cn(
      'bg-gray-200 hover:bg-gray-300 text-gray-900',
      'focus:ring-gray-400',
      'dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
    ),
    outline: cn(
      'border-2 border-gray-300 hover:border-gray-400 text-gray-900',
      'focus:ring-gray-400',
      'dark:border-gray-600 dark:hover:border-gray-500 dark:text-white'
    ),
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

FormButton.displayName = 'FormButton';
