import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#e2e8f0] bg-white p-8 text-center shadow-[0_6px_16px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(20,184,166,0.08)] text-[#14b8a6]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-slate-800">Payment Successful</h1>
        <p className="mt-3 text-sm text-slate-600">
          Your booking has been recorded successfully.
        </p>
        <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-[rgba(20,184,166,0.12)]">
          <div className="h-full w-full rounded-full bg-[#14b8a6]" />
        </div>
        <Link
          href="/dashboard"
          className="primary-btn mt-6 inline-flex items-center justify-center px-6 py-3"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
