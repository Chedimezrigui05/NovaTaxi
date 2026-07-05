import Link from 'next/link';
import { Card } from '@/components/ui/card';

const services = [
  {
    name: 'Standard',
    description: 'Everyday rides with top-rated drivers for trips around the city.',
    accent: 'bg-brand-100 text-brand-800',
  },
  {
    name: 'Confort',
    description: 'Upgraded vehicles and priority service for important trips.',
    accent: 'bg-brand-100 text-brand-800',
  },
  {
    name: 'XL',
    description: 'Spacious vehicles for groups, luggage, and family travel.',
    accent: 'bg-brand-100 text-brand-800',
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-brand-100 bg-white/90 p-10 shadow-lg shadow-brand-100/30">
        <div className="max-w-3xl space-y-4">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-brand-200 bg-white px-3 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            ← Retour à l’accueil
          </Link>
          <p className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-700">
            Our services
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">Designed for every ride, from daily commutes to city travel.</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            NovaTaxi makes it easy to select the ride type that fits your schedule, budget, and comfort preferences.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.name} className="group overflow-hidden p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${service.accent}`}>
              {service.name}
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-slate-950">{service.name}</h2>
            <p className="mt-4 text-slate-600">{service.description}</p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition group-hover:text-brand-900">
              Book this ride
              <span aria-hidden="true">→</span>
            </div>
          </Card>
        ))}
      </section>

      <section className="rounded-3xl border border-brand-100 bg-brand-50 p-10 text-slate-950 shadow-lg shadow-brand-100/30">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Need a custom plan?</p>
            <h2 className="mt-3 text-2xl font-bold">Tailored transportation for teams and events.</h2>
          </div>
          <button className="inline-flex rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-600">
            Contact sales
          </button>
        </div>
      </section>
    </div>
  );
}
