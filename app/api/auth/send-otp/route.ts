import { NextRequest, NextResponse } from "next/server";

import { setOtp } from "@/lib/otpStore";

export async function POST(req: NextRequest) {
  try {
    const { mobile } = (await req.json()) as { mobile?: string };
    console.log("Incoming body:", { mobile });

    if (!mobile || mobile.length !== 10) {
      console.log("Invalid mobile:", mobile);
      return NextResponse.json(
        { error: "Invalid mobile" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(mobile, otp);

    console.log(`OTP for ${mobile}: ${otp}`);

    return NextResponse.json({ success: true, otp }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
