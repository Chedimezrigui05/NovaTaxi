/**
 * Alert Component - Display messages (errors, success, info, warning)
 * 
 * Features:
 * - Multiple variants (error, success, info, warning)
 * - Icon support
 * - Dismissible
 * - Tailwind styling
 * - Dark mode compatible
 */

'use client';

import React, { ReactNode } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps {
  variant?: 'error' | 'success' | 'info' | 'warning';
  title?: string;
  message: string | ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  message,
  onDismiss,
  className,
}) => {
  const icons = {
    error: <AlertCircle className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
  };

  const styles = {
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: 'text-red-600 dark:text-red-400',
      title: 'text-red-900 dark:text-red-200',
      text: 'text-red-800 dark:text-red-100',
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: 'text-green-600 dark:text-green-400',
      title: 'text-green-900 dark:text-green-200',
      text: 'text-green-800 dark:text-green-100',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      title: 'text-blue-900 dark:text-blue-200',
      text: 'text-blue-800 dark:text-blue-100',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: 'text-yellow-600 dark:text-yellow-400',
      title: 'text-yellow-900 dark:text-yellow-200',
      text: 'text-yellow-800 dark:text-yellow-100',
    },
  };

  const style = styles[variant];

  return (
    <div
      className={cn(
        'rounded-lg border p-4 flex gap-3',
        style.bg,
        style.border,
        className
      )}
    >
      <div className={cn('flex-shrink-0 mt-0.5', style.icon)}>
        {icons[variant]}
      </div>

      <div className="flex-1 min-w-0">
        {title && <p className={cn('font-semibold', style.title)}>{title}</p>}
        <p className={cn('text-sm', style.text)}>{message}</p>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className={cn(
            'flex-shrink-0 inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
            'focus:outline-none transition-colors'
          )}
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
