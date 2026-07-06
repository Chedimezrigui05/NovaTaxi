import { Card } from '@/components/ui/card';

const clients = [
  {
    name: 'Amira Ben Salah',
    status: 'Active',
    rides: 18,
    payment: 'Card',
    home: 'Lac 2',
    lastRide: 'Today, 09:30',
  },
  {
    name: 'Youssef Trabelsi',
    status: 'Pending',
    rides: 4,
    payment: 'Cash',
    home: 'Marsa',
    lastRide: 'Yesterday, 18:15',
  },
  {
    name: 'Nour Haddad',
    status: 'Active',
    rides: 27,
    payment: 'Wallet',
    home: 'Centre Urbain Nord',
    lastRide: 'Jul 4, 2026',
  },
];

const metrics = [
  { label: 'Total Clients', value: '1,420' },
  { label: 'Active Today', value: '312' },
  { label: 'New This Week', value: '48' },
];

export default function ClientsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-950">Clients</h1>
        <p className="text-slate-600">Manage client profiles, ride activity, and preferred payment methods.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-500">{metric.label}</p>
            <p className="mt-3 text-2xl font-bold text-slate-950">{metric.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {clients.map((client) => (
          <Card key={client.name} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">{client.name}</h2>
                <p className="mt-1 text-sm text-slate-600">{client.home}</p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                {client.status}
              </span>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-slate-500">Rides</dt>
                <dd className="mt-1 font-semibold text-slate-950">{client.rides}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Payment</dt>
                <dd className="mt-1 font-semibold text-slate-950">{client.payment}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-500">Last ride</dt>
                <dd className="mt-1 font-semibold text-slate-950">{client.lastRide}</dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>
    </div>
  );
}
