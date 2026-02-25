"use client";

import { Check, X, HeartPulse, Activity, Scale } from "lucide-react"; // Assuming we have these from previous installs

export default function ComparisonTable() {
  const patientGroupsData = [
    {
      title: "For Heart Patients",
      description: "Comprehensive care and rehabilitation programs designed to improve cardiovascular health and prevent future incidents.",
      benefits: [
        "Personalized Cardiac Rehab",
        "Expert Guidance",
        "Progress Tracking",
        "Emotional Support"
      ],
      icon: HeartPulse, // Using Lucide icon
      bgColor: "bg-red-50"
    },
    {
      title: "For Diabetes Management",
      description: "Holistic programs focusing on blood sugar control, lifestyle adjustments, and expert nutritional advice.",
      benefits: [
        "Blood Sugar Monitoring",
        "Dietary Management",
        "Physical Activity Plans",
        "Medication Guidance"
      ],
      icon: Activity, // Using Lucide icon
      bgColor: "bg-blue-50"
    },
    {
      title: "For Obesity & Weight Loss",
      description: "Sustainable weight management solutions through tailored nutrition, exercise, and behavioral change support.",
      benefits: [
        "Personalized Meal Plans",
        "Customized Workout Routines",
        "Behavioral Counseling",
        "Metabolic Health Improvement"
      ],
      icon: Scale, // Using Lucide icon
      bgColor: "bg-green-50"
    },
  ];

  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12 md:py-16 bg-gradient-to-r from-gray-100 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 md:mb-8">
          Specialized Programs for Specific Conditions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {patientGroupsData.map((group, index) => {
            const Icon = group.icon;
            return (
              <div key={index} className={`rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white/95 backdrop-blur-sm ${group.bgColor} p-8 space-y-4`}>
                <div className="flex justify-center mb-4">
                  <Icon className="w-12 h-12 text-gray-800" />
                </div>
                <h3 className="text-2xl font-semibold mb-5 text-gray-900">{group.title}</h3>
                <p className="text-gray-700 leading-relaxed">{group.description}</p>
                <ul className="space-y-3 text-gray-700 leading-relaxed text-left">
                  {group.benefits.map((benefit, bIndex) => (
                    <li key={bIndex} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}