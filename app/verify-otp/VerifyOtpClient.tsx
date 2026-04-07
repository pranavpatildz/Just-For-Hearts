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
      const phone = normalizePhone(user.phoneNumber || mobile);

      console.log("LOGIN PHONE:", phone);
      localStorage.setItem("user_phone", phone);

      let profile: Record<string, unknown> | null = null;

      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("mobile", phone)
          .maybeSingle();

        if (error) {
          console.error("SUPABASE FETCH ERROR:", error);
        }

        if (!data) {
          const { data: newProfile, error: insertError } = await supabase
            .from("users")
            .insert([
              {
                mobile: phone,
                full_name: fullName.trim() || null,
                email: email.trim() || null,
              },
            ])
            .select()
            .single();

          if (insertError) {
            console.error("SUPABASE INSERT ERROR:", insertError);
          } else {
            profile = newProfile as Record<string, unknown>;
          }
        } else {
          profile = data as Record<string, unknown>;
        }
      } catch (dbError) {
        console.error("DB ERROR:", dbError);
      }

      setUser({
        mobile: normalizePhoneNumber(String(profile?.mobile || phone)),
        name: String(profile?.full_name || fullName.trim() || "User"),
        full_name: String(profile?.full_name || fullName.trim() || "User"),
        email: String(profile?.email || email.trim() || ""),
        city: String(profile?.city || ""),
        language: String(profile?.language || ""),
        source: String(profile?.source || ""),
        created_at: typeof profile?.created_at === "string" ? profile.created_at : undefined,
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
    </div>
  );
}
