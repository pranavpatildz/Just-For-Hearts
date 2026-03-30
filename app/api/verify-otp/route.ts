import { NextRequest, NextResponse } from "next/server";
import {
  getVerificationAttempts,
  incrementVerificationAttempts,
  resetVerificationAttempts,
  verifyOtp,
} from "@/lib/otpService";

function getClientKey(req: NextRequest, phone: string) {
  const forwardedFor = req.headers.get("x-forwarded-for") ?? "unknown";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  return `${ip}:${phone}`;
}

function isValidPhone(phone: string) {
  return /^\d{10}$/.test(phone);
}

function isValidOtp(otp: string) {
  return /^\d{4,6}$/.test(otp);
}

export async function POST(req: NextRequest) {
  let phone: string | undefined;
  let otp: string | undefined;

  try {
    ({ phone, otp } = (await req.json()) as { phone?: string; otp?: string });

    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json({ message: "Invalid phone number" }, { status: 400 });
    }

    if (!otp || !isValidOtp(otp)) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    const key = getClientKey(req, phone);
    const currentAttempts = getVerificationAttempts(key);

    if (currentAttempts >= 5) {
      return NextResponse.json(
        { message: "Maximum OTP verification attempts reached. Please resend OTP." },
        { status: 429 }
      );
    }

    const result = await verifyOtp(phone, otp);

    if (!result.success) {
      incrementVerificationAttempts(key);
      return NextResponse.json({ message: result.message }, { status: result.status });
    }

    resetVerificationAttempts(key);

    return NextResponse.json({ message: result.message, data: result.data }, { status: result.status });
  } catch {
    return NextResponse.json({ message: "OTP verification failed" }, { status: 500 });
  }
}
