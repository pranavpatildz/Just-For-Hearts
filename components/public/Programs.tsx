"use client";

import Link from "next/link"; // For CTA buttons
import { Check } from "lucide-react"; // For bullet points
import { useEffect, useRef } from "react";

const getColorClass = (color: string, type: "text" | "bg" | "border") => {
  const colorMap: Record<string, { text: string; bg: string; border: string }> = {
    red: {
      text: "text-teal-600",
      bg: "bg-teal-600",
      border: "border-teal-600",
    },
    blue: {
      text: "text-teal-500",
      bg: "bg-teal-500",
      border: "border-teal-500",
    },
    green: {
      text: "text-teal-400",
      bg: "bg-teal-400",
      border: "border-teal-400",
    },
  };

  return colorMap[color]?.[type] || "";
};

type ProgramsProps = {
  showHeading?: boolean;
};

export default function Programs({ showHeading = true }: ProgramsProps) {
  const programsData = [
    // Column 1
    {
      top: {
        title: "Cardiac Rehab",
        text: "Best for Post-angioplasty, heart attack, heart failure, high BP patients",
        bullets: [
          "Faster recovery",
          "Stronger heart",
          "Increased stamina",
          "Duration 12 Months",
          "Included in Pro Plan",
        ],
        buttonText: "Join Cardiac Rehab",
        buttonLink: "/get-started",
        hasButton: true,
        headerColor: "bg-teal-700",
        cardColor: "red",
      },
      bottom: {
        title: "For Heart Patients",
        text: "",
        bullets: [
          "Heart health needs long-term rehab, not just discharge advice",
          "Guided exercise, medication reminders & symptom alerts reduce re-hospitalization",
          "Guided exercise, medication reminders & symptom alerts reduce re-hospitalization",
        ],
        cardColor: "red",
      },
    },
    // Column 2
    {
      top: {
        title: "Diabetes Care",
        text: "Suitable for Prediabetes & Uncontrolled/Recent Diabetes",
        bullets: [
          "Sugar reversal Support",
          "Reduced meds",
          "Lifestyle upgrade",
          "Duration 12 Months",
          "Included in Pro Plan",
        ],
        buttonText: "Join Diabetes Program",
        buttonLink: "/get-started",
        hasButton: true,
        headerColor: "bg-teal-600",
        cardColor: "blue",
      },
      bottom: {
        title: "For Diabetes Patients",
        text: "",
        bullets: [
          "Sugar levels change daily - based on food, stress, sleep",
          "Year-round tracking helps adjust diet & medication before problems start",
          "Prevents complications like neuropathy, eye damage, kidney issues",
        ],
        cardColor: "blue",
      },
    },
    // Column 3
    {
      top: {
        title: "Obesity Care",
        text: "Suitable for overweight, central obesity, PCOS, metabolic syndrome",
        bullets: [
          "Safe weight loss",
          "Better metabolism",
          "Confidence boost",
          "Duration 12 Months",
          "Included in Pro Plan",
        ],
        buttonText: "Join Obesity Program",
        buttonLink: "/get-started",
        hasButton: true,
        headerColor: "bg-teal-500",
        cardColor: "green",
      },
      bottom: {
        title: "For Obesity & Wellness",
        text: "",
        bullets: [
          "Weight loss is not a 1-month task - sustainable changes need consistency",
          "Meal plans, weekly feedback & motivation keep you accountable",
          "Helps reverse insulin resistance, fatty liver, and PCOD over time",
        ],
        cardColor: "green",
      },
    },
  ];

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = programsData.length;

  const smoothScrollTo = (target: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const start = container.scrollLeft;
    const change = target - start;
    const duration = 600; // animation time
    let startTime: number | null = null;

    const animateScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      container.scrollLeft = start + change * progress;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

    const startAutoScroll = () => {
      if (intervalRef.current) return;
    
      intervalRef.current = setInterval(() => {
        if (!scrollRef.current) return;
    
        const container = scrollRef.current;
        const cardWidth = container.offsetWidth;
    
        const currentIndex = Math.round(container.scrollLeft / cardWidth);
    
        let nextIndex = currentIndex + 1;
    
        // If last slide, go directly to first
        if (nextIndex >= totalSlides) {
          nextIndex = 0;
        }
    
        smoothScrollTo(nextIndex * cardWidth);
      }, 4000);
    };
  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);


        return (
            <section className="mx-auto max-w-[1280px] overflow-visible px-4 py-12 md:px-8 md:py-16 lg:px-16">
              {showHeading && (
                <div className="text-center mb-6 md:mb-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                    <span className="text-teal-600">JFH</span> Programs
                  </h2>
                </div>
              )}
    
              {/* Mobile Slider container */}
              <div
                ref={scrollRef}
                onTouchStart={stopAutoScroll}
                onMouseEnter={stopAutoScroll}
                onTouchEnd={() => setTimeout(startAutoScroll, 5000)}
                onMouseLeave={() => setTimeout(startAutoScroll, 5000)}
                className="md:hidden flex overflow-x-auto snap-x snap-mandatory scroll-container"
              >
                {programsData.map((column, colIndex) => (
                  <div key={colIndex} className="w-full flex-shrink-0 snap-start px-2 flex flex-col justify-between items-stretch">
                    {/* Top Card */}
                    <div className="w-full sm:max-w-sm flex-grow rounded-2xl bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl overflow-hidden z-10 min-h-[260px] flex flex-col justify-between text-balance">
                      {/* Header Color Strip */}
                      <div className={`${column.top.headerColor} py-4 md:py-8 text-center rounded-t-3xl`}>
                        <h3 className="text-sm md:text-xl font-semibold tracking-wide text-white break-normal break-words">{column.top.title}</h3>
                      </div>
                      <div className="px-3 md:px-8 py-2 md:py-8 space-y-2 md:space-y-4">
                        {column.top.text && <p className="font-medium text-sm md:text-base leading-relaxed text-slate-700 break-normal break-words">{column.top.text}</p>}
                        <ul className="list-none text-left text-xs leading-[1.3] space-y-1 md:text-base text-slate-700 break-words">
                          {column.top.bullets.map((bullet, bIndex) => (
                            <li key={bIndex} className="flex items-center gap-2 text-[14px] leading-relaxed">
                              <Check className={`w-4 h-4 ${getColorClass(column.top.cardColor, 'text')} flex-shrink-0`} />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        {column.top.hasButton && (
                          <div className="mt-4 md:mt-6 text-center">
                            <Link href={column.top.buttonLink} className="btn-primary px-[18px] py-[10px] text-sm md:px-6 md:py-3">
                              {column.top.buttonText}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Vertical Connector */}
                    <div className="relative flex flex-col items-center py-4 z-10">
                      {/* Top Triangle Pointer */}
                      <div className={`w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-current ${getColorClass(column.top.cardColor, 'text')}`}></div>
                      {/* Vertical line */}
                      <div className={`w-0.5 h-12 ${getColorClass(column.top.cardColor, 'bg')} mx-auto`}></div>
                      {/* Bottom Triangle Pointer */}
                      <div className={`w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-current ${getColorClass(column.top.cardColor, 'text')}`}></div>
                    </div>
                    {/* Bottom Card */}
                    <div className="w-full sm:max-w-sm flex flex-col justify-start flex-grow rounded-2xl bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl overflow-hidden border-t-4 min-h-[220px] text-balance" style={{ borderColor: getColorClass(column.bottom.cardColor, 'border').replace('border-', '#') }}>
                      <h3 className={`text-sm md:text-xl font-semibold mb-3 px-2 md:px-6 pt-2 md:pt-6 ${getColorClass(column.bottom.cardColor, 'text')} underline decoration-2 decoration-current`}>
                        {column.bottom.title}
                      </h3>
                      {column.bottom.text && <p className="leading-relaxed text-slate-700 mb-3 px-2 md:px-6">{column.bottom.text}</p>}
                      <ul className="list-none text-left text-xs leading-[1.3] space-y-1 md:text-base text-slate-700 px-2 md:px-6 pb-2 md:pb-6 break-words">
                        {column.bottom.bullets.map((bullet, bIndex) => (
                          <li key={bIndex} className="flex items-center gap-2 text-[14px] leading-relaxed">
                            <Check className={`w-4 h-4 ${getColorClass(column.bottom.cardColor, 'text')} flex-shrink-0`} />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

          {/* Main container for the three columns - DESKTOP */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-10">
            {programsData.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col justify-between items-stretch h-full">
                {/* Top Card */}
                <div className="w-full sm:max-w-sm flex-grow rounded-2xl bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl overflow-hidden z-10 min-h-[260px] flex flex-col justify-between text-balance">
                  {/* Header Color Strip */}
                  <div className={`${column.top.headerColor} py-4 md:py-8 text-center rounded-t-3xl`}>
                    <h3 className="text-sm md:text-xl font-semibold tracking-wide text-white break-normal break-words">{column.top.title}</h3>
                  </div>
                  <div className="px-3 md:px-8 py-2 md:py-8 space-y-2 md:space-y-4">
                    {column.top.text && <p className="font-medium text-sm md:text-base leading-relaxed text-slate-700 break-normal break-words">{column.top.text}</p>}
                    <ul className="list-none text-left text-xs leading-[1.3] space-y-1 md:text-base text-slate-700 break-words">
                      {column.top.bullets.map((bullet, bIndex) => (
                        <li key={bIndex} className="flex items-center gap-2 text-[14px] leading-relaxed">
                          <Check className={`w-4 h-4 ${getColorClass(column.top.cardColor, 'text')} flex-shrink-0`} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    {column.top.hasButton && (
                      <div className="mt-4 md:mt-6 text-center">
                        <Link href={column.top.buttonLink} className="btn-primary px-[18px] py-[10px] text-sm md:px-6 md:py-3">
                          {column.top.buttonText}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                {/* Vertical Connector */}
                <div className="relative flex flex-col items-center py-4 z-10">
                  {/* Top Triangle Pointer */}
                  <div className={`w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-current ${getColorClass(column.top.cardColor, 'text')}`}></div>
                  {/* Vertical line */}
                  <div className={`w-0.5 h-12 ${getColorClass(column.top.cardColor, 'bg')} mx-auto`}></div>
                  {/* Bottom Triangle Pointer */}
                  <div className={`w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-current ${getColorClass(column.top.cardColor, 'text')}`}></div>
                </div>
                {/* Bottom Card */}
                <div className="w-full sm:max-w-sm flex flex-col justify-start flex-grow rounded-2xl bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl overflow-hidden border-t-4 min-h-[220px] text-balance" style={{ borderColor: getColorClass(column.bottom.cardColor, 'border').replace('border-', '#') }}>
                  <h3 className={`text-sm md:text-xl font-semibold mb-3 px-2 md:px-6 pt-2 md:pt-6 ${getColorClass(column.bottom.cardColor, 'text')} underline decoration-2 decoration-current`}>
                    {column.bottom.title}
                  </h3>
                  {column.bottom.text && <p className="leading-relaxed text-slate-700 mb-3 px-2 md:px-6">{column.bottom.text}</p>}
                  <ul className="list-none text-left text-xs leading-[1.3] space-y-1 md:text-base text-slate-700 px-2 md:px-6 pb-2 md:pb-6 break-words">
                    {column.bottom.bullets.map((bullet, bIndex) => (
                      <li key={bIndex} className="flex items-center gap-2 text-[14px] leading-relaxed">
                        <Check className={`w-4 h-4 ${getColorClass(column.bottom.cardColor, 'text')} flex-shrink-0`} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
    
            </section>
        );
  }

  
