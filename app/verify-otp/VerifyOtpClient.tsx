"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Navbar from "@/components/public/Navbar";
import AuthSplitLayout from "@/components/public/AuthSplitLayout";
import {
  clearFirebaseOtpSession,
  getFirebaseOtpErrorMessage,
  hasFirebaseConfirmationResult,
  logFirebaseOtpError,
  RECAPTCHA_CONTAINER_ID,
  sendFirebaseOtp,
  verifyFirebaseOtp,
} from "@/lib/firebase-phone-auth";
import { formatPhone } from "@/lib/phone";
import { getOrCreateUserProfile, upsertUserProfile } from "@/lib/profile";
import { setUser } from "@/src/lib/client-auth";

export default function VerifyOtpClient() {
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
      console.log("ENV:", process.env.NODE_ENV);
      console.log("ConfirmationResult exists:", !!window.confirmationResult);

      if (!hasFirebaseConfirmationResult()) {
        console.warn("ConfirmationResult missing on verify screen, checking stored verification session.");
      }

      await verifyFirebaseOtp(otp);

      await upsertUserProfile({
        mobile,
        email,
        fullName,
      });

      const profile = await getOrCreateUserProfile({
        mobile,
        email,
        fullName,
      });

      if (!profile) {
        setError("Unable to load your profile.");
        return;
      }

      setUser({
        mobile: profile.mobile,
        name: profile.full_name ?? fullName.trim() ?? "User",
        full_name: profile.full_name ?? fullName.trim() ?? "User",
        email: profile.email ?? email.trim() ?? "",
        city: profile.city ?? "",
        language: profile.language ?? "",
        source: profile.source ?? "",
        created_at: profile.created_at ?? undefined,
      });
      clearFirebaseOtpSession();

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("OTP Verify Error:", error);
      logFirebaseOtpError(error);
      setError(getFirebaseOtpErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || !mobile || loading) return;

    setError("");

    try {
      await sendFirebaseOtp(mobile, RECAPTCHA_CONTAINER_ID);
      setTimer(60);
      setCanResend(false);
    } catch (error) {
      logFirebaseOtpError(error);
      setError(getFirebaseOtpErrorMessage(error));
      return;
    }
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
            ? `Enter the 6-digit OTP sent to ${formatPhone(mobile)}.`
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
        <div id={RECAPTCHA_CONTAINER_ID} className="mt-3 min-h-[1px]" />
      </AuthSplitLayout>
    </div>
  );
}
