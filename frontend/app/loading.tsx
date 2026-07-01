export default function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 text-slate-950">
      <div className="rounded-3xl border border-brand-100 bg-white/90 p-8 text-center shadow-xl shadow-brand-200/40">
        <p className="text-lg font-semibold">Loading NovaTaxi...</p>
        <p className="mt-2 text-sm text-brand-700">Please wait while we prepare your experience.</p>
      </div>
    </div>
  );
}
