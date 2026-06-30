'use client';

import { Motion } from '@/lib/motion';
import type { HTMLAttributes } from 'react';

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <Motion.div
    className={`animate-pulse rounded-3xl bg-slate-200/70 ${className ?? ''}`}
    initial={{ opacity: 0.7 }}
    animate={{ opacity: [0.7, 1, 0.7] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    aria-busy="true"
    {...props}
  />
);

export { Skeleton };
