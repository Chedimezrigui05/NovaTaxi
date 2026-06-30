'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Motion } from '@/lib/motion';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-slate-950 text-white shadow-lg shadow-slate-950/20 hover:bg-slate-800',
        secondary: 'bg-white text-slate-950 border border-slate-200 hover:border-slate-300',
        ghost: 'bg-transparent text-slate-950 hover:bg-slate-100',
        destructive: 'bg-rose-500 text-white hover:bg-rose-600',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-5 text-sm font-medium',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({ className, variant, size, asChild = false, children, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Motion.div whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }}>
      <Comp className={cn(buttonVariants({ variant, size, className }))} {...props}>
        {children}
      </Comp>
    </Motion.div>
  );
};

export { Button, buttonVariants };
