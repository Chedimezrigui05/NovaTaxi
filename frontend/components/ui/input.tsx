'use client';

import { Motion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { InputHTMLAttributes, DetailedHTMLProps } from 'react';

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const Input = ({ className, ...props }: InputProps) => (
  <Motion.input
    whileFocus={{ scale: 1.005 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    className={cn(
      'w-full rounded-2xl border border-brand-200/80 bg-brand-50 px-4 py-3 text-slate-950 placeholder:text-brand-400 outline-none transition-colors duration-200 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-200',
      className
    )}
    {...props}
  />
);

export { Input };
