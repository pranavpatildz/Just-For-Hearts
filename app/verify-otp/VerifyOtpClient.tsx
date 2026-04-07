"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Navbar from "@/components/public/Navbar";
import AuthSplitLayout from "@/components/public/AuthSplitLayout";
import {
  clearFirebaseOtpSession,
  RECAPTCHA_CONTAINER_ID,
  sendFirebaseOtp,
} from "@/lib/firebase-phone-auth";
import { supabase } from "@/lib/supabase";
import { normalizePhone, normalizePhoneNumber } from "@/lib/phone";
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
  const [showModal, setShowModal] = useState(false);
  const [redirectPhone, setRedirectPhone] = useState("");

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
      const confirmationResult = window.confirmationResult;

      if (!confirmationResult) {
        throw new Error("Session expired. Please resend OTP.");
      }

      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      const formattedPhone = normalizePhone(user.phoneNumber || mobile);

      console.log("Checking user with phone:", formattedPhone);
      console.log("LOGIN PHONE:", formattedPhone);
      localStorage.setItem("user_phone", formattedPhone);
      localStorage.setItem("mobile", formattedPhone);

      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("mobile", formattedPhone)
        .maybeSingle();

      if (!existingUser) {
        console.log("User NOT found in DB");
        console.error("FETCH ERROR:", fetchError);
        clearFirebaseOtpSession();
        setError("No account found with this number");
        setRedirectPhone(formattedPhone);
        setShowModal(true);

        window.setTimeout(() => {
          window.location.href = `/create-account?mobile=${encodeURIComponent(formattedPhone)}`;
        }, 2000);

        return;
      }

      if (fetchError) {
        throw fetchError;
      }

      console.log("User found:", existingUser);

      setUser({
        mobile: normalizePhoneNumber(String(existingUser.mobile || formattedPhone)),
        name: String(existingUser.full_name || fullName.trim() || "User"),
        full_name: String(existingUser.full_name || fullName.trim() || "User"),
        email: String(existingUser.email || email.trim() || ""),
        city: String(existingUser.city || ""),
        language: String(existingUser.language || ""),
        source: String(existingUser.source || ""),
        created_at:
          typeof existingUser.created_at === "string" ? existingUser.created_at : undefined,
      });
      clearFirebaseOtpSession();

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("FULL OTP ERROR:", error);
      console.error("STRING ERROR:", JSON.stringify(error, null, 2));
      setError(
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message)
          : "OTP failed"
      );
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
      console.error("FULL OTP ERROR:", error);
      console.error("STRING ERROR:", JSON.stringify(error, null, 2));
      setError(
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message)
          : "OTP verification failed"
      );
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
            ? `Enter the 6-digit OTP sent to ${normalizePhoneNumber(mobile)}.`
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="animate-fadeIn w-[90%] max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="mb-2 text-3xl text-red-500">⚠️</div>
            <h2 className="text-lg font-semibold text-gray-800">No Account Found</h2>
            <p className="mt-2 text-sm text-gray-500">
              Please create an account first to continue.
            </p>

            <button
              onClick={() => {
                window.location.href = `/create-account?mobile=${encodeURIComponent(redirectPhone)}`;
              }}
              className="mt-4 w-full rounded-lg bg-teal-500 py-2 text-white transition hover:bg-teal-600"
            >
              Create Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
