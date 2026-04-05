import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-2xl font-semibold text-slate-800">Payment Successful</h1>
        <p className="mt-3 text-sm text-slate-600">
          Your booking has been recorded successfully.
        </p>
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
