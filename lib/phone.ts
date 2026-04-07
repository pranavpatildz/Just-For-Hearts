"use client";

export function formatPhone(phone: string) {
  if (!phone) return "";

  let cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  }

  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }

  return phone;
}

export function normalizePhoneNumber(mobile: string) {
  return formatPhone(mobile);
}

export function normalizePhone(phone: string) {
  return formatPhone(phone);
}

export function getPhoneDigits(phone: string) {
  const formattedPhone = formatPhone(phone);
  const digits = formattedPhone.replace(/\D/g, "");

  if (digits.startsWith("91") && digits.length === 12) {
    return digits.slice(2);
  }

  if (digits.length === 10) {
    return digits;
  }

  return phone.replace(/\D/g, "").slice(-10);
}
