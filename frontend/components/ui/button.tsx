'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Motion } from '@/lib/motion';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-brand-400 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-brand-400 via-brand-500 to-gilt-500 bg-[length:200%_100%] bg-left text-brand-950 shadow-gold hover:bg-right hover:shadow-gold-lg',
        secondary:
          'border border-brand-200 bg-white text-slate-950 shadow-sm hover:border-brand-400 hover:bg-brand-50',
        ghost: 'bg-transparent text-slate-950 hover:bg-brand-50',
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
    <Motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className="inline-block transition-[background-position] duration-500"
    >
      <Comp className={cn(buttonVariants({ variant, size, className }))} {...props}>
        {variant === 'primary' || variant === undefined ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />
        ) : null}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </Comp>
    </Motion.div>
  );
};

export { Button, buttonVariants };
