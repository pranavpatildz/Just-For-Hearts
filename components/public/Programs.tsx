"use client";

import Link from "next/link"; // For CTA buttons
import { Check } from "lucide-react"; // For bullet points

export default function Programs() {
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
        buttonLink: "/programs/cardiac",
        hasButton: true,
        headerColor: "bg-red-600",
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
        buttonLink: "/programs/diabetes",
        hasButton: true,
        headerColor: "bg-blue-600",
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
        buttonLink: "/programs/obesity",
        hasButton: true,
        headerColor: "bg-green-600",
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

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border') => {
    switch (color) {
      case 'red': return type === 'bg' ? 'bg-red-600' : type === 'text' ? 'text-red-600' : 'border-red-600';
      case 'blue': return type === 'bg' ? 'bg-blue-600' : type === 'text' ? 'text-blue-600' : 'border-blue-600';
      case 'green': return type === 'bg' ? 'bg-green-600' : type === 'text' ? 'text-green-600' : 'border-green-600';
      default: return '';
    }
  };

  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-gray-900">
          <span className="text-red-600">JFH</span> Programs
        </h2>

      </div>

      {/* Main container for the three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {programsData.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col items-center">

            {/* Top Card */}
            <div className="w-full max-w-sm rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white/95 backdrop-blur-sm overflow-hidden">
              {/* Header Color Strip */}
              <div className={`${column.top.headerColor} py-8 text-center rounded-t-3xl`}>
                <h3 className="text-xl font-semibold tracking-wide text-white">{column.top.title}</h3>
              </div>
              <div className="px-8 py-8 space-y-4">
                {column.top.text && <p className="leading-relaxed text-gray-700">{column.top.text}</p>}
                <ul className="list-none space-y-3 text-left text-gray-700 leading-relaxed">
                  {column.top.bullets.map((bullet, bIndex) => (
                    <li key={bIndex} className="flex items-center gap-2">
                      <Check className={`w-4 h-4 ${getColorClass(column.top.cardColor, 'text')} flex-shrink-0`} />
                      {bullet}
                    </li>
                  ))}
                </ul>
                {column.top.hasButton && (
                  <div className="mt-6 text-center">
                    <Link href={column.top.buttonLink} className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:scale-105 transition-all duration-300">
                      {column.top.buttonText}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="flex flex-col items-center py-4">
              {/* Top Triangle Pointer */}
              <div className={`w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-current ${getColorClass(column.top.cardColor, 'text')}`}></div>
              {/* Vertical line */}
              <div className={`w-0.5 h-12 ${getColorClass(column.top.cardColor, 'bg')} mx-auto`}></div>
              {/* Bottom Triangle Pointer */}
              <div className={`w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-current ${getColorClass(column.top.cardColor, 'text')}`}></div>
            </div>

            {/* Bottom Card */}
            <div className="w-full max-w-sm min-h-[250px] rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white/95 backdrop-blur-sm overflow-hidden border-t-4" style={{ borderColor: getColorClass(column.bottom.cardColor, 'border').replace('border-', '#') }}>
              <h3 className={`text-xl font-bold mb-4 px-8 pt-8 ${getColorClass(column.bottom.cardColor, 'text')} underline decoration-2 decoration-current`}>
                {column.bottom.title}
              </h3>
              {column.bottom.text && <p className="leading-relaxed text-gray-700 mb-4 px-8">{column.bottom.text}</p>}
              <ul className="list-none space-y-3 text-left text-gray-700 leading-relaxed px-8 pb-8">
                {column.bottom.bullets.map((bullet, bIndex) => (
                  <li key={bIndex} className="flex items-center gap-2">
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