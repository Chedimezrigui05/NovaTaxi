import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

type HeaderProps = {
  variant: 'public' | 'protected';
};

export function Header({ variant }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/80 backdrop-blur-xl">
      <div className="divider-gold absolute inset-x-0 top-0" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold text-brand-950">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-300 via-brand-500 to-gilt-500 text-sm font-bold text-brand-950 shadow-gold">
            N
          </span>
          <span className="text-gradient-gold">NovaTaxi</span>
        </Link>
        {variant === 'public' ? (
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium text-brand-700 transition hover:text-brand-900 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-brand-400 after:to-gilt-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-gilt-500 px-5 py-2 text-sm font-semibold text-brand-950 shadow-gold transition hover:shadow-gold-lg"
            >
              Dashboard
            </Link>
          </nav>
        ) : (
          <div className="hidden items-center gap-4 md:flex">
            <span className="text-sm font-medium text-brand-700">Dashboard</span>
            <button className="rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-gilt-500 px-5 py-2 text-sm font-semibold text-brand-950 shadow-gold transition hover:shadow-gold-lg">
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
