import { Footer } from '@/components/navigation/Footer';
import { Header } from '@/components/navigation/Header';
import type { PropsWithChildren } from 'react';

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-brand-50 text-slate-950">
      <Header variant="public" />
      <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
