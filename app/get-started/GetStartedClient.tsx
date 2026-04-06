"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import StepIndicator from "@/components/StepIndicator";
import PersonalDetailsForm from "@/components/PersonalDetailsForm";
import ServiceSelection from "@/components/ServiceSelection";
import InquiryChat from "@/components/InquiryChat";
import { SOURCE_OPTIONS } from "@/constants/sourceOptions";
import {
  clearFirebaseOtpSession,
  getFirebaseOtpErrorMessage,
  hasFirebaseConfirmationResult,
  logFirebaseOtpError,
  RECAPTCHA_CONTAINER_ID,
  sendFirebaseOtp,
  verifyFirebaseOtp,
} from "@/lib/firebase-phone-auth";
import { getPhoneDigits } from "@/lib/phone";
import { supabase } from "@/lib/supabase";
import { getUser, setUser } from "@/src/lib/client-auth";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  preferredLanguage: string;
  source: string;
  phone: string;
  requirements: string;
};

type ChatMessage = {
  id: number;
  text: string;
  sender: "user" | "staff";
};

type StoredUser = {
  mobile?: string;
  name?: string;
  full_name?: string;
  email?: string;
  city?: string;
  language?: string;
  source?: string;
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

export default function GetStartedClient() {
  const MAX_OTP_ATTEMPTS = 5;
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromDashboard = searchParams.get("from") === "dashboard";
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
  const [showPolicyError, setShowPolicyError] = useState(false);
  const [orderSummaryError, setOrderSummaryError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
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
    source: "",
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

  const payableAmount = useMemo(() => {
    if (selectedService === "Healthy Life (online consultation)") {
      return selectedHealthyLifeExpert?.price ?? 0;
    }

    if (selectedService === "Expert Second Opinion (Online or In-Person)") {
      return 1500;
    }

    if (selectedService === "Chronic Care") {
      return 2500;
    }

    return 0;
  }, [selectedHealthyLifeExpert, selectedService]);

  const allRequiredPoliciesAccepted =
    orderContactConsent && termsAccepted && (!refundPolicy || refundAccepted);

  const handleFormChange = (field: keyof FormData, value: string) => {
    if (field === "phone") {
      const sanitizedPhone = value.replace(/\D/g, "").slice(0, 10);

      clearFirebaseOtpSession();
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

  const handleSendOtp = async () => {
    if (!formData.phone || otpCooldown > 0 || sendingOtp) return;

    const phone = getPhoneDigits(formData.phone);
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
      await sendFirebaseOtp(phone, RECAPTCHA_CONTAINER_ID);
      setOtpSent(true);
      setOtpVerified(false);
      setOtp("");
      setOtpAttempts(0);
      setOtpStatusMessage("OTP sent successfully");
      setOtpCooldown(30);
      setOtpError("");
    } catch (error) {
      logFirebaseOtpError(error);
      setOtpError(getFirebaseOtpErrorMessage(error));
      setOtpVerified(false);
      setOtpSent(false);
      setOtpStatusMessage("");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.phone || otp.length !== 6 || otpAttempts >= MAX_OTP_ATTEMPTS) return;

    const phone = getPhoneDigits(formData.phone);
    if (phone.length !== 10) {
      setPhoneError("Enter a valid 10-digit mobile number");
      setOtpError("Enter a valid 10-digit phone number");
      return;
    }

    setPhoneError("");
    setVerifyingOtp(true);
    setOtpError("");

    try {
      console.log("ENV:", process.env.NODE_ENV);
      console.log("ConfirmationResult exists:", !!window.confirmationResult);

      if (!hasFirebaseConfirmationResult()) {
        console.warn("ConfirmationResult missing on get-started verify, checking stored verification session.");
      }

      await verifyFirebaseOtp(otp);
      setOtpVerified(true);
      setOtpStatusMessage("OTP verified successfully");
      setOtpError("");
    } catch (error) {
      logFirebaseOtpError(error);
      const nextAttempts = otpAttempts + 1;
      setOtpAttempts(nextAttempts);
      setOtpVerified(false);
      setOtpError(
        nextAttempts >= MAX_OTP_ATTEMPTS
          ? "Maximum OTP verification attempts reached. Please resend OTP."
          : getFirebaseOtpErrorMessage(error)
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

  const handleNextFromPersonal = async () => {
    if (!formData.firstName || !formData.lastName || !formData.city || !formData.phone) return;
    if (formData.phone.length !== 10) {
      setPhoneError("Enter a valid 10-digit mobile number");
      return;
    }
    if (!formData.source) return;
    if (!otpVerified) return;

    try {
      const formattedPhone = getPhoneDigits(formData.phone);
      console.log("Formatted phone:", formattedPhone);
      await supabase.from("users").upsert(
        [
        {
            mobile: formattedPhone,
            full_name: `${formData.firstName} ${formData.lastName}`.trim() || null,
            email: formData.email.trim() || null,
            city: formData.city.trim() || null,
            language: formData.preferredLanguage.trim() || null,
            source: SOURCE_OPTIONS.includes(formData.source) ? formData.source : null,
          },
        ],
        { onConflict: "mobile" }
      );

      const existingUser = getUser() as StoredUser | null;
      if (existingUser && getPhoneDigits(existingUser.mobile ?? "") === formattedPhone) {
        setUser({
          ...existingUser,
          name: existingUser.name ?? `${formData.firstName} ${formData.lastName}`.trim(),
          full_name: existingUser.full_name ?? `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email.trim() || existingUser.email,
          city: formData.city.trim(),
          language: formData.preferredLanguage.trim(),
          source: formData.source,
          mobile: formattedPhone,
        });
      }
    } catch (error) {
      console.error("Unable to save personal details:", error);
    }

    setCurrentStep(2);
  };

  const handleNextFromServices = () => {
    if (!selectedService) {
      setServiceActionError("Please select a service to continue");
      return;
    }

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
    setShowPolicyError(false);
    setOrderSummaryError("");
    setCurrentStep(3);
  };

  const handlePayment = async () => {
    if (!allRequiredPoliciesAccepted) {
      setShowPolicyError(true);
      return;
    }

    setShowPolicyError(false);
    setOrderSummaryError("");

    if (!payableAmount) {
      window.location.href = "/payment-success";
      return;
    }

    setPaymentLoading(true);

    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: payableAmount }),
      });

      const order = (await res.json()) as {
        id?: string;
        amount?: number;
        currency?: string;
        isDemo?: boolean;
      };

      if (!order || !order.id) {
        alert("Payment initialization failed");
        return;
      }

      if (order.isDemo) {
        console.log("Demo payment flow");
        router.push("/fake-payment");
        return;
      }

      if (!window.Razorpay) {
        alert("Payment system not loaded");
        return;
      }

      if (!order.amount || !order.currency || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        alert("Payment initialization failed");
        return;
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "JustForHearts",
        description: "Healthcare Plan",
        handler: async (response: Record<string, string>) => {
          const verifyRes = await fetch("/api/payment/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const data = (await verifyRes.json()) as { success?: boolean };

          if (data.success) {
            window.location.href = "/payment-success";
            return;
          }

          alert("Payment verification failed");
        },
        theme: {
          color: "#e11d48",
        },
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleFinalizeOrder = async () => {
    setOrderSummaryError("");
    setServiceSuccessMessage("");

    if (!allRequiredPoliciesAccepted) {
      setShowPolicyError(true);
      return;
    }

    if (selectedService === "Personalized Plans - Inquiry") {
      setServiceSuccessMessage("Thank you for reaching out. Our team will contact you shortly.");
      return;
    }

    await handlePayment();
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  useEffect(() => {
    let isMounted = true;

    const hydrateDashboardFlow = async () => {
      if (!fromDashboard) return;

      setCurrentStep(2);

      const storedUser = getUser() as StoredUser | null;
      if (!storedUser?.mobile) return;

      let mergedUser: StoredUser = storedUser;

      const { data, error } = await supabase
        .from("users")
        .select("mobile, full_name, email, city, language, source")
        .eq("mobile", getPhoneDigits(storedUser.mobile ?? ""))
        .maybeSingle();

      if (!isMounted) return;

      if (!error && data) {
        mergedUser = {
          ...storedUser,
          mobile: data.mobile ?? storedUser.mobile,
          full_name: data.full_name ?? storedUser.full_name ?? storedUser.name,
          email: data.email ?? storedUser.email,
          city: data.city ?? storedUser.city,
          language: data.language ?? storedUser.language,
          source:
            data.source && SOURCE_OPTIONS.includes(data.source)
              ? data.source
              : storedUser.source,
        };
      }

      const normalizedPhone = getPhoneDigits(mergedUser.mobile ?? "");
      const fullName = (mergedUser.full_name ?? mergedUser.name ?? "").trim();
      const [firstName = "", ...lastNameParts] = fullName.split(/\s+/).filter(Boolean);

      if (normalizedPhone.length !== 10) {
        setFormData((prev) => ({
          ...prev,
          firstName,
          lastName: lastNameParts.join(" "),
          email: mergedUser.email ?? "",
          city: mergedUser.city ?? "",
          preferredLanguage: mergedUser.language ?? "",
          source:
            mergedUser.source && SOURCE_OPTIONS.includes(mergedUser.source)
              ? mergedUser.source
              : "",
          phone: normalizedPhone,
        }));
        setPhoneError("Enter a valid 10-digit mobile number");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName: lastNameParts.join(" "),
        email: mergedUser.email ?? "",
        city: mergedUser.city ?? "",
        preferredLanguage: mergedUser.language ?? "",
        source:
          mergedUser.source && SOURCE_OPTIONS.includes(mergedUser.source)
            ? mergedUser.source
            : "",
        phone: normalizedPhone,
      }));
      setPhoneError("");
    };

    void hydrateDashboardFlow();

    return () => {
      isMounted = false;
    };
  }, [fromDashboard]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
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

          <div className="step-container mx-auto mt-8 max-w-xl md:mt-10 md:max-w-4xl">
            <AnimatePresence mode="wait" initial={false}>
              {!fromDashboard && currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative overflow-visible rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:p-8"
                >
                  <PersonalDetailsForm
                    formData={{
                      firstName: formData.firstName,
                      lastName: formData.lastName,
                      email: formData.email,
                      city: formData.city,
                      preferredLanguage: formData.preferredLanguage,
                      source: formData.source,
                      phone: formData.phone,
                    }}
                    onChange={handleFormChange}
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
                  <div id={RECAPTCHA_CONTAINER_ID} className="mt-3 min-h-[1px]" />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:p-8"
                >
                  <div id="services-section">
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
                      hideBackButton={fromDashboard}
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:p-8"
                >
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
                    onChange={(e) => {
                      setOrderContactConsent(e.target.checked);
                      setShowPolicyError(false);
                    }}
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
                      onChange={(e) => {
                        setTermsAccepted(e.target.checked);
                        setShowPolicyError(false);
                      }}
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
                        onChange={(e) => {
                          setRefundAccepted(e.target.checked);
                          setShowPolicyError(false);
                        }}
                        className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-100"
                      />
                      <span>{refundPolicy.consent}</span>
                    </label>
                  </div>
                )}

                {showPolicyError && (
                  <p className="text-xs text-red-600">Please accept all policies to continue</p>
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
                    disabled={paymentLoading}
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

