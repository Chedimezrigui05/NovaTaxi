import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 text-slate-950 px-6 py-12">
      <div className="max-w-xl rounded-3xl border border-brand-100 bg-white p-10 text-center shadow-2xl shadow-brand-200/40">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-600">404</p>
        <h1 className="mt-4 text-4xl font-bold text-brand-900">Page not found</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">The page you are looking for does not exist or may have been moved.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-600">
          Return home
        </Link>
      </div>
    </div>
  );
}
