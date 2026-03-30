import axios from "axios";

type OtpMode = "development" | "production";

type OtpRecord = {
  code: string;
  expiresAt: number;
};

export type OtpServiceResult = {
  success: boolean;
  message: string;
  status: number;
  data?: unknown;
};

const OTP_EXPIRY_MS = 5 * 60 * 1000;
const DEV_OTP_STORE = new Map<string, OtpRecord>();
const VERIFY_ATTEMPTS = new Map<string, number>();

function getOtpMode(): OtpMode {
  return process.env.NEXT_PUBLIC_ENV === "production" ? "production" : "development";
}

function isMsg91Success(data: unknown) {
  if (!data || typeof data !== "object") return false;
  const record = data as Record<string, unknown>;
  return record.type === "success";
}

function cleanupExpiredOtps() {
  const now = Date.now();

  for (const [phone, record] of DEV_OTP_STORE.entries()) {
    if (record.expiresAt <= now) {
      DEV_OTP_STORE.delete(phone);
    }
  }
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getInternationalMobile(phone: string) {
  return `91${phone}`;
}

export async function sendOtp(phone: string): Promise<OtpServiceResult> {
  cleanupExpiredOtps();

  if (getOtpMode() === "development") {
    const code = generateOtp();
    DEV_OTP_STORE.set(phone, {
      code,
      expiresAt: Date.now() + OTP_EXPIRY_MS,
    });

    console.log(`DEV OTP for ${phone}: ${code}`);

    return {
      success: true,
      message: "OTP sent successfully",
      status: 200,
    };
  }

  if (!process.env.MSG91_AUTH_KEY || !process.env.MSG91_TEMPLATE_ID || !process.env.MSG91_SENDER_ID) {
    return {
      success: false,
      message: "MSG91 is not configured",
      status: 500,
    };
  }

  try {
    const response = await axios.post(
      "https://control.msg91.com/api/v5/otp",
      {
        mobile: getInternationalMobile(phone),
        template_id: process.env.MSG91_TEMPLATE_ID,
        sender: process.env.MSG91_SENDER_ID,
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
        },
      }
    );

    console.log(`MSG91 send OTP status for ${phone}: ${response.status}`);

    if (!isMsg91Success(response.data)) {
      return {
        success: false,
        message: "MSG91 did not accept the OTP request",
        status: 400,
        data: response.data,
      };
    }

    return {
      success: true,
      message: "OTP sent successfully",
      status: 200,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(`MSG91 send OTP status for ${phone}: ${error.response?.status ?? 500}`);

      return {
        success: false,
        message:
          typeof error.response?.data?.message === "string"
            ? error.response.data.message
            : "Unable to send OTP",
        status: error.response?.status ?? 500,
        data: error.response?.data,
      };
    }

    return {
      success: false,
      message: "Unable to send OTP",
      status: 500,
    };
  }
}

export async function verifyOtp(phone: string, otp: string): Promise<OtpServiceResult> {
  cleanupExpiredOtps();

  if (getOtpMode() === "development") {
    const record = DEV_OTP_STORE.get(phone);

    if (!record) {
      return {
        success: false,
        message: "OTP expired or not found. Please resend OTP.",
        status: 400,
      };
    }

    if (record.expiresAt <= Date.now()) {
      DEV_OTP_STORE.delete(phone);
      return {
        success: false,
        message: "OTP expired. Please resend OTP.",
        status: 400,
      };
    }

    if (record.code !== otp) {
      return {
        success: false,
        message: "Invalid OTP",
        status: 400,
      };
    }

    DEV_OTP_STORE.delete(phone);

    return {
      success: true,
      message: "OTP verified successfully",
      status: 200,
    };
  }

  if (!process.env.MSG91_AUTH_KEY) {
    return {
      success: false,
      message: "MSG91 is not configured",
      status: 500,
    };
  }

  try {
    const response = await axios.get(
      `https://control.msg91.com/api/v5/otp/verify?mobile=${getInternationalMobile(phone)}&otp=${otp}`,
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
        },
      }
    );

    console.log(`MSG91 verify OTP status for ${phone}: ${response.status}`);

    if (!isMsg91Success(response.data)) {
      return {
        success: false,
        message: "OTP verification failed",
        status: 400,
        data: response.data,
      };
    }

    return {
      success: true,
      message: "OTP verified successfully",
      status: 200,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(`MSG91 verify OTP status for ${phone}: ${error.response?.status ?? 500}`);

      return {
        success: false,
        message:
          typeof error.response?.data?.message === "string"
            ? error.response.data.message
            : "OTP verification failed",
        status: error.response?.status ?? 400,
        data: error.response?.data,
      };
    }

    return {
      success: false,
      message: "OTP verification failed",
      status: 500,
    };
  }
}

export function getVerificationAttempts(key: string) {
  return VERIFY_ATTEMPTS.get(key) ?? 0;
}

export function incrementVerificationAttempts(key: string) {
  const nextAttempts = getVerificationAttempts(key) + 1;
  VERIFY_ATTEMPTS.set(key, nextAttempts);
  return nextAttempts;
}

export function resetVerificationAttempts(key: string) {
  VERIFY_ATTEMPTS.delete(key);
}
