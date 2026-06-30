'use client';

import { Motion } from '@/lib/motion';

const Spinner = () => (
  <Motion.div
    className="inline-flex h-10 w-10 items-center justify-center rounded-full border-4 border-slate-200 border-t-slate-950"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
    aria-label="Loading"
  />
);

export { Spinner };
