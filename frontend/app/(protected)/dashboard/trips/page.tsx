import { Card } from '@/components/ui/card';

export default function TripsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-950">Trips</h1>
        <p className="text-slate-600">Your recent trip history and ride details.</p>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((trip) => (
          <Card key={trip} className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-brand-500 uppercase tracking-[0.24em]">Trip #{trip}</p>
                <p className="mt-1 font-semibold text-slate-950">Downtown to Airport</p>
              </div>
              <p className="text-sm font-semibold text-slate-950">$28.50</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
