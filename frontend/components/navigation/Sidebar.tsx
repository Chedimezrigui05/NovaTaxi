import Link from 'next/link';

const sidebarItems = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Trips', href: '/dashboard/trips' },
  { label: 'Clients', href: '/dashboard/clients' },
  { label: 'Drivers', href: '/dashboard/drivers' },
  { label: 'Settings', href: '/dashboard/settings' },
];

export function Sidebar() {
  return (
    <nav className="space-y-4 rounded-3xl border border-brand-100 bg-white/90 p-6 shadow-lg shadow-brand-100/30">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-500">Management</p>
      <div className="space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-brand-50 hover:text-brand-900"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
