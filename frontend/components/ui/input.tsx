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
      'w-full rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-slate-950 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-200',
      className
    )}
    {...props}
  />
);

export { Input };
