'use client';

import { Motion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const Card = ({ className, children, ...props }: CardProps) => (
  <Motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className={cn(
      'rounded-3xl border border-slate-200/80 bg-white/90 shadow-2xl shadow-slate-950/5 backdrop-blur-xl',
      'overflow-hidden',
      className
    )}
    {...props}
  >
    {children}
  </Motion.div>
);

export { Card };
