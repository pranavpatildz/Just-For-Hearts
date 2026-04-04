import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { clearOtp, getOtp } from "@/lib/otpStore";

function isValidMobile(mobile: string) {
  return /^\d{10}$/.test(mobile);
}

function isValidOtp(otp: string) {
  return /^\d{6}$/.test(otp);
}

export async function POST(req: NextRequest) {
  try {
    const { mobile, otp, fullName, email } = (await req.json()) as {
      mobile?: string;
      otp?: string;
      fullName?: string;
      email?: string;
    };

    if (!mobile || !isValidMobile(mobile)) {
      return NextResponse.json(
        { error: "Valid mobile number is required" },
        { status: 400 }
      );
    }

    if (!otp || !isValidOtp(otp)) {
      return NextResponse.json({ error: "Valid OTP is required" }, { status: 400 });
    }

    const storedOtp = getOtp(mobile);

    if (!storedOtp || storedOtp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("users")
      .upsert(
        [
          {
            mobile: mobile,
            full_name: fullName?.trim() || null,
            email: email?.trim() || null,
          },
        ],
        { onConflict: "mobile" }
      )
      .select("mobile, full_name, email")
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    clearOtp(mobile);
    console.log("User saved:", mobile);

    return NextResponse.json(
      {
        success: true,
        user: {
          mobile: data?.mobile ?? mobile,
          name: data?.full_name ?? fullName?.trim() ?? "User",
          email: data?.email ?? email?.trim() ?? "",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify OTP failed:", error);
    return NextResponse.json(
      { error: "Unable to verify OTP" },
      { status: 500 }
    );
  }
}
