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

const healthyLifeExperts = [
  { name: "Dr. Divya Sanglikar", price: 750 },
  { name: "Dr. Tejas Limaye", price: 900 },
  { name: "Dr. Neha Katekar", price: 750 },
  { name: "Dr. Tejashree Bhate", price: 750 },
  { name: "Dr. Kirti Kakade", price: 750 },
  { name: "Dr. Snehal Vankudre", price: 750 },
] as const;

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
  const [otpUiVisible, setOtpUiVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpStatusMessage, setOtpStatusMessage] = useState("");
  const [otpError, setOtpError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [generalInquiryOptions, setGeneralInquiryOptions] = useState<string[]>([]);
  const [chronicCareOptions, setChronicCareOptions] = useState<string[]>([]);
  const [healthyLifeSelection, setHealthyLifeSelection] = useState("");
  const [healthyLifeExpertSelection, setHealthyLifeExpertSelection] = useState("");
  const [personalizedPlanSelection, setPersonalizedPlanSelection] = useState("");
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [serviceConsentError, setServiceConsentError] = useState("");
  const [serviceActionError, setServiceActionError] = useState("");
  const [serviceSuccessMessage, setServiceSuccessMessage] = useState("");
  const [orderContactConsent, setOrderContactConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [refundAccepted, setRefundAccepted] = useState(false);
  const [orderSummaryError, setOrderSummaryError] = useState("");
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
  const patientName = [formData.firstName, formData.lastName].filter(Boolean).join(" ").trim();

  const servicePrice = useMemo(() => getServicePrice(selectedService), [selectedService]);
  const selectedHealthyLifeExpert = healthyLifeExperts.find(
    (expert) => expert.name === healthyLifeExpertSelection
  );

  const orderSummary = useMemo(() => {
    if (selectedService === "Healthy Life (online consultation)") {
      const visitLabel =
        healthyLifeSelection.startsWith("New Patient")
          ? "First Visit"
          : healthyLifeSelection.startsWith("Returning Patient")
            ? "Follow-up"
            : "";

      const serviceLabel = selectedHealthyLifeExpert
        ? `${selectedHealthyLifeExpert.name}${visitLabel ? ` (${visitLabel})` : ""}`
        : visitLabel
          ? `Healthy Life (${visitLabel})`
          : "Healthy Life";

      const total = selectedHealthyLifeExpert ? `₹${selectedHealthyLifeExpert.price}` : "₹0";

      return {
        service: serviceLabel,
        total,
        finalButtonLabel: "Pay & Book Now",
      };
    }

    if (selectedService === "Expert Second Opinion (Online or In-Person)") {
      return {
        service: "Expert Second Opinion",
        total: "₹1500",
        finalButtonLabel: "Pay & Book Now",
      };
    }

    if (selectedService === "Chronic Care") {
      return {
        service: "Chronic Care",
        total: "₹2500",
        finalButtonLabel: "Pay & Book Now",
      };
    }

    if (selectedService === "Personalized Plans - Inquiry") {
      return {
        service: personalizedPlanSelection || "Personalized Plans - Inquiry",
        total: "Inquiry Only",
        finalButtonLabel: "Submit Inquiry",
      };
    }

    return {
      service: selectedService || "Not selected",
      total: servicePrice,
      finalButtonLabel: "Proceed",
    };
  }, [
    healthyLifeSelection,
    personalizedPlanSelection,
    selectedHealthyLifeExpert,
    selectedService,
    servicePrice,
  ]);

  const refundPolicy = useMemo(() => {
    if (
      selectedService === "Healthy Life (online consultation)" ||
      selectedService === "Expert Second Opinion (Online or In-Person)"
    ) {
      return {
        english: [
          "Full refund for cancellations made 4+ hours before the slot",
          "No refund for late cancellations or no-shows",
        ],
        marathi:
          "अपॉइंटमेंटच्या 4 तास आधी रद्द केल्यास पूर्ण परतावा मिळेल;\nनंतर किंवा न आल्यास परतावा मिळणार नाही.",
        consent: "मी परतावा धोरण वाचले आहे आणि मला ते मान्य आहे.",
      };
    }

    if (selectedService === "Chronic Care") {
      return {
        english: [
          "No Refund (Commitment-based)",
          "12-month commitment; cannot refund after enrollment",
          "Can pause or transfer",
        ],
        marathi:
          "हा आरोग्यासाठी 12 महिन्यांचा वचनबद्ध कार्यक्रम आहे;\nएकदा नोंदणी केल्यानंतर परतावा मिळणार नाही, परंतु प्लॅन थांबवता किंवा बदलता येईल.",
        consent: "मी परतावा धोरण वाचले आहे आणि मला ते मान्य आहे.",
      };
    }

    if (selectedService === "Personalized Plans - Inquiry") {
      return {
        english: [
          "Maximum 50% refund after initial onboarding",
          "No refund after 3-month aggressive phase begins",
        ],
        marathi:
          "सुरुवातीच्या सविस्तर तपासणीनंतर 50% पर्यंत परतावा मिळेल;\n3 महिन्यांचा मुख्य रिव्हर्सल प्रोग्राम सुरू झाल्यावर परतावा मिळणार नाही.",
        consent: "मी परतावा धोरण वाचले आहे आणि मला ते मान्य आहे.",
      };
    }

    return null;
  }, [selectedService]);

  const handleFormChange = (field: keyof FormData, value: string) => {
    if (field === "phone") {
      const sanitizedPhone = value.replace(/\D/g, "").slice(0, 10);

      setOtpUiVisible(false);
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
      setOtpStatusMessage("");
      setOtpError("");
      setPhoneError(
        sanitizedPhone.length === 0 || sanitizedPhone.length === 10
          ? ""
          : "Enter a valid 10-digit mobile number"
      );
      setOtpCooldown(0);
      setOtpAttempts(0);
      setFormData((prev) => ({ ...prev, phone: sanitizedPhone }));
      return;
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
      setPhoneError("Enter a valid 10-digit mobile number");
      setOtpError("Enter a valid 10-digit phone number");
      setOtpStatusMessage("");
      return;
    }

    setPhoneError("");
    setOtpUiVisible(true);
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
      setPhoneError("Enter a valid 10-digit mobile number");
      setOtpError("Enter a valid 10-digit phone number");
      return;
    }

    setPhoneError("");
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
    if (formData.phone.length !== 10) {
      setPhoneError("Enter a valid 10-digit mobile number");
      return;
    }
    if (!otpVerified) return;
    setCurrentStep(2);
  };

  const handleNextFromServices = () => {
    if (!selectedService) return;
    setServiceActionError("");
    setServiceSuccessMessage("");

    if (selectedService === "General Inquiry (FREE)") {
      if (generalInquiryOptions.length === 0) {
        setServiceActionError("Please select at least one option to continue");
        return;
      }
      if (!isConsentGiven) {
        setServiceConsentError("Please provide consent to continue");
        return;
      }

      setServiceConsentError("");
      setServiceSuccessMessage("Thank you for reaching out. Our team will contact you shortly.");
      return;
    }

    if (selectedService === "Healthy Life (online consultation)") {
      if (!healthyLifeSelection) {
        setServiceActionError("Please select a visit type to continue");
        return;
      }
      if (healthyLifeSelection.startsWith("New Patient") && !healthyLifeExpertSelection) {
        setServiceActionError("Please select an expert to continue");
        return;
      }
    }

    if (selectedService === "Chronic Care" && chronicCareOptions.length === 0) {
      setServiceActionError("Please select at least one area of concern");
      return;
    }

    if (
      selectedService === "Personalized Plans - Inquiry" &&
      !personalizedPlanSelection
    ) {
      setServiceActionError("Please select a program to continue");
      return;
    }

    if (
      (selectedService === "General Inquiry (FREE)" ||
        selectedService === "Personalized Plans - Inquiry") &&
      !isConsentGiven
    ) {
      setServiceConsentError("Please provide consent to continue");
      return;
    }

    setServiceConsentError("");
    setOrderContactConsent(false);
    setTermsAccepted(false);
    setRefundAccepted(false);
    setOrderSummaryError("");
    setCurrentStep(3);
  };

  const handleFinalizeOrder = () => {
    setOrderSummaryError("");
    setServiceSuccessMessage("");

    if (!orderContactConsent) {
      setOrderSummaryError("Please provide consent to continue");
      return;
    }

    if (!termsAccepted) {
      setOrderSummaryError("Please accept the terms to continue");
      return;
    }

    if (refundPolicy && !refundAccepted) {
      setOrderSummaryError("Please accept the refund policy to continue");
      return;
    }

    if (selectedService === "Personalized Plans - Inquiry") {
      setServiceSuccessMessage("Thank you for reaching out. Our team will contact you shortly.");
      return;
    }

    setServiceSuccessMessage("Order summary is ready for Razorpay integration.");
  };

  const handleSendMessage = () => {
    const text = messageInput.trim();
    if (!text) return;

    setChatMessages((prev) => [...prev, { id: Date.now(), text, sender: "user" }]);
    setMessageInput("");
  };

  useEffect(() => {
    if (otpCooldown <= 0) return;

    const timer = window.setTimeout(() => {
      setOtpCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [otpCooldown]);

  useEffect(() => {
    if (otpVerified) return;
    if (otpAttempts < MAX_OTP_ATTEMPTS) return;
    setOtpStatusMessage("");
  }, [otpAttempts, otpVerified]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center md:px-8 md:py-20 lg:px-16">
          <h1 className="text-3xl md:text-5xl font-semibold text-slate-800 leading-tight">
            Ready to <span className="text-teal-600">Take Charge</span> of your{" "}
            <span className="text-teal-600">Health</span>?
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base md:text-lg text-slate-600 text-center">
            Join 40,000+ people already using Just For Hearts for diabetes, heart, and obesity care
            — all from the comfort of home.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <StepIndicator currentStep={currentStep} />

          <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:mt-10 md:max-w-4xl md:p-8">
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
                phoneError={phoneError}
                otpCooldown={otpCooldown}
                otpStatusMessage={otpStatusMessage}
                otpError={otpError}
                otp={otp}
                onOtpChange={setOtp}
                onVerifyOtp={handleVerifyOtp}
                verifyingOtp={verifyingOtp}
                showOtpField={otpUiVisible || otpSent || otpVerified}
                otpSent={otpSent}
                otpVerified={otpVerified}
                onNext={handleNextFromPersonal}
              />
            )}

            {currentStep === 2 && (
              <ServiceSelection
                selectedService={selectedService}
                requirements={formData.requirements}
                onServiceChange={(value) => {
                  setSelectedService(value);
                  setHealthyLifeExpertSelection("");
                  setIsConsentGiven(false);
                  setServiceConsentError("");
                  setServiceActionError("");
                  setServiceSuccessMessage("");
                }}
                generalInquiryOptions={generalInquiryOptions}
                onGeneralInquiryOptionsChange={setGeneralInquiryOptions}
                chronicCareOptions={chronicCareOptions}
                onChronicCareOptionsChange={setChronicCareOptions}
                healthyLifeSelection={healthyLifeSelection}
                onHealthyLifeSelectionChange={(value) => {
                  setHealthyLifeSelection(value);
                  setHealthyLifeExpertSelection("");
                  setServiceActionError("");
                }}
                healthyLifeExpertSelection={healthyLifeExpertSelection}
                onHealthyLifeExpertSelectionChange={(value) => {
                  setHealthyLifeExpertSelection(value);
                  setServiceActionError("");
                }}
                healthyLifeExperts={healthyLifeExperts}
                personalizedPlanSelection={personalizedPlanSelection}
                onPersonalizedPlanSelectionChange={(value) => {
                  setPersonalizedPlanSelection(value);
                  setServiceActionError("");
                }}
                isConsentGiven={isConsentGiven}
                onConsentChange={(value) => {
                  setIsConsentGiven(value);
                  if (value) {
                    setServiceConsentError("");
                  }
                }}
                serviceConsentError={serviceConsentError}
                serviceActionError={serviceActionError}
                serviceSuccessMessage={serviceSuccessMessage}
                onRequirementsChange={(value) => handleFormChange("requirements", value)}
                onBack={() => setCurrentStep(1)}
                onNext={handleNextFromServices}
              />
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                {serviceSuccessMessage && (
                  <div className="rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-600">
                    {serviceSuccessMessage}
                  </div>
                )}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                  <h3 className="text-xl font-medium text-slate-800">Order Summary</h3>
                  <div className="mt-4 space-y-2 text-slate-700">
                    <p>
                      <span className="font-medium">Service:</span> {orderSummary.service}
                    </p>
                    <p>
                      <span className="font-medium">Patient:</span> {patientName || "Not provided"}
                    </p>
                    <p>
                      <span className="font-medium">Total Payable:</span> {orderSummary.total}
                    </p>
                  </div>
                </div>

                <label className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={orderContactConsent}
                    onChange={(e) => setOrderContactConsent(e.target.checked)}
                    className="rounded border-slate-300 text-teal-600 focus:ring-teal-100"
                  />
                  Consent to contact by Phone / Text / WhatsApp / Email
                </label>

                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <h4 className="text-base font-semibold text-slate-800">Terms and Conditions</h4>
                  <ul className="space-y-2 text-sm leading-6 text-slate-700">
                    <li>
                      Our services provide expert guidance for health management and are not for
                      medical emergencies. Success requires following clinical advice. We reserve
                      our team's time exclusively for committed patients to ensure the best outcomes.
                    </li>
                    <li>
                      आमच्या सेवा तज्ञ मार्गदर्शनासाठी आहेत, मेडिकल इमर्जन्सीसाठी नाहीत.
                      उपचारांच्या यशासाठी डॉक्टरांच्या सल्ल्याचे पालन आवश्यक आहे. सर्वोत्तम
                      परिणामांसाठी, आमची टीम आपला वेळ फक्त गंभीरपणे उपचार घेणाऱ्या रुग्णांसाठी
                      समर्पित करते.
                    </li>
                  </ul>
                  <label className="inline-flex items-start gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-100"
                    />
                    <span>
                      I agree to the terms and will follow the medical advice provided.
                      <br />
                      मी या अटींशी सहमत आहे आणि दिलेल्या वैद्यकीय सल्ल्याचे पालन करण्याचे मान्य
                      करतो/करते.
                    </span>
                  </label>
                </div>

                {refundPolicy && (
                  <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
                    <h4 className="text-base font-semibold text-slate-800">Refund Policy</h4>
                    <ul className="space-y-2 text-sm leading-6 text-slate-700">
                      {refundPolicy.english.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                    <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
                      {refundPolicy.marathi}
                    </p>
                    <label className="inline-flex items-start gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={refundAccepted}
                        onChange={(e) => setRefundAccepted(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-100"
                      />
                      <span>{refundPolicy.consent}</span>
                    </label>
                  </div>
                )}

                {orderSummaryError && (
                  <p className="text-sm font-medium text-red-600">{orderSummaryError}</p>
                )}

                <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="secondary-btn w-full px-6 py-3 sm:w-auto"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalizeOrder}
                    className="primary-btn w-full px-6 py-3 sm:w-auto"
                  >
                    {orderSummary.finalButtonLabel}
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

