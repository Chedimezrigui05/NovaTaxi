'use client';

import { AnimatePresence } from 'framer-motion';
import { Motion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ToastProps {
  open: boolean;
  message: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  duration?: number;
  onClose: () => void;
  action?: ReactNode;
}

const toastStyles = {
  default: 'bg-brand-500 text-slate-950',
  success: 'bg-emerald-600 text-white',
  warning: 'bg-brand-500 text-slate-950',
  destructive: 'bg-rose-600 text-white',
};

const Toast = ({ open, message, variant = 'default', duration = 4000, onClose, action }: ToastProps) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <Motion.div
        className={cn(
          'fixed right-4 top-4 z-50 w-[min(380px,calc(100%-2rem))] rounded-3xl px-5 py-4 shadow-2xl shadow-brand-500/20',
          toastStyles[variant]
        )}
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 32 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm leading-6">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] transition hover:bg-white/20"
          >
            Dismiss
          </button>
        </div>
        {action ? <div className="mt-3">{action}</div> : null}
      </Motion.div>
    </AnimatePresence>
  );
};

export { Toast };
