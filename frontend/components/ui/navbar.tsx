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
    className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur-xl"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
      <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold text-brand-950">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-300 via-brand-500 to-gilt-500 text-sm font-bold text-brand-950 shadow-gold">
          N
        </span>
        <span className="text-gradient-gold">NovaTaxi</span>
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative text-sm font-medium text-brand-700 transition hover:text-brand-900 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-brand-400 after:to-gilt-500 after:transition-all after:duration-300 hover:after:w-full"
          >
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
