'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function SettingsPage() {
  const [company, setCompany] = useState('NovaTaxi');

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-950">Settings</h1>
        <p className="text-slate-600">Update organization details and preferences.</p>
      </div>
      <Card className="space-y-6 p-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-950">Company Name</label>
          <Input value={company} onChange={(event) => setCompany(event.target.value)} />
        </div>
        <div className="flex justify-end">
          <Button className="bg-brand-500 hover:bg-brand-600 text-slate-950 font-semibold">Save changes</Button>
        </div>
      </Card>
    </div>
  );
}
