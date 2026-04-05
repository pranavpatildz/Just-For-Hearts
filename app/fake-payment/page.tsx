"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FakePaymentPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.push("/payment-success");
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f9fafb",
      }}
    >
      <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>Processing Payment...</h2>

      <p style={{ color: "#6b7280" }}>Secured by Razorpay</p>

      <div
        style={{
          marginTop: "20px",
          width: "40px",
          height: "40px",
          border: "4px solid #e5e7eb",
          borderTop: "4px solid #2563eb",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
