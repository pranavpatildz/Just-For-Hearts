"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Navbar from "@/components/public/Navbar";
import AuthSplitLayout from "@/components/public/AuthSplitLayout";
import { setUser } from "@/src/lib/client-auth";

type VerifiedUser = {
  mobile: string;
  name: string;
  email: string;
};

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const otpInputRef = useRef<HTMLInputElement | null>(null);

  const mobile = searchParams.get("mobile");
  const fullName = searchParams.get("name") ?? "";
  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!mobile) {
      router.replace("/login");
      return;
    }

    otpInputRef.current?.focus();
  }, [mobile, router]);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = window.setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (!mobile) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile,
          otp,
          fullName,
          email,
        }),
      });

      const data = (await res.json()) as {
        error?: string;
        user?: VerifiedUser;
      };

      if (!res.ok || !data.user) {
        setError(data.error ?? "Verification failed");
        return;
      }

      setUser({
        mobile,
        name: data.user.name,
        email: data.user.email,
      });

      window.location.href = "/dashboard";
    } catch {
      setError("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || !mobile) return;

    setError("");

    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile }),
    });

    const data = (await res.json()) as { error?: string };

    if (!res.ok) {
      setError(data.error ?? "Failed to resend OTP");
      return;
    }

    setTimer(60);
    setCanResend(false);
  };

  useEffect(() => {
    if (otp.length === 6 && mobile && !loading) {
      void handleVerify();
    }
  }, [otp]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <AuthSplitLayout
        title="Verify OTP"
        description={
          mobile
            ? `Enter the 6-digit OTP sent to ${mobile}.`
            : "Enter the 6-digit OTP sent to your mobile number."
        }
        footerPrompt={fullName ? "Need to change your details?" : "Need to use another number?"}
        footerLinkLabel={fullName ? "Create Account" : "Login"}
        footerLinkHref={fullName ? "/create-account" : "/login"}
      >
        <div className="mb-4">
          <label className="text-xs text-gray-500">OTP</label>
          <input
            ref={otpInputRef}
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          />
        </div>

        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

        <div className="mt-3 text-sm text-gray-500">
          {canResend ? (
            <button
              type="button"
              onClick={handleResendOtp}
              className="font-medium text-red-500 hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <span>Resend OTP in {timer}s</span>
          )}
        </div>

        <button
          type="button"
          onClick={handleVerify}
          disabled={loading || !mobile}
          className="mt-4 w-full rounded-lg bg-red-500 py-3 font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </AuthSplitLayout>
    </div>
  );
}
