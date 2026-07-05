import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-950">Dashboard</h1>
        <p className="text-slate-600">Overview of rides, drivers, and operational metrics.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-500">Rides</p>
          <p className="mt-4 text-3xl font-bold text-slate-950">1,248</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-500">Active Drivers</p>
          <p className="mt-4 text-3xl font-bold text-slate-950">87</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-500">Completion Rate</p>
          <p className="mt-4 text-3xl font-bold text-slate-950">98.6%</p>
        </Card>
      </div>
    </div>
  );
}
