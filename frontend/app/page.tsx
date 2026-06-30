'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/ui/footer';
import { Heading, SectionTitle, Subheading } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Navbar } from '@/components/ui/navbar';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Toast } from '@/components/ui/toast';
import { useMemo, useState } from 'react';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(true);

  const tableHeaders = useMemo(() => ['Ride', 'Status', 'ETA', 'Fare'], []);
  const tableRows = useMemo(
    () => [
      ['Central Park → Midtown', 'On route', '4 min', '$12.50'],
      ['Airport → Downtown', 'Arriving', '2 min', '$22.00'],
      ['Union Square → Brooklyn', 'Completed', '—', '$18.00'],
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div className="space-y-6">
            <Heading>NovaTaxi Design System</Heading>
            <Subheading>
              Modern, responsive, and accessible UI primitives inspired by Apple and Uber for premium ride experiences.
            </Subheading>
            <div className="flex flex-wrap gap-3">
              <Badge>Live</Badge>
              <Badge variant="success">Ready</Badge>
              <Badge variant="warning">Beta</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button>Primary action</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
          </div>

          <Card className="space-y-6 p-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Quick actions</p>
              <div className="grid gap-3">
                <Button size="lg">Book a ride</Button>
                <Button variant="ghost">View fleet</Button>
              </div>
            </div>
            <div className="space-y-4">
              <SectionTitle>Contact details</SectionTitle>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Pickup</p>
                  <Input placeholder="Enter pickup location" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Dropoff</p>
                  <Input placeholder="Enter dropoff location" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Notes</p>
                  <Textarea placeholder="Add special instructions" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-16 space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <SectionTitle>Live rides</SectionTitle>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Clean tables and status indicators help riders and dispatchers scan trip details quickly.
              </p>
              <Table headers={tableHeaders} rows={tableRows} className="mt-8" />
            </Card>

            <Card className="space-y-6 p-6">
              <SectionTitle>Loading states</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-sm text-slate-600">Content placeholder</p>
                  <div className="space-y-2">
                    <div className="h-24 rounded-3xl bg-slate-200/70 animate-pulse" />
                    <div className="h-24 rounded-3xl bg-slate-200/70 animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Spinner />
                <span className="text-sm text-slate-600">Waiting for location data…</span>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <SectionTitle>Interactive patterns</SectionTitle>
              <Button variant="secondary" onClick={() => setModalOpen(true)}>
                Open modal
              </Button>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              The modal supports keyboard and pointer interactions with smooth motion transitions.
            </p>
          </Card>
        </section>
      </main>

      <Footer />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm ride details"
        description="Review your trip summary before confirming pickup."
      >
        <div className="space-y-4">
          <p className="text-sm leading-6 text-slate-700">
            Your driver will arrive in 3 minutes. Tap confirm to secure this ride with NovaTaxi.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button>Confirm ride</Button>
          </div>
        </div>
      </Modal>

      <Toast
        open={toastOpen}
        message="Your ride is ready to confirm."
        variant="success"
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
