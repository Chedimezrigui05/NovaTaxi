'use client';

import { Motion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';

type BadgeProps = ComponentPropsWithoutRef<'div'> & {
  variant?: 'default' | 'success' | 'warning' | 'destructive';
};

const badgeStyles = {
  default: 'bg-slate-950 text-white',
  success: 'bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20',
  warning: 'bg-amber-400/10 text-amber-700 ring-1 ring-amber-400/30',
  destructive: 'bg-rose-500/10 text-rose-600 ring-1 ring-rose-500/15',
};

const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => (
  <Motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    {...props}
    className={cn(
      'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase shadow-sm',
      badgeStyles[variant],
      className
    )}
  />
);

export { Badge };
