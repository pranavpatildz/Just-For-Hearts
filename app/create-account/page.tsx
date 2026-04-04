"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/public/Navbar";
import AuthSplitLayout from "@/components/public/AuthSplitLayout";

export default function CreateAccountPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetOtp = async () => {
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
    setDevOtp("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile }),
      });

      const data = (await res.json()) as { error?: string; success?: boolean; otp?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to send OTP");
        return;
      }

      if (process.env.NODE_ENV === "development" && data.otp) {
        setDevOtp(data.otp);
        localStorage.setItem("dev_otp", data.otp);
      }

      router.push(
        `/verify-otp?mobile=${mobile}&name=${encodeURIComponent(
          fullName || ""
        )}&email=${encodeURIComponent(email || "")}`
      );
    } catch {
      setError("Something went wrong");
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
        {devOtp && (
          <p className="mt-2 font-semibold text-green-600">
            Dev OTP: {devOtp}
          </p>
        )}

        <button
          type="button"
          onClick={handleGetOtp}
          disabled={loading}
          className="w-full rounded-lg bg-red-500 py-3 font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Sending..." : "Get OTP"}
        </button>
      </AuthSplitLayout>
    </div>
  );
}
