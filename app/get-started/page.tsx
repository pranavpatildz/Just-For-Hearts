"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import StepIndicator from "@/components/StepIndicator";
import PersonalDetailsForm from "@/components/PersonalDetailsForm";
import ServiceSelection from "@/components/ServiceSelection";
import InquiryChat from "@/components/InquiryChat";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  preferredLanguage: string;
  sourceReference: string;
  phone: string;
  requirements: string;
};

type ChatMessage = {
  id: number;
  text: string;
  sender: "user" | "staff";
};

function getServicePrice(service: string) {
  if (service === "General Inquiry (FREE)") return "FREE";
  if (service === "Personalized Plans - Inquiry") return "As per program";
  return "As per program";
}

export default function GetStartedPage() {
  const MAX_OTP_ATTEMPTS = 5;
  const [currentStep, setCurrentStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpStatusMessage, setOtpStatusMessage] = useState("");
  const [otpError, setOtpError] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [consent, setConsent] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hello! Share your health concern and our team will help you.", sender: "staff" },
  ]);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    preferredLanguage: "",
    sourceReference: "",
    phone: "",
    requirements: "",
  });

  const isFreeInquiry = selectedService === "General Inquiry (FREE)";

  const servicePrice = useMemo(() => getServicePrice(selectedService), [selectedService]);

  const handleFormChange = (field: keyof FormData, value: string) => {
    if (field === "phone") {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
      setOtpStatusMessage("");
      setOtpError("");
      setOtpCooldown(0);
      setOtpAttempts(0);
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const normalizePhone = (rawPhone: string) => {
    const digits = rawPhone.replace(/\D/g, "");
    if (digits.startsWith("91") && digits.length === 12) return digits.slice(2);
    if (digits.length === 10) return digits;
    return digits;
  };

  const handleSendOtp = async () => {
    if (!formData.phone || otpCooldown > 0) return;

    const phone = normalizePhone(formData.phone);
    if (phone.length !== 10) {
      setOtpError("Enter a valid 10-digit phone number");
      setOtpStatusMessage("");
      return;
    }

    setSendingOtp(true);
    setOtpError("");
    setOtpStatusMessage("");

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = (await response.json()) as { message?: string; type?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to send OTP");
      }

      setOtpSent(true);
      setOtpVerified(false);
      setOtp("");
      setOtpAttempts(0);
      setOtpStatusMessage(data.message ?? "OTP sent successfully");
      setOtpCooldown(30);
      setOtpError("");
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "Unable to send OTP");
      setOtpVerified(false);
      setOtpSent(false);
      setOtpStatusMessage("");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.phone || otp.length !== 6 || otpAttempts >= MAX_OTP_ATTEMPTS) return;

    const phone = normalizePhone(formData.phone);
    if (phone.length !== 10) {
      setOtpError("Enter a valid 10-digit phone number");
      return;
    }

    setVerifyingOtp(true);
    setOtpError("");

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, otp }),
      });

      const data = (await response.json()) as { message?: string; type?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Invalid OTP");
      }

      setOtpVerified(true);
      setOtpStatusMessage(data.message ?? "OTP verified successfully");
      setOtpError("");
    } catch (error) {
      const nextAttempts = otpAttempts + 1;
      setOtpAttempts(nextAttempts);
      setOtpVerified(false);
      setOtpError(
        nextAttempts >= MAX_OTP_ATTEMPTS
          ? "Maximum OTP verification attempts reached. Please resend OTP."
          : error instanceof Error
            ? error.message
            : "Invalid OTP"
      );
      setOtpStatusMessage("");

      if (nextAttempts >= MAX_OTP_ATTEMPTS) {
        setOtpSent(false);
        setOtp("");
        setOtpCooldown(30);
      }
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleNextFromPersonal = () => {
    if (!formData.firstName || !formData.lastName || !formData.city || !formData.phone) return;
    if (!otpVerified) return;
    setCurrentStep(2);
  };

  const handleNextFromServices = () => {
    if (!selectedService) return;
    setCurrentStep(3);
  };

  const handleSendMessage = () => {
    const text = messageInput.trim();
    if (!text) return;

    setChatMessages((prev) => [...prev, { id: Date.now(), text, sender: "user" }]);
    setMessageInput("");
  };

  useEffect(() => {
    if (otpCooldown <= 0) return;
    const timer = setInterval(() => {
      setOtpCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [otpCooldown]);

  useEffect(() => {
    if (otpVerified) return;
    if (otpAttempts < MAX_OTP_ATTEMPTS) return;
    setOtpStatusMessage("");
  }, [otpAttempts, otpVerified]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Ready to <span className="text-red-500">Take Charge</span> of your{" "}
            <span className="text-red-500">Health</span>?
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto text-center mt-6">
            Join 40,000+ people already using Just For Hearts for diabetes, heart, and obesity care
            — all from the comfort of home.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <StepIndicator currentStep={currentStep} />

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 mt-10 transition-all duration-300 hover:shadow-xl">
            {currentStep === 1 && (
              <PersonalDetailsForm
                formData={{
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  email: formData.email,
                  city: formData.city,
                  preferredLanguage: formData.preferredLanguage,
                  sourceReference: formData.sourceReference,
                  phone: formData.phone,
                }}
                onChange={(field, value) => handleFormChange(field, value)}
                onSendOtp={handleSendOtp}
                sendingOtp={sendingOtp}
                otpCooldown={otpCooldown}
                otpStatusMessage={otpStatusMessage}
                otpError={otpError}
                otp={otp}
                onOtpChange={setOtp}
                onVerifyOtp={handleVerifyOtp}
                verifyingOtp={verifyingOtp}
                otpSent={otpSent}
                otpVerified={otpVerified}
                onNext={handleNextFromPersonal}
              />
            )}

            {currentStep === 2 && (
              <ServiceSelection
                selectedService={selectedService}
                requirements={formData.requirements}
                onServiceChange={setSelectedService}
                onRequirementsChange={(value) => handleFormChange("requirements", value)}
                onBack={() => setCurrentStep(1)}
                onNext={handleNextFromServices}
              />
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800">Payment Summary</h3>
                  <div className="mt-4 space-y-2 text-gray-700">
                    <p>
                      <span className="font-medium">Selected service:</span>{" "}
                      {selectedService || "Not selected"}
                    </p>
                    <p>
                      <span className="font-medium">Price:</span> {servicePrice}
                    </p>
                  </div>
                </div>

                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="rounded border-gray-300 text-red-500 focus:ring-red-400"
                  />
                  I consent to proceed and be contacted for this service.
                </label>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="border border-red-500 text-red-500 rounded-lg px-6 py-3 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!consent || !selectedService}
                    className="bg-red-500 text-white rounded-lg px-6 py-3 hover:bg-red-600 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    Proceed to Payment
                  </button>
                </div>

                {isFreeInquiry && (
                  <InquiryChat
                    messages={chatMessages}
                    messageInput={messageInput}
                    onMessageInputChange={setMessageInput}
                    onSendMessage={handleSendMessage}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

