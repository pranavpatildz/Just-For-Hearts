"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/public/Navbar";
import AuthSplitLayout from "@/components/public/AuthSplitLayout";
import {
  getFirebaseOtpErrorMessage,
  logFirebaseOtpError,
  RECAPTCHA_CONTAINER_ID,
  sendFirebaseOtp,
} from "@/lib/firebase-phone-auth";
import { normalizePhone } from "@/lib/phone";

export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetOtp = async () => {
    if (loading) return;

    if (!mobile || mobile.length !== 10) {
      setError("Enter valid mobile number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const phone = normalizePhone(mobile);
      await sendFirebaseOtp(phone, RECAPTCHA_CONTAINER_ID);
      router.push(`/verify-otp?mobile=${mobile}&name=&email=`);
    } catch (error) {
      logFirebaseOtpError(error);
      setError(getFirebaseOtpErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <AuthSplitLayout
        title="Sign In"
        description="Access your dashboard using your mobile number."
        footerPrompt="Don't have an account?"
        footerLinkLabel="Create Account"
        footerLinkHref="/create-account"
      >
        <div className="mb-4">
          <label className="text-xs text-gray-500">MOBILE NUMBER</label>

          <div className="mt-1 flex items-center rounded-lg border border-gray-200 px-3 py-2">
            <span className="mr-2 text-gray-500">+91</span>
            <input
              type="tel"
              maxLength={10}
              placeholder="Enter 10-digit number"
              className="w-full text-sm outline-none"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
            />
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <button
          type="button"
          onClick={handleGetOtp}
          disabled={loading}
          className="w-full rounded-lg bg-red-500 py-3 font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Sending..." : "Get OTP"}
        </button>
        <div id={RECAPTCHA_CONTAINER_ID} className="mt-3 min-h-[1px]" />
      </AuthSplitLayout>
    </div>
  );
}
