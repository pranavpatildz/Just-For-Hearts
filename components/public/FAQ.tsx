"use client";

import { useState } from "react";

export default function FAQ() {
  const faqData = [
    {
      question: "What is Just For Hearts?",
      answer: "Just For Hearts is a personalized cardiac care and rehabilitation platform designed to help individuals manage and improve their heart health from the comfort of their homes.",
    },
    {
      question: "How does personalized care work?",
      answer: "Our personalized care plans involve expert guidance from cardiologists, dietitians, and fitness experts, along with continuous tracking and support tailored to your specific needs.",
    },
    {
      question: "Is there a free trial?",
      answer: "We offer a free initial consultation to discuss your health goals and how Just For Hearts can help you. Some programs may include a free tracking period.",
    },
    {
      question: "What conditions do you support?",
      answer: "We support various conditions including post-heart attack recovery, chronic heart disease management, diabetes management, and obesity & weight management programs.",
    },
    {
      question: "How do I get started?",
      answer: "You can get started by signing up for a free consultation on our website. Our team will guide you through the process and help you choose the best program.",
    },
  ];

  const AccordionItem = ({ question, answer, isOpen, toggleAccordion }: { question: string; answer: string; isOpen: boolean; toggleAccordion: () => void }) => {
    return (
      <div className="rounded-xl shadow-sm mb-4 hover:shadow-md transition bg-white">
        <button
          className="flex justify-between items-center w-full p-6 text-lg font-semibold text-left text-gray-800 focus:outline-none"
          onClick={toggleAccordion}
        >
          {question}
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {isOpen && (
          <div className="px-6 pb-6 text-gray-700 leading-relaxed">
            {answer}
          </div>
        )}
      </div>
    );
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 max-w-3xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
        <p className="mt-4 text-lg text-gray-600">Find answers to the most common questions about Just For Hearts.</p>
      </div>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            toggleAccordion={() => toggleAccordion(index)}
          />
        ))}
      </div>
    </section>
  );
}