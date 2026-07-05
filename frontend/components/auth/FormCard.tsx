/**
 * FormCard Component - Card wrapper for auth forms
 * 
 * Features:
 * - Title and description
 * - Footer link for navigation
 * - Tailwind styling
 * - Dark mode compatible
 * - Responsive design
 */

'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FormCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: {
    text: string;
    link: string;
    linkText: string;
  };
  className?: string;
}

export const FormCard: React.FC<FormCardProps> = ({
  title,
  description,
  children,
  footer,
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full max-w-md px-6 py-8 rounded-2xl',
        'bg-white dark:bg-gray-900',
        'border border-gray-200 dark:border-gray-800',
        'shadow-lg dark:shadow-2xl',
        className
      )}
    >
      {/* Header */}
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {description}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4 mb-6">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {footer.text}{' '}
            <Link
              href={footer.link}
              className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              {footer.linkText}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

FormCard.displayName = 'FormCard';
