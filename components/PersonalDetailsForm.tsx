"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import SourceDropdown from "@/components/SourceDropdown";

type PersonalDetails = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  preferredLanguage: string;
  source: string;
  phone: string;
};

type PersonalDetailsFormProps = {
  formData: PersonalDetails;
  onChange: (field: keyof PersonalDetails, value: string) => void;
  onSendOtp: () => void | Promise<void>;
  sendingOtp: boolean;
  phoneError: string;
  otpCooldown: number;
  otpStatusMessage: string;
  otpError: string;
  otp: string;
  onOtpChange: (value: string) => void;
  onVerifyOtp: () => void | Promise<void>;
  verifyingOtp: boolean;
  showOtpField: boolean;
  otpSent: boolean;
  otpVerified: boolean;
  onNext: () => void;
  disabledFields?: Partial<Record<keyof PersonalDetails, boolean>>;
  showNextButton?: boolean;
  nextButtonLabel?: string;
};

const inputClass =
  "field-base font-medium placeholder-slate-400 shadow-sm";

export default function PersonalDetailsForm({
  formData,
  onChange,
  onSendOtp,
  sendingOtp,
  phoneError,
  otpCooldown,
  otpStatusMessage,
  otpError,
  otp,
  onOtpChange,
  onVerifyOtp,
  verifyingOtp,
  showOtpField,
  otpSent,
  otpVerified,
  onNext,
  disabledFields = {},
  showNextButton = true,
  nextButtonLabel = "Next Step",
}: PersonalDetailsFormProps) {
  const otpSectionRef = useRef<HTMLDivElement | null>(null);
  const getInputClassName = (field: keyof PersonalDetails) =>
    `${inputClass} ${
      disabledFields[field] ? "cursor-not-allowed bg-slate-100 text-slate-500" : ""
    }`;

  useEffect(() => {
    if (!showOtpField) return;

    const frame = window.requestAnimationFrame(() => {
      otpSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [showOtpField]);

  return (
    <div className="space-y-6 overflow-visible">
      <div className="grid grid-cols-1 gap-4 overflow-visible md:grid-cols-2 md:gap-6">
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          disabled={disabledFields.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          className={getInputClassName("firstName")}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          disabled={disabledFields.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          className={getInputClassName("lastName")}
        />
        <input
          type="email"
          placeholder="Email Address (Optional)"
          value={formData.email}
          disabled={disabledFields.email}
          onChange={(e) => onChange("email", e.target.value)}
          className={getInputClassName("email")}
        />
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          disabled={disabledFields.city}
          onChange={(e) => onChange("city", e.target.value)}
          className={getInputClassName("city")}
        />
        <select
          value={formData.preferredLanguage}
          disabled={disabledFields.preferredLanguage}
          onChange={(e) => onChange("preferredLanguage", e.target.value)}
          className={getInputClassName("preferredLanguage")}
        >
          <option value="">Preferred Language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Marathi">Marathi</option>
        </select>
        <SourceDropdown
          value={formData.source}
          onChange={(value) => onChange("source", value)}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <input
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={formData.phone}
          disabled={disabledFields.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          onPaste={(e) => {
            e.preventDefault();
            const pastedValue = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 10);
            onChange("phone", pastedValue);
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={10}
          className={`${getInputClassName("phone")} flex-1 min-w-0 ${
            phoneError ? "border-red-500 focus:ring-red-200 focus:border-red-500" : ""
          }`}
        />
        <button
          type="button"
          onClick={onSendOtp}
          disabled={sendingOtp || otpCooldown > 0}
          className="primary-btn w-full shrink-0 px-6 py-3 disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
        >
          {sendingOtp
            ? "Sending..."
            : otpCooldown > 0
              ? `Resend OTP in ${otpCooldown}s`
              : otpSent
                ? "Resend OTP"
                : "Send OTP"}
        </button>
      </div>
      {phoneError && <p className="text-sm text-red-600">{phoneError}</p>}

      {showOtpField && (
        <div
          ref={otpSectionRef}
          className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => onOtpChange(e.target.value.replace(/\D/g, ""))}
              className={`${inputClass} w-full tracking-[0.35em] text-center text-lg font-semibold sm:flex-1 sm:tracking-[0.45em]`}
            />
            <button
              type="button"
              onClick={onVerifyOtp}
              disabled={!otpSent || verifyingOtp || otp.length !== 6 || otpVerified}
              className="primary-btn w-full shrink-0 px-6 py-3 disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto"
            >
              {otpVerified ? (
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified
                </span>
              ) : verifyingOtp ? (
                "Verifying..."
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
          {showOtpField && !otpSent && !otpVerified && !otpError && (
            <p className="text-sm text-slate-600">Sending OTP to your mobile number...</p>
          )}
          {otpStatusMessage && <p className="text-sm text-teal-600">{otpStatusMessage}</p>}
          {otpError && <p className="text-sm text-red-600">{otpError}</p>}
          {otpVerified && <p className="text-sm font-medium text-teal-600">OTP verified successfully.</p>}
        </div>
      )}

      {showNextButton && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onNext}
            disabled={!otpVerified}
            className="primary-btn w-full px-6 py-3 sm:w-auto"
          >
            {nextButtonLabel}
          </button>
        </div>
      )}
    </div>
  );
}
