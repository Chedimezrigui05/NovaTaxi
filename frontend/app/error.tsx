'use client';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 text-slate-950 px-6 py-12">
      <div className="max-w-xl rounded-3xl border border-brand-100 bg-white p-10 shadow-2xl shadow-brand-200/40">
        <h1 className="text-3xl font-bold text-brand-900">Something went wrong</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">An unexpected error occurred while loading this page.</p>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-100 p-4 text-xs text-slate-700">
          {error.message}
        </pre>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-600"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
