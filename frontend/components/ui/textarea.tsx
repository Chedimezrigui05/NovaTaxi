'use client';

import { Motion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { TextareaHTMLAttributes, DetailedHTMLProps } from 'react';

export interface TextareaProps
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {}

const Textarea = ({ className, ...props }: TextareaProps) => (
  <Motion.textarea
    whileFocus={{ scale: 1.005 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    className={cn(
      'min-h-[140px] w-full rounded-3xl border border-brand-200/80 bg-brand-50 px-4 py-3 text-slate-950 placeholder:text-brand-400 outline-none transition-colors duration-200 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-200',
      className
    )}
    {...props}
  />
);

export { Textarea };
