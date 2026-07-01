'use client';

import { Motion } from '@/lib/motion';
import Link from 'next/link';

const Footer = () => (
  <Motion.footer
    className="bg-white text-black"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-300 via-brand-500 to-gilt-500 text-lg font-bold text-black shadow-gold">
          N
        </div>
        <div>
          <p className="text-sm font-semibold text-gradient-gold">NovaTaxi</p>
          <p className="text-sm text-black">
            Modern ride experiences for city commuters and professional drivers, built with clarity, motion, and polished utility.
          </p>
        </div>
      </div>

      <div className="text-sm text-black">
        <p>© 2026 NovaTaxi. Développé par Chedi Mezrigui.</p>
        <p className="mt-1">Email : chedimezrigui05@gmail.com</p>
      </div>
    </div>
  </Motion.footer>
);

export { Footer };
