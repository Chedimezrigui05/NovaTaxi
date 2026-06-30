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
      'min-h-[140px] w-full rounded-3xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-slate-950 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-200',
      className
    )}
    {...props}
  />
);

export { Textarea };
