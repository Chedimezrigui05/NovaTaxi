import Link from 'next/link';
import { Card } from '@/components/ui/card';

const rideFields = [
  { label: 'Pickup', value: 'Your current address' },
  { label: 'Destination', value: 'Where are you going?' },
  { label: 'Ride type', value: 'Standard, Comfort, or XL' },
];

export default function BookPage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
        <div className="space-y-6 rounded-3xl border border-brand-100 bg-white/90 p-8 shadow-lg shadow-brand-100/30 lg:p-10">
          <p className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-700">
            Client booking
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-950">
              Sign in or create a client account to book your ride.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Booking is available only for registered clients so we can save your trip details, assign a driver, and keep your ride secure.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-gilt-500 px-6 py-3 text-sm font-semibold text-brand-950 shadow-gold transition hover:shadow-gold-lg"
            >
              Sign in to book
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-brand-400 hover:bg-brand-50"
            >
              Create client account
            </Link>
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-500">Ride preview</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Book after authentication</h2>
            </div>

            <div className="space-y-3">
              {rideFields.map((field) => (
                <div key={field.label} className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{field.label}</p>
                  <p className="mt-2 text-sm font-medium text-slate-700">{field.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-slate-950 p-4 text-white">
              <p className="text-sm text-brand-200">Next step</p>
              <p className="mt-1 font-semibold">Authenticate as a client, then confirm the ride.</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
