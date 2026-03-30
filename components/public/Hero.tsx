"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link"; // For CTA buttons

const CheckCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

interface SlideContent {
  headline: React.ReactNode;
  subtext?: string;
  bullets: string[];
  cta: string;
  ctaLink: string; // Link for the CTA button
  price?: string;
  image: string;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides: SlideContent[] = [
    {
      headline: (
        <>
          â€œChronic <span className="text-teal-600">Disease Care,</span>{" "}
          <span className="text-teal-600">Reinvented</span> â€“{" "}
          <span className="text-teal-600">Remotely.</span>â€
        </>
      ),
      subtext: "Track. Treat. Transform. - Remotely, Every Day",
      bullets: [
        "Smart tracking of vitals & lifestyle.",
        "Experts + tech = better habits.",
        "Tech-powered care. Life-long change.",
      ],
      cta: "Start Free Tracking",
      ctaLink: "/get-started",
      price: "Join Pro Program â€“ â‚¹7500/year",
      image: "/images/Hero1.jpg",
    },
    {
      headline: (
        <>
          â€œAngioplasty Done? Now{" "}
          <span className="text-teal-600">Rebuild Your Life.</span>â€
        </>
      ),
      bullets: [
        "Expert support after angioplasty, bypass, or heart failure.",
        "8 out of 10 patients feel stronger within 6 weeks of guided rehab.",
        "Prevent repeat attacks with structured rehab.",
      ],
      cta: "Join Cardiac Rehab Now",
      ctaLink: "/get-started",
      image: "/images/Hero2.jpg",
    },
    {
      headline: (
        <>
          â€œReverse <span className="text-teal-600">Sugar Damage</span> â€“{" "}
          <span className="text-teal-600">Before Itâ€™s Too Late.</span>â€
        </>
      ),
      bullets: [
        "60% of users reduced their meds in 6 months.",
        "Early diabetes reversal works better than late insulin use.",
        "Continuous tracking + expert plans = sustained sugar control.",
      ],
      cta: "Start Your Diabetes Care",
      ctaLink: "/get-started",
      image: "/images/Hero3.jpg",
    },
    {
      headline: (
        <>
          â€œIts Not Just Weight â€“ Itâ€™s Your{" "}
          <span className="text-teal-600">Metabolism.</span>â€
        </>
      ),
      bullets: [
        "Inch loss seen in 4-6 weeks by 70% of active users.",
        "Reduced fatigue, better sleep, less acidity in 1st month.",
        "Stop the belly fat-sugar-stress loop with expert care.",
      ],
      cta: "Join Weight Loss Program",
      ctaLink: "/get-started",
      image: "/images/Hero4.jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 700);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 700);
  };

  const currentSlideContent = slides[currentSlide];

  return (
    <section className="w-full bg-[#F8FAFC]">
      <div className="min-h-screen px-4 py-16 sm:flex sm:items-center sm:justify-center md:px-8 md:py-24 lg:px-16">
        <div className="w-full max-w-[1200px]">
          <div
            className={`flex min-h-[500px] max-w-md flex-col gap-8 rounded-[2rem] border border-gray-100 bg-white/95 p-6 shadow-md transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-md md:min-h-[420px] md:max-w-6xl md:flex-row md:items-center md:justify-between md:p-10 ${isAnimating ? "translate-x-10 scale-[0.98] opacity-0" : "translate-x-0 scale-100 opacity-100"}`}
          >
            <div className="w-full md:w-1/2">
              <div className="flex flex-col justify-center gap-4 text-center sm:text-left md:gap-6">
                <h1 className="mb-2 text-3xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
                  {currentSlideContent.headline}
                </h1>
                {currentSlideContent.subtext && (
                  <p className="mb-2 max-w-md text-base leading-relaxed text-slate-600 md:text-lg">
                    {currentSlideContent.subtext}
                  </p>
                )}
                <div className="mt-2 flex flex-col gap-4">
                  {currentSlideContent.bullets.map((bullet, index) => {
                    const words = bullet.split(" ");
                    const boldWordsCount = bullet.toLowerCase().startsWith("8 out of 10") ? 4 : 2;
                    const boldPart = words.slice(0, boldWordsCount).join(" ");
                    const regularPart = words.slice(boldWordsCount).join(" ");

                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
                          <CheckCircle className="h-4 w-4 text-teal-600" />
                        </div>
                        <p className="text-sm text-slate-600 md:text-base">
                          <span className="font-semibold text-slate-900">
                            {boldPart}
                          </span>{" "}
                          {regularPart}
                        </p>
                      </div>
                    );
                  })}
                </div>
                {currentSlideContent.price && (
                  <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                    {currentSlideContent.price}
                  </p>
                )}
                <div className="mt-2 flex justify-center md:justify-start">
                  <Link
                    href={currentSlideContent.ctaLink}
                    className="primary-btn w-full sm:w-auto"
                  >
                    {currentSlideContent.cta}
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-center md:w-1/2 md:justify-end">
              <div className="relative h-[240px] w-full overflow-hidden rounded-3xl border border-gray-100 shadow-sm sm:h-[280px] md:h-[380px]">
                <Image
                  src={currentSlideContent.image}
                  alt="Hero Image"
                  fill
                  className="object-cover"
                  priority={currentSlide === 0}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 scale-100 bg-teal-700"
                    : "scale-90 bg-teal-100 hover:bg-teal-200 hover:scale-100"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
