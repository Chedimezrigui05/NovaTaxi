import { Card } from '@/components/ui/card';

export default function DriversPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-950">Drivers</h1>
        <p className="text-slate-600">Manage driver profiles and performance metrics.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {['Alicia', 'Jordan', 'Mia'].map((driver) => (
          <Card key={driver} className="p-6">
            <h2 className="text-xl font-semibold text-slate-950">{driver}</h2>
            <p className="mt-2 text-slate-600">Rating: 4.9 / 5</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
