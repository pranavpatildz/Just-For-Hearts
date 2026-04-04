type OtpRecord = {
  code: string;
  expiresAt: number;
};

type GlobalOtpStore = Record<string, OtpRecord>;

const globalOtp = globalThis as typeof globalThis & {
  otpStore?: GlobalOtpStore;
};

function ensureOtpStore() {
  if (!globalOtp.otpStore) {
    globalOtp.otpStore = {};
  }

  return globalOtp.otpStore;
}

export function setOtp(mobile: string, code: string, ttlMs = 5 * 60 * 1000) {
  const store = ensureOtpStore();
  store[mobile] = {
    code,
    expiresAt: Date.now() + ttlMs,
  };
}

export function getOtp(mobile: string) {
  const store = ensureOtpStore();
  const record = store[mobile];

  if (!record) return null;

  if (record.expiresAt <= Date.now()) {
    delete store[mobile];
    return null;
  }

  return record.code;
}

export function clearOtp(mobile: string) {
  const store = ensureOtpStore();
  delete store[mobile];
}
