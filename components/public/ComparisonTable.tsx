"use client";

export default function ComparisonTable() {
  const features = [
    "Daily Check-ins",
    "Expert Nutrition & Diet",
    "Reminders & Motivational Nudges",
    "Goal Progress Monitoring",
    "Monthly Summary & Expert Review",
    "Expert Calls",
    "Dedicated Health Coach",
    "Weekly Mindfulness Sessions",
    "Exercise Plan",
    "Emergency Health Guidance",
    "Cardiac Rehab Support",
    "Diabetes Care Program",
    "Obesity Management Program",
  ];

  const chronicCare = {
    price: "₹ 2500",
    features: [true, true, true, true, true, true, false, false, false, false, false, false, false],
  };

  const personalisedCare = {
    price: "₹ 7500",
    subtitle: "(3 Months Only)",
    features: Array(features.length).fill(true), // All features included
  };

  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-green-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  const CrossIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-red-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Chronic Care Vs Personalised Care
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-12">
          Start small or go all in. JFH is with you every step.
        </p>

        {/* Card-style table container */}
        <div className="overflow-x-auto">
          <div className="min-w-full inline-flex flex-nowrap md:flex-wrap justify-center gap-6 pb-4">
            {/* Features Column (hidden on mobile, visible on desktop) */}
            <div className="hidden md:block w-full md:w-auto min-w-[250px] bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-8 pt-10">
                Features
              </h3>
              <ul className="text-left space-y-4 text-gray-700">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center h-5">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Chronic Care Column */}
            <div className="w-full md:w-auto min-w-[280px] bg-white rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
              <div className="bg-blue-100 p-6 rounded-t-xl text-center">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">
                  Chronic Care
                </h3>
                <p className="text-4xl font-extrabold text-blue-800">
                  {chronicCare.price}
                </p>
              </div>
              <div className="p-6 text-center">
                <ul className="text-left space-y-4 mb-8">
                  {chronicCare.features.map((included, index) => (
                    <li key={index} className="flex items-center h-5">
                      {included ? <CheckIcon /> : <CrossIcon />}
                      <span className="ml-2 text-gray-700">
                        {features[index]}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition-colors duration-300">
                  Choose Plan
                </button>
              </div>
            </div>

            {/* Personalised Care Column (Highlighted) */}
            <div className="w-full md:w-auto min-w-[280px] bg-red-600 text-white rounded-xl shadow-xl border border-red-500 transform hover:scale-105 transition-transform duration-300">
              <div className="bg-red-700 p-6 rounded-t-xl text-center">
                <h3 className="text-2xl font-bold mb-2">
                  Personalised Care
                </h3>
                <p className="text-4xl font-extrabold">
                  {personalisedCare.price}
                </p>
                <p className="text-sm font-medium opacity-80">
                  {personalisedCare.subtitle}
                </p>
              </div>
              <div className="p-6 text-center">
                <ul className="text-left space-y-4 mb-8">
                  {personalisedCare.features.map((included, index) => (
                    <li key={index} className="flex items-center h-5">
                      {included ? <CheckIcon /> : <CrossIcon />}
                      <span className="ml-2 text-white">
                        {features[index]}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className="bg-white hover:bg-gray-100 text-red-600 font-bold py-3 px-8 rounded-full shadow-md transition-colors duration-300">
                  Choose Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
