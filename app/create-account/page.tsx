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

export default function CreateAccountPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetOtp = async () => {
    if (loading) return;

    if (!mobile || mobile.length !== 10) {
      setError("Enter valid mobile number");
      return;
    }

    if (!fullName.trim()) {
      setError("Enter your full name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await sendFirebaseOtp(mobile, RECAPTCHA_CONTAINER_ID);
      router.push(
        `/verify-otp?mobile=${mobile}&name=${encodeURIComponent(
          fullName || ""
        )}&email=${encodeURIComponent(email || "")}`
      );
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
        title="Create Account"
        description="We just need your name to get started."
        footerPrompt="Already have an account?"
        footerLinkLabel="Login"
        footerLinkHref="/login"
      >
        <div className="mb-4">
          <label className="text-xs text-gray-500">FULL NAME</label>
          <input
            type="text"
            placeholder="Enter full name"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-500">
            EMAIL ADDRESS (OPTIONAL)
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-500">MOBILE NUMBER</label>
          <input
            type="text"
            placeholder="Enter 10-digit number"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
          />
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
