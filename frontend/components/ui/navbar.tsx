'use client';

import Link from 'next/link';
import { Motion } from '@/lib/motion';
import { Button } from './button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => (
  <Motion.header
    className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
      <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold text-slate-950">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
          N
        </span>
        NovaTaxi
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-700 transition hover:text-slate-950">
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">Sign in</Button>
        <Button variant="primary" size="sm">Book ride</Button>
      </div>
    </div>
  </Motion.header>
);

export { Navbar };
