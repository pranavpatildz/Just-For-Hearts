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
    <section className="mt-12 md:mt-20 mb-10">
      <div className="max-w-[720px] mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-[26px] md:text-[36px] font-bold text-slate-900">
            Your <span className="text-red-600">Questions</span>, Answered
          </h2>
          <p className="mt-2.5 text-base text-gray-600">
            Find quick answers to the most common healthcare queries.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="bg-white rounded-xl p-4 md:p-5 shadow-md transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between gap-3 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] md:text-lg font-semibold text-slate-900">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${
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
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-2.5" : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[14px] md:text-base leading-[1.5] md:leading-relaxed text-slate-700">
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

