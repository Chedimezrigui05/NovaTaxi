'use client';

import { Motion } from '@/lib/motion';
import Link from 'next/link';

const Footer = () => (
  <Motion.footer
    className="border-t border-slate-200/80 bg-slate-950 text-slate-300"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div>
        <Link href="/" className="mb-3 inline-flex items-center gap-3 text-lg font-semibold text-white">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-950">N</span>
          NovaTaxi
        </Link>
        <p className="max-w-xl text-sm text-slate-400">
          Modern ride experiences for city commuters and professional drivers, built with clarity, motion, and polished utility.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {['Support', 'Company', 'Legal'].map((section) => (
          <div key={section}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{section}</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="#" className="transition hover:text-white">Pricing</Link></li>
              <li><Link href="#" className="transition hover:text-white">FAQ</Link></li>
              <li><Link href="#" className="transition hover:text-white">Status</Link></li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  </Motion.footer>
);

export { Footer };
