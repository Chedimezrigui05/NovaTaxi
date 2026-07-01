import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white/95 text-slate-700">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold text-brand-950">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-300 via-brand-500 to-gilt-500 text-sm font-bold text-brand-950 shadow-gold">N</span>
            <span className="text-gradient-gold">NovaTaxi</span>
          </Link>
          <p className="mt-3 max-w-lg text-sm text-slate-500">
            Modern ride experiences for city commuters and professional drivers.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-brand-700">
          <Link href="/about" className="transition hover:text-brand-900">
            About
          </Link>
          <Link href="/contact" className="transition hover:text-brand-900">
            Contact
          </Link>
          <Link href="/privacy" className="transition hover:text-brand-900">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
