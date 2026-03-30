import { NextRequest, NextResponse } from "next/server";
import { resetVerificationAttempts, sendOtp } from "@/lib/otpService";

const sendOtpAttempts = new Map<string, number>();
const resendCooldowns = new Map<string, number>();

function getClientKey(req: NextRequest, phone: string) {
  const forwardedFor = req.headers.get("x-forwarded-for") ?? "unknown";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  return `${ip}:${phone}`;
}

function isValidPhone(phone: string) {
  return /^\d{10}$/.test(phone);
}

export async function POST(req: NextRequest) {
  try {
    const { phone } = (await req.json()) as { phone?: string };

    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json({ message: "Invalid phone number" }, { status: 400 });
    }

    const key = getClientKey(req, phone);
    const now = Date.now();
    const resendAvailableAt = resendCooldowns.get(key) ?? 0;
    const sentCount = sendOtpAttempts.get(key) ?? 0;

    if (resendAvailableAt > now) {
      const retryAfter = Math.ceil((resendAvailableAt - now) / 1000);
      return NextResponse.json(
        { message: `Please wait ${retryAfter}s before requesting another OTP` },
        { status: 429 }
      );
    }

    if (sentCount >= 5) {
      return NextResponse.json(
        { message: "OTP request limit reached. Try again later." },
        { status: 429 }
      );
    }

    const result = await sendOtp(phone);

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: result.status });
    }

    sendOtpAttempts.set(key, sentCount + 1);
    resendCooldowns.set(key, now + 30_000);
    resetVerificationAttempts(key);

    return NextResponse.json({ message: result.message, data: result.data }, { status: result.status });
  } catch {
    return NextResponse.json({ message: "Unable to send OTP" }, { status: 500 });
  }
}
