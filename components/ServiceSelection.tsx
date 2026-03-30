"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const services = [
  "General Inquiry (FREE)",
  "Healthy Life (online consultation)",
  "Expert Second Opinion (Online or In-Person)",
  "Chronic Care",
  "Personalized Plans - Inquiry",
] as const;

const serviceDetails = {
  "General Inquiry (FREE)": {
    title: "General Inquiry",
    marathiText:
      "\u0938\u0939\u0915\u093e\u0930\u094d\u092f\u093e\u0902\u0938\u093e\u0920\u0940 \u0915\u093f\u0902\u0935\u093e \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0928\u093e\u0938\u093e\u0920\u0940 \u0938\u0902\u092a\u0930\u094d\u0915 \u0938\u093e\u0927\u093e, \u0924\u0941\u092e\u091a\u093e \u0906\u0930\u094b\u0917\u094d\u092f\u093e\u091a\u093e \u092a\u094d\u0930\u0935\u093e\u0938 \u0906\u091c\u091a \u0938\u0941\u0930\u0942 \u0915\u0930\u093e.",
    englishText:
      "Connect for collaborations or custom guidance, let's find your path to health together.",
    price: "FREE",
    sectionTitle: "Need to Know about - Tick -",
    options: [
      "Personalised Services",
      "YouTube Memberships",
      "Corporate Wellness Programs",
      "Work with JFH",
      "Collaborate with JFH",
      "Others (Please specify)",
    ],
    consent: "I agree to be contacted by staff.*",
  },
  "Healthy Life (online consultation)": {
    title: "Healthy Life - Video Consultation",
    marathiText:
      "\u0924\u091c\u094d\u091c\u094d\u091e 20-\u092e\u093f\u0928\u093f\u091f\u093e\u0902\u091a\u0940 \u0935\u094d\u0939\u093f\u0921\u093f\u0913 \u0938\u0932\u094d\u0932\u093e, \u092a\u0939\u093f\u0932\u094d\u092f\u093e Consultation \u0938\u093e\u0920\u0940 \u0915\u093f\u0902\u0935\u093e \u092b\u0949\u0932\u094b-\u0905\u092a\u0938\u093e\u0920\u0940.",
    englishText:
      "Expert 20-min video consultation for first-time clarity or routine follow-up care.",
    sectionTitle: "Select Visit Type / \u092d\u0947\u091f \u092a\u094d\u0930\u0915\u093e\u0930 \u0928\u093f\u0935\u0921\u093e",
    options: [
      "New Patient / \u0928\u0935\u0940\u0928 \u0930\u0941\u0917\u094d\u0923 (First visit)",
      "Returning Patient / \u091c\u0941\u0928\u093e \u0930\u0941\u0917\u094d\u0923 (Follow-up)",
    ],
  },
  "Expert Second Opinion (Online or In-Person)": {
    doctorName: "Dr. Ravindra L Kulkarni",
    designation: "SR. CONSULTANT",
    marathiText:
      "\u0924\u0941\u092e\u091a\u094d\u092f\u093e \u0909\u092a\u091a\u093e\u0930\u093e\u0902\u091a\u0940 \u0916\u093e\u0924\u094d\u0930\u0940 \u0915\u0930\u093e; \u0921\u0949. \u0930\u0935\u0940\u0902\u0926\u094d\u0930 \u090f\u0932. \u0915\u0941\u0932\u0915\u0930\u094d\u0923\u0940 \u092f\u093e\u0902\u091a\u094d\u092f\u093e\u0915\u0921\u0942\u0928 \u0938\u0916\u094b\u0932 Second Opinion \u092e\u093f\u0933\u0935\u093e.",
    englishText:
      "Get total certainty on your diagnosis and treatment plan from Dr. Ravindra L. Kulkarni.",
    price: "\u20b91500",
  },
  "Chronic Care": {
    title: "Chronic Care - 360\u00b0 Support",
    marathiText:
      "\u092e\u0927\u0941\u092e\u0947\u0939, \u0939\u0943\u0926\u092f\u0930\u094b\u0917 \u0906\u0923\u093f \u092e\u0947\u091f\u093e\u092c\u0949\u0932\u093f\u0915 \u0935\u094d\u092f\u093e\u0927\u0940\u0902\u0938\u093e\u0920\u0940 360\u00b0 \u0938\u092a\u094b\u0930\u094d\u091f. 12 \u0924\u091c\u094d\u091c\u094d\u091e \u0938\u0932\u094d\u0932\u093e\u092e\u0938\u0932\u0924 (\u0906\u0939\u093e\u0930, \u092f\u094b\u0917, \u0906\u092f\u0941\u0930\u094d\u0935\u0947\u0926, GP) \u0906\u0923\u093f AI \u091f\u094d\u0930\u0945\u0915\u093f\u0902\u0917.",
    englishText:
      "360\u00b0 support for Diabetes, Heart & Metabolic Health. Includes 12 consultations from our multidisciplinary team (Diet, Yoga, GP, Ayurveda) with AI-enabled tracking.",
    price: "\u20b92500",
    sectionTitle: "Area of Concern",
    options: ["Diabetes", "Lipids / Cholesterol", "Obesity", "Heart Health", "Metabolism"],
    footerNote:
      "\u0924\u0941\u092e\u091a\u0940 \u0906\u0930\u094b\u0917\u094d\u092f \u092e\u093e\u0939\u093f\u0924\u0940 \u092a\u0942\u0930\u094d\u0923\u092a\u0923\u0947 \u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924 \u0906\u0939\u0947 \u0906\u0923\u093f \u092b\u0915\u094d\u0924 \u0924\u0941\u092e\u091a\u094d\u092f\u093e \u0909\u092a\u091a\u093e\u0930\u093e\u0902\u0938\u093e\u0920\u0940 \u0935\u093e\u092a\u0930\u0932\u0940 \u091c\u093e\u0908\u0932.\nYour health data is 100% secure and used only for your personalized care plan.",
  },
  "Personalized Plans - Inquiry": {
    title: "Personalized Plans - Inquiry",
    marathiText:
      "3 \u092e\u0939\u093f\u0928\u094d\u092f\u093e\u0902\u091a\u094d\u092f\u093e \u0906\u0915\u094d\u0930\u092e\u0915 \u091f\u094d\u0930\u0940\u091f\u092e\u0947\u0902\u091f \u0906\u0923\u093f \u0935\u0930\u094d\u0937\u093e\u091a\u094d\u092f\u093e \u0905\u0916\u0947\u0930\u0940\u092a\u0930\u094d\u092f\u0902\u0924 \u0924\u091c\u094d\u091c\u094d\u091e\u093e\u0902\u091a\u094d\u092f\u093e Follow up \u0915\u0928\u094d\u0938\u0932\u094d\u091f\u0947\u0936\u0928.",
    englishText:
      "3 months of aggressive Personalized Consultations followed by expert Follow up consultations through / till the end of the year.",
    sectionTitle: "Select Program",
    options: [
      "Diabetes Reversal Program - \u20b97500 (Recent Onset / Pre Diabetes / Insulin Resistance)",
      "Diabetes Control Program - \u20b97500 (Advanced Diabetes / Type 1 / Type 1.5)",
      "Metabolic Health Reversal Program - \u20b97500",
      "Post Angioplasty / Bypass Cardiac Rehab Program - \u20b97500",
      "Heart Failure Cardiac Rehab - \u20b915000",
      "Obesity Care / Weight Loss Program - \u20b97500",
    ],
    footer: "Inquiry Only",
    consent: "I agree to be contacted by staff.*",
  },
} as const;

type ServiceSelectionProps = {
  selectedService: string;
  requirements: string;
  onServiceChange: (value: string) => void;
  generalInquiryOptions: string[];
  onGeneralInquiryOptionsChange: (value: string[]) => void;
  chronicCareOptions: string[];
  onChronicCareOptionsChange: (value: string[]) => void;
  healthyLifeSelection: string;
  onHealthyLifeSelectionChange: (value: string) => void;
  healthyLifeExpertSelection: string;
  onHealthyLifeExpertSelectionChange: (value: string) => void;
  healthyLifeExperts: ReadonlyArray<{ name: string; price: number }>;
  personalizedPlanSelection: string;
  onPersonalizedPlanSelectionChange: (value: string) => void;
  isConsentGiven: boolean;
  onConsentChange: (value: boolean) => void;
  serviceConsentError: string;
  serviceActionError: string;
  serviceSuccessMessage: string;
  onRequirementsChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
};

export default function ServiceSelection({
  selectedService,
  requirements,
  onServiceChange,
  generalInquiryOptions,
  onGeneralInquiryOptionsChange,
  chronicCareOptions,
  onChronicCareOptionsChange,
  healthyLifeSelection,
  onHealthyLifeSelectionChange,
  healthyLifeExpertSelection,
  onHealthyLifeExpertSelectionChange,
  healthyLifeExperts,
  personalizedPlanSelection,
  onPersonalizedPlanSelectionChange,
  isConsentGiven,
  onConsentChange,
  serviceConsentError,
  serviceActionError,
  serviceSuccessMessage,
  onRequirementsChange,
  onBack,
  onNext,
}: ServiceSelectionProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const selectedServiceDetails = selectedService
    ? serviceDetails[selectedService as keyof typeof serviceDetails]
    : null;

  const toggleMultiSelectOption = (currentValues: string[], option: string, onChange: (value: string[]) => void) => {
    if (currentValues.includes(option)) {
      onChange(currentValues.filter((value) => value !== option));
      return;
    }

    onChange([...currentValues, option]);
  };

  const isMultiSelectService =
    selectedService === "General Inquiry (FREE)" || selectedService === "Chronic Care";
  const isSingleSelectService =
    selectedService === "Healthy Life (online consultation)" ||
    selectedService === "Personalized Plans - Inquiry";
  const requiresConsent =
    selectedService === "General Inquiry (FREE)" ||
    selectedService === "Personalized Plans - Inquiry";

  const getSelectedOptions = () => {
    if (selectedService === "General Inquiry (FREE)") return generalInquiryOptions;
    if (selectedService === "Chronic Care") return chronicCareOptions;
    return [];
  };

  const getSelectedValue = () => {
    if (selectedService === "Healthy Life (online consultation)") return healthyLifeSelection;
    if (selectedService === "Personalized Plans - Inquiry") return personalizedPlanSelection;
    return "";
  };

  const primaryButtonLabel =
    selectedService === "General Inquiry (FREE)"
      ? "Connect to Agent"
      : "Next Step";

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="service-dropdown-button" className="text-sm font-semibold text-gray-700">
          Select Service
        </label>
        <div ref={dropdownRef} className="relative mb-3 w-full overflow-visible">
          <button
            id="service-dropdown-button"
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="flex min-h-12 w-full items-center justify-between rounded-xl border border-[#ff4d4f] bg-white px-4 py-3 text-left text-[15px] font-medium text-gray-900 shadow-[0_10px_30px_rgba(15,23,42,0.06)] outline-none transition-all duration-300 hover:border-red-400 focus:border-[#ff4d4f] focus:shadow-[0_0_0_4px_rgba(255,77,79,0.16)] sm:px-5 sm:py-4"
          >
            <span className={selectedService ? "text-gray-900" : "text-gray-500"}>
              {selectedService || "Select a service..."}
            </span>
            <ChevronDown
              className={`ml-3 h-5 w-5 shrink-0 text-[#ff4d4f] transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          <div
            className={`absolute left-0 right-0 top-full z-30 mt-2 origin-top overflow-hidden rounded-xl border border-red-100 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.14)] transition-all duration-200 ${
              open
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            }`}
          >
            <ul role="listbox" aria-label="Service options" className="max-h-72 overflow-y-auto py-2">
              {services.map((service) => (
                <li key={service} role="option" aria-selected={selectedService === service}>
                  <button
                    type="button"
                    onClick={() => {
                      onServiceChange(service);
                      setOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-[15px] transition-colors duration-200 sm:px-5 ${
                      selectedService === service
                        ? "bg-red-50 text-red-600"
                        : "text-gray-800 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {selectedServiceDetails && (
        <div className="space-y-4 rounded-2xl border border-[#ffd6d6] bg-[#fff5f5] p-5 shadow-[0_16px_36px_rgba(255,77,79,0.08)] sm:p-6">
          {("title" in selectedServiceDetails || "doctorName" in selectedServiceDetails) && (
            <div className="space-y-1">
              {"title" in selectedServiceDetails && selectedServiceDetails.title && (
                <h3 className="text-xl font-bold text-gray-900">{selectedServiceDetails.title}</h3>
              )}
              {"doctorName" in selectedServiceDetails && selectedServiceDetails.doctorName && (
                <h3 className="text-xl font-bold text-gray-900">{selectedServiceDetails.doctorName}</h3>
              )}
              {"designation" in selectedServiceDetails && selectedServiceDetails.designation && (
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ff4d4f]">
                  {selectedServiceDetails.designation}
                </p>
              )}
            </div>
          )}

          <div className="space-y-3">
            <p className="text-base leading-7 text-gray-800">{selectedServiceDetails.marathiText}</p>
            <p className="text-base leading-7 text-gray-700">{selectedServiceDetails.englishText}</p>
          </div>

          {"price" in selectedServiceDetails && selectedServiceDetails.price && (
            <div className="inline-flex rounded-full border border-[#ffb3b4] bg-white px-4 py-2 text-sm font-semibold text-[#d9363e] shadow-sm">
              {selectedServiceDetails.price}
            </div>
          )}

          {"sectionTitle" in selectedServiceDetails && selectedServiceDetails.sectionTitle && (
            <div className="space-y-3 rounded-xl border border-[#ffd6d6] bg-white/80 p-4">
              <h4 className="text-sm font-semibold text-[#b42318]">
                {selectedServiceDetails.sectionTitle}
              </h4>
              {"options" in selectedServiceDetails && selectedServiceDetails.options && (
                <ul className="space-y-2">
                  {selectedServiceDetails.options.map((option) => (
                    <li key={option}>
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedService === "General Inquiry (FREE)") {
                            toggleMultiSelectOption(
                              generalInquiryOptions,
                              option,
                              onGeneralInquiryOptionsChange
                            );
                            return;
                          }

                          if (selectedService === "Chronic Care") {
                            toggleMultiSelectOption(
                              chronicCareOptions,
                              option,
                              onChronicCareOptionsChange
                            );
                            return;
                          }

                          if (selectedService === "Healthy Life (online consultation)") {
                            onHealthyLifeSelectionChange(option);
                            return;
                          }

                          if (selectedService === "Personalized Plans - Inquiry") {
                            onPersonalizedPlanSelectionChange(option);
                          }
                        }}
                        aria-pressed={isMultiSelectService ? getSelectedOptions().includes(option) : undefined}
                        aria-checked={isSingleSelectService ? getSelectedValue() === option : undefined}
                        role={isSingleSelectService ? "radio" : "checkbox"}
                        className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                          (isMultiSelectService && getSelectedOptions().includes(option)) ||
                          (isSingleSelectService && getSelectedValue() === option)
                            ? "border-[#ff4d4f] bg-red-50 text-[#b42318] shadow-[0_8px_20px_rgba(255,77,79,0.12)]"
                            : "border-[#ffe3e3] bg-[#fffafa] text-gray-800 hover:border-[#ffb3b4] hover:bg-red-50"
                        }`}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {selectedService === "Healthy Life (online consultation)" && healthyLifeSelection && (
              <div className="space-y-2 rounded-xl border border-[#ffd6d6] bg-white/80 p-4">
                <label
                  htmlFor="healthy-life-expert"
                  className="text-sm font-semibold text-[#b42318]"
                >
                  Select Expert
                </label>
                <select
                  id="healthy-life-expert"
                  value={healthyLifeExpertSelection}
                  onChange={(e) => onHealthyLifeExpertSelectionChange(e.target.value)}
                  className="w-full rounded-xl border border-[#ffd6d6] bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all duration-200 focus:border-[#ff4d4f] focus:ring-2 focus:ring-red-200"
                >
                  <option value="">Select Expert</option>
                  {healthyLifeExperts.map((expert) => (
                    <option key={expert.name} value={expert.name}>
                      {`${expert.name} (\u20b9${expert.price})`}
                    </option>
                  ))}
                </select>
              </div>
            )}

          {"footerNote" in selectedServiceDetails && selectedServiceDetails.footerNote && (
            <div className="whitespace-pre-line rounded-xl border border-[#ffd6d6] bg-white px-4 py-3 text-sm leading-6 text-gray-700">
              {selectedServiceDetails.footerNote}
            </div>
          )}

          {"footer" in selectedServiceDetails && selectedServiceDetails.footer && (
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d9363e]">
              {selectedServiceDetails.footer}
            </div>
          )}

          {"consent" in selectedServiceDetails && selectedServiceDetails.consent && (
            <div
              className={`rounded-xl border bg-white px-4 py-3 text-sm font-medium text-gray-800 transition-colors duration-200 ${
                serviceConsentError
                  ? "border-[#ff4d4f] shadow-[0_0_0_3px_rgba(255,77,79,0.12)]"
                  : "border-[#ffd6d6] hover:border-[#ffb3b4]"
              }`}
            >
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={isConsentGiven}
                  onChange={(e) => onConsentChange(e.target.checked)}
                  className="h-5 w-5 rounded border-[#ffb3b4] text-[#ff4d4f] focus:ring-[#ffb3b4]"
                />
                <span>{selectedServiceDetails.consent}</span>
              </label>
              {serviceConsentError && (
                <p className="mt-2 text-sm text-[#d9363e]">Please provide consent to continue</p>
              )}
            </div>
          )}
        </div>
      )}

      <textarea
        placeholder="Describe Requirements"
        value={requirements}
        onChange={(e) => onRequirementsChange(e.target.value)}
        className="w-full min-h-[120px] rounded-xl border border-[#ffd6d6] bg-white px-4 py-3 text-gray-900 font-medium placeholder-gray-500 shadow-[0_10px_30px_rgba(255,77,79,0.06)] focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 sm:px-5 sm:py-4"
      />

      {serviceActionError && <p className="text-sm font-medium text-red-600">{serviceActionError}</p>}
      {serviceSuccessMessage && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {serviceSuccessMessage}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-lg border border-red-500 px-6 py-3 text-red-500 transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-disabled={!selectedService || (requiresConsent && !isConsentGiven)}
          className={`w-full rounded-lg px-6 py-3 text-white transition-all duration-300 sm:w-auto ${
            !selectedService ? "cursor-not-allowed bg-red-300" : "bg-red-500 hover:bg-red-600 hover:-translate-y-0.5"
          }`}
        >
          {primaryButtonLabel}
        </button>
      </div>
    </div>
  );
}
