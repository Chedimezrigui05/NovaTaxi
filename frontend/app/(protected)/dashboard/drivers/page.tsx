import { Card } from '@/components/ui/card';

const drivers = [
  {
    name: 'Alicia Mansour',
    status: 'Available',
    rating: '4.9',
    rides: 128,
    vehicle: 'Toyota Corolla',
    plate: 'TN 1845',
  },
  {
    name: 'Jordan Khelifi',
    status: 'Busy',
    rating: '4.8',
    rides: 96,
    vehicle: 'Hyundai i20',
    plate: 'TN 2201',
  },
  {
    name: 'Mia Saidi',
    status: 'Offline',
    rating: '4.7',
    rides: 143,
    vehicle: 'Kia Rio',
    plate: 'TN 3112',
  },
];

const metrics = [
  { label: 'Total Drivers', value: '87' },
  { label: 'Available', value: '42' },
  { label: 'On Ride', value: '19' },
];

export default function DriversPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-950">Drivers</h1>
        <p className="text-slate-600">Manage driver profiles, availability, vehicles, and performance metrics.</p>
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
        {drivers.map((driver) => (
          <Card key={driver.name} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">{driver.name}</h2>
                <p className="mt-1 text-sm text-slate-600">{driver.vehicle}</p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                {driver.status}
              </span>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-slate-500">Rating</dt>
                <dd className="mt-1 font-semibold text-slate-950">{driver.rating} / 5</dd>
              </div>
              <div>
                <dt className="text-slate-500">Rides</dt>
                <dd className="mt-1 font-semibold text-slate-950">{driver.rides}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-500">Plate</dt>
                <dd className="mt-1 font-semibold text-slate-950">{driver.plate}</dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>
    </div>
  );
}
