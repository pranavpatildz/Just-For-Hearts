"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "Do I need to visit a hospital or clinic for this?",
    answer: "No. All services are provided remotely through our app, calls, and chat.",
  },
  {
    question: "Can I speak to a real doctor or expert if needed?",
    answer:
      "Yes. Our care team includes experienced medical professionals who can guide you whenever required.",
  },
  {
    question: "What if I have more than one condition (like diabetes + BP)?",
    answer:
      "Our programs are designed to support multiple health conditions together with a personalized care plan.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-shell">
      <div className="mx-auto max-w-[720px] px-4 md:px-8">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="text-[26px] font-semibold tracking-tight text-slate-900 md:text-[36px]">
            Your <span className="text-teal-600">Questions</span>, Answered
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Find quick answers to the most common healthcare queries.
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md md:p-6"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-3 text-left transition-all duration-300 ease-in-out"
                  aria-expanded={isOpen}
                >
                    <span className="text-[15px] font-medium text-slate-900 md:text-lg">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-teal-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                    className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[14px] leading-relaxed text-slate-600 md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
