import Link from 'next/link';
import { Card } from '@/components/ui/card';

const values = [
  { title: 'Trust', description: 'Verified drivers, transparent pricing, and real-time tracking at every step.' },
  { title: 'Speed', description: 'Quick dispatch and reliable arrival times for all rides.' },
  { title: 'Comfort', description: 'Clean vehicles and thoughtful service for a smoother journey.' },
];

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-brand-100 bg-white/90 p-10 shadow-lg shadow-brand-100/30">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-brand-200 bg-white px-3 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              ← Retour à l’accueil
            </Link>
          </div>
          <div>
            <p className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-700">
              Our story
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950">Built to move cities forward with safe, friendly rides.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              NovaTaxi began with a simple vision: make urban travel more dependable and delightful for riders and drivers alike.
            </p>
          </div>
          <div className="rounded-3xl bg-brand-50 p-8 text-slate-950 shadow-inner shadow-brand-100/40">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">20M+ rides</p>
            <p className="mt-4 text-3xl font-bold">A trusted ride partner for every season.</p>
            <p className="mt-4 text-slate-600">Consistent performance, modern tech, and flexible ride options at your fingertips.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {values.map((value) => (
          <Card key={value.title} className="p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">{value.title}</p>
            <p className="mt-5 text-slate-600">{value.description}</p>
          </Card>
        ))}
      </section>

      <section className="rounded-3xl border border-brand-100 bg-brand-50 p-10 text-slate-950 shadow-lg shadow-brand-100/30">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold">We make every ride count.</h2>
            <p className="mt-4 text-slate-600">
              Our team is focused on delivering fast, safe, and accessible transportation across the city.
            </p>
          </div>
          <div className="space-y-3 rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Join our mission</p>
            <p className="text-lg font-semibold text-slate-950">The fastest-growing ride experience for modern commuters.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
