'use client';

import { AnimatePresence } from 'framer-motion';
import { Motion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

const Modal = ({ open, onClose, title, description, children }: ModalProps) => (
  <AnimatePresence>
    {open ? (
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-6 sm:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Motion.div
          className={cn(
            'w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-950/20',
            'border border-slate-200'
          )}
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="mb-6 space-y-3">
            <h2 id="modal-title" className="text-2xl font-semibold text-slate-950">
              {title}
            </h2>
            {description ? (
              <p id="modal-description" className="text-sm text-slate-600">
                {description}
              </p>
            ) : null}
          </div>
          <div className="space-y-4">{children}</div>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Close
          </button>
        </Motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);

export { Modal };
