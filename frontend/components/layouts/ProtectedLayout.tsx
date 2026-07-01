import { Footer } from '@/components/navigation/Footer';
import { Header } from '@/components/navigation/Header';
import { Sidebar } from '@/components/navigation/Sidebar';
import type { PropsWithChildren } from 'react';

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header variant="protected" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>
        <main className="rounded-3xl border border-brand-100 bg-white/90 p-6 shadow-lg shadow-brand-100/30">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
