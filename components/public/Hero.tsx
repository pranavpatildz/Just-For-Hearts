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
  image: string;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides: SlideContent[] = [
    {
      headline: (
        <>
          “Chronic <span className="text-red-500">Disease Care,</span>{" "}
          <span className="text-red-500">Reinvented</span> –{" "}
          <span className="text-red-500">Remotely.</span>”
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
      price: "Join Pro Program – ₹7500/year",
      image: "/images/Hero1.jpg",
    },
    {
      headline: (
        <>
          “Angioplasty Done? Now{" "}
          <span className="text-red-500">Rebuild Your Life.</span>”
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
          “Reverse <span className="text-red-500">Sugar Damage</span> –{" "}
          <span className="text-red-500">Before It’s Too Late.</span>”
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
          “Its Not Just Weight – It’s Your{" "}
          <span className="text-red-500">Metabolism.</span>”
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

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 700); // Duration of fade-out + slide animation
    }, 8000); // Change slide every 8 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 700); // Duration of fade-out + slide animation
  };

  const currentSlideContent = slides[currentSlide];

  return (
  <section className="w-full bg-zinc-50">
    <div className="min-h-screen px-4 sm:flex sm:items-center sm:justify-center py-12 md:py-16">
              <div className="w-full max-w-[1200px]">
                <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-8 bg-white rounded-3xl shadow-lg p-6 max-w-md md:max-w-6xl md:p-10 min-h-[500px] md:min-h-[420px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${isAnimating ? "opacity-0 translate-x-10 scale-[0.98]" : "opacity-100 translate-x-0 scale-100"}`}>
                  {/* Left Section: Headline, Subtext, Bullets, CTA */}
                  <div className="w-full md:w-1/2">
                    <div className="flex flex-col justify-center text-center sm:text-left gap-3">
                      <h1 className="text-base sm:text-4xl leading-snug font-extrabold text-gray-800 mb-6">
                        {currentSlideContent.headline}
                      </h1>
                      {currentSlideContent.subtext && (
                        <p className="text-sm sm:text-base text-gray-700 mb-8 max-w-md">
                          {currentSlideContent.subtext}
                        </p>
                      )}
                      <div className="flex flex-col gap-3 mt-3">
                        {currentSlideContent.bullets.map((bullet, index) => {
                          const words = bullet.split(" ");
                          // A simple heuristic to make the first 2-3 words bold
                          const boldWordsCount = bullet.toLowerCase().startsWith("8 out of 10") ? 4 : 2;
                          const boldPart = words.slice(0, boldWordsCount).join(" ");
                          const regularPart = words.slice(boldWordsCount).join(" ");

                          return (
                            <div key={index} className="flex items-start gap-3">
                              <div className="mt-1 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-red-100 flex-shrink-0">
                                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                              </div>
                              <p className="text-[14px] font-medium text-gray-700">
                                <span className="font-semibold text-gray-900">
                                  {boldPart}
                                </span>{" "}
                                {regularPart}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                      {currentSlideContent.price && (
                        <p className="mt-4 text-lg font-semibold text-gray-800">
                          {currentSlideContent.price}
                        </p>
                      )}
                      <div className="mt-6 flex justify-center md:justify-start">
                        <Link
                          href={currentSlideContent.ctaLink}
                          className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105"
                        >
                          {currentSlideContent.cta}
                        </Link>
                      </div>
                    </div>
                  </div>
      
                  {/* Right Section: Image */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className="relative w-full h-[240px] sm:h-[280px] md:h-[380px] rounded-2xl overflow-hidden">
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
                {/* Dot Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 mt-8">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? "w-4 h-4 bg-red-500 scale-100"
                          : "bg-gray-300 hover:bg-red-300 scale-90 hover:scale-100"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>      </div>
    </section>
  );
}