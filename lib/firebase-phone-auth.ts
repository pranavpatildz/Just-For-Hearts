"use client";

import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import { formatPhone } from "@/lib/phone";

const OTP_VERIFICATION_ID_KEY = "firebase_otp_verification_id";

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export const RECAPTCHA_CONTAINER_ID = "recaptcha-container";

export function getFirebaseOtpErrorMessage(error: unknown) {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code?: string }).code)
      : "";
  const fallback = error instanceof Error ? error.message : "Unable to complete OTP request";

  switch (code) {
    case "auth/invalid-app-credential":
    case "auth/app-not-authorized":
      return "Firebase Phone Auth is not configured for this domain yet. Please check Firebase authorized domains and reCAPTCHA setup.";
    case "auth/configuration-not-found":
      return "Firebase Phone Authentication is not enabled for this project. Please enable Phone sign-in in Firebase Console.";
    case "auth/invalid-phone-number":
      return "Please enter a valid mobile number in +91XXXXXXXXXX format.";
    case "auth/missing-phone-number":
      return "Phone number is required.";
    case "auth/too-many-requests":
      return "Too many OTP requests. Please wait and try again.";
    case "auth/code-expired":
      return "OTP expired. Please request a new OTP.";
    case "auth/invalid-verification-code":
      return "Invalid OTP. Please enter the 6-digit code again.";
    case "auth/missing-verification-code":
      return "Please enter the OTP code.";
    default:
      return fallback;
  }
}

export function logFirebaseOtpError(error: unknown) {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code?: string }).code)
      : "unknown";
  const message =
    typeof error === "object" && error !== null && "message" in error
      ? String((error as { message?: string }).message)
      : error instanceof Error
        ? error.message
        : "Unknown OTP error";

  console.error("OTP ERROR:", code, message);
}

export function clearFirebaseOtpSession() {
  if (!isBrowser()) return;

  window.confirmationResult = undefined;
  window.sessionStorage.removeItem(OTP_VERIFICATION_ID_KEY);
}

export function hasFirebaseConfirmationResult() {
  return isBrowser() && !!window.confirmationResult;
}

export function getStoredVerificationId() {
  if (!isBrowser()) return null;
  return window.sessionStorage.getItem(OTP_VERIFICATION_ID_KEY);
}

export async function ensureRecaptchaVerifier(containerId: string) {
  if (!isBrowser()) {
    throw new Error("Phone authentication is only available in the browser.");
  }

  const firebaseAuth = auth;

  if (!firebaseAuth) {
    throw new Error(
      "Firebase Auth is not initialized on the client. Please restart the app and verify your NEXT_PUBLIC_FIREBASE_* env values."
    );
  }

  console.log("Firebase OTP Hostname:", window.location.hostname);
  console.log("Firebase OTP Auth Domain:", firebaseAuth.config.authDomain);

  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`reCAPTCHA container "${containerId}" is missing from the page.`);
  }

  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
    window.recaptchaVerifier = undefined;
  }

  window.recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, containerId, {
    size: "invisible",
  });

  await window.recaptchaVerifier.render();

  return window.recaptchaVerifier;
}

export async function sendFirebaseOtp(phone: string, containerId: string) {
  const firebaseAuth = auth;

  if (!firebaseAuth) {
    throw new Error(
      "Firebase Auth is not initialized on the client. Please restart the app and verify your NEXT_PUBLIC_FIREBASE_* env values."
    );
  }

  const formattedPhone = formatPhone(phone);
  console.log("Formatted phone:", formattedPhone);
  const verifier = await ensureRecaptchaVerifier(containerId);

  console.log("ENV:", process.env.NODE_ENV);
  clearFirebaseOtpSession();
  const confirmationResult = await signInWithPhoneNumber(firebaseAuth, formattedPhone, verifier);
  (window as typeof window & { confirmationResult: typeof confirmationResult }).confirmationResult =
    confirmationResult;
  window.sessionStorage.setItem(OTP_VERIFICATION_ID_KEY, confirmationResult.verificationId);
  console.log("ConfirmationResult exists:", !!window.confirmationResult);

  return confirmationResult;
}

export async function verifyFirebaseOtp(code: string) {
  const firebaseAuth = auth;

  if (!firebaseAuth) {
    throw new Error(
      "Firebase Auth is not initialized on the client. Please restart the app and verify your NEXT_PUBLIC_FIREBASE_* env values."
    );
  }

  console.log("ENV:", process.env.NODE_ENV);
  console.log("ConfirmationResult exists:", !!window.confirmationResult);

  const trimmedCode = code.trim();

  if ((window as typeof window & { confirmationResult?: { confirm: (otp: string) => Promise<unknown> } }).confirmationResult) {
    return (window as typeof window & {
      confirmationResult: { confirm: (otp: string) => Promise<unknown> };
    }).confirmationResult.confirm(trimmedCode);
  }

  const verificationId = getStoredVerificationId();
  if (!verificationId) {
    throw new Error("OTP session expired. Please resend OTP.");
  }

  const credential = PhoneAuthProvider.credential(verificationId, trimmedCode);
  return signInWithCredential(firebaseAuth, credential);
}
