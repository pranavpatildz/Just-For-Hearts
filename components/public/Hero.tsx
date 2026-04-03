"use client";

import { useEffect, useRef } from "react";

import ComparisonSection from "@/components/public/ComparisonSection";

const heroCards = [
  {
    icon: "🎥",
    title: "Healthy Life",
    description: "Expert 20-min online video consultation.",
    cardClassName: "bg-[#EEF4FF]",
    iconClassName: "text-blue-500",
  },
  {
    icon: "📅",
    title: "Second Opinion",
    description: "Get certainty on your diagnosis & treatment.",
    cardClassName: "bg-[#F3F0FF]",
    iconClassName: "text-purple-500",
  },
  {
    icon: "❤️",
    title: "Chronic Care",
    description: "360° support for Diabetes & Heart Health.",
    cardClassName: "bg-[#FFF1F1]",
    iconClassName: "text-red-500",
  },
  {
    icon: "✅",
    title: "Personalized Plans",
    description: "3 months of aggressive reversal programs.",
    cardClassName: "bg-[#ECFFF5]",
    iconClassName: "text-green-500",
  },
];

export default function Hero() {
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const bar = document.getElementById("ai-bar");
    const tooltip = document.getElementById("ai-tooltip");

    if (!bar || !tooltip) return;

    const handleClick = () => {
      const isDesktop =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      if (isDesktop) return;

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      tooltip.style.opacity = "1";
      tooltip.style.transform = "translateX(-50%) scale(1)";

      hideTimeoutRef.current = setTimeout(() => {
        tooltip.style.opacity = "0";
        tooltip.style.transform = "translateX(-50%) scale(0.95)";
      }, 2500);
    };

    bar.addEventListener("click", handleClick);

    return () => {
      bar.removeEventListener("click", handleClick);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <section className="flex w-full flex-col items-center px-4 pb-10 pt-16 text-center">
        <h1 className="text-3xl font-bold leading-tight text-[#0B1B2B] md:text-5xl">
          Ready to Take Charge of your{" "}
          <span className="text-red-500">Health?</span>
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-gray-500 md:text-base">
          Join 40,000+ people already using Just For Hearts for diabetes,
          heart, and obesity care - all from the comfort of home.
        </p>

        <div className="group relative mt-6 w-full max-w-2xl">
          <div
            id="ai-bar"
            className="flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-3 shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <span className="mr-3 text-lg text-blue-500" aria-hidden="true">
              🤖
            </span>

            <input
              type="text"
              placeholder="Ask our Assistant: How can Just For Hearts help you today?"
              className="flex-1 cursor-pointer bg-transparent text-sm outline-none"
              disabled
            />

            <button
              className="ml-2 rounded-full bg-[#0B1B2B] px-5 py-2 text-sm text-white"
              disabled
              type="button"
            >
              Search
            </button>
          </div>

          <div
            id="ai-tooltip"
            className="pointer-events-none absolute left-1/2 mt-3 -translate-x-1/2 scale-95 rounded-lg bg-[#0B1B2B] px-4 py-2 text-xs text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
          >
            🤖 Our AI Assistant is training! This feature will be live soon.
          </div>
        </div>
      </section>

      <div className="mt-10 w-full px-4">
        <div className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth md:grid md:grid-cols-4 md:gap-6">
          {heroCards.map((card) => (
            <div
              key={card.title}
              className={`min-w-[250px] rounded-xl p-5 shadow-sm transition-all hover:shadow-md ${card.cardClassName}`}
            >
              <div
                className={`mb-3 text-2xl ${card.iconClassName}`}
                aria-hidden="true"
              >
                {card.icon}
              </div>
              <h3 className="font-semibold text-[#0B1B2B]">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      <ComparisonSection />
    </div>
  );
}
