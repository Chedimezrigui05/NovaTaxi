import Link from 'next/link';
import { AuthLayout } from '@/components/auth/AuthLayout';

const loginSpaces = [
  {
    title: 'Client',
    description: 'Sign in to book rides, follow trips, and manage your passenger profile.',
    href: '/login/client',
    action: 'Client sign in',
  },
  {
    title: 'Driver',
    description: 'Sign in to manage your availability, vehicle details, and assigned rides.',
    href: '/login/driver',
    action: 'Driver sign in',
  },
];

export default function LoginPage() {
  return (
    <AuthLayout title="Choose Your Sign In Space" subtitle="Clients and drivers use separate access pages" showGradient>
      <div className="grid w-full max-w-4xl gap-5 md:grid-cols-2">
        {loginSpaces.map((space) => (
          <Link
            key={space.href}
            href={space.href}
            className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">{space.title}</p>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{space.action}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{space.description}</p>
            <span className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
              Continue
            </span>
          </Link>
        ))}
      </div>
    </AuthLayout>
  );
}
