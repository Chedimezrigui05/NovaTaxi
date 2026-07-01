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
      'gold-ring rounded-3xl border border-brand-100 bg-white/90 shadow-glow backdrop-blur-xl',
      'overflow-hidden transition-shadow duration-300 hover:shadow-gold-lg',
      className
    )}
    {...props}
  >
    {children}
  </Motion.div>
);

export { Card };
