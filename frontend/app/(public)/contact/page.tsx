'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

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
            Get in touch
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">Questions, feedback, or support? We’re here for you.</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Fill out the form and our team will respond quickly to help you with your NovaTaxi experience.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-8 p-10">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Customer support</p>
            <h2 className="text-2xl font-bold text-slate-950">We’re ready to help.</h2>
            <p className="text-slate-600">Reach out for ride support, account questions, partnerships, or general feedback.</p>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-brand-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Phone</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">+216 12 345 678</p>
            </div>
            <div className="rounded-3xl bg-brand-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Email</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">chedimezrigui05@gmail.com</p>
            </div>
          </div>
        </Card>

        <Card className="p-10">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-950">Name</label>
              <Input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Votre nom"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-950">Email</label>
              <Input
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="votre@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-950">Message</label>
              <Textarea
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                placeholder="Écrivez votre message ici..."
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-brand-500 hover:bg-brand-600 text-slate-950 font-semibold">
                Envoyer
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </div>
  );
}
