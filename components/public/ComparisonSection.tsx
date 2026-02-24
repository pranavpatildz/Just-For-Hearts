"use client";

import { MessageSquareHeart, ClipboardCheck, BellRing, Target, FileBarChart2, PhoneCall, UserCheck, Brain, Dumbbell, ShieldPlus, HeartPulse, Activity, Scale, Check, X } from "lucide-react";

export default function ComparisonSection() {
  const features = [
    { name: "Daily Chat-based Tracking", icon: MessageSquareHeart, chronic: true },
    { name: "Expert Review of Logs", icon: ClipboardCheck, chronic: true },
    { name: "Reminders & Motivational Nudges", icon: BellRing, chronic: true },
    { name: "Goal Progress Monitoring", icon: Target, chronic: true },
    { name: "Monthly Summary & Expert Notes", icon: FileBarChart2, chronic: true },
    { name: "Expert Calls", icon: PhoneCall, chronic: true },
    { name: "Dedicated Health Coach", icon: UserCheck, chronic: false },
    { name: "Weekly Mindfulness Sessions", icon: Brain, chronic: false },
    { name: "Exercise Plan as per Condition", icon: Dumbbell, chronic: false },
    { name: "Emergency Health Guidance", icon: ShieldPlus, chronic: false },
    { name: "Cardiac Rehab Support", icon: HeartPulse, chronic: false },
    { name: "Diabetes Care Program", icon: Activity, chronic: false },
    { name: "Obesity Management Program", icon: Scale, chronic: false }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-r from-red-50 via-white to-green-50 overflow-hidden">
      <div className="w-full px-4 lg:px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-red-600">Chronic Care</span>
            <span className="text-gray-900 mx-2">VS</span>
            <span className="text-green-600">Personalised Care</span>
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Start small or go all in. JFH is with you every step.
          </p>
        </div>

        {/* Table */}
        <div className="flex overflow-x-auto gap-8 pb-6 md:grid md:grid-cols-3 gap-8 xl:gap-10">

          {/* Features Column */}
          <div className="w-full min-w-[300px] md:min-w-0 bg-white rounded-2xl shadow-lg">
            <div className="bg-red-600 text-white text-center py-4 rounded-t-2xl">
              <h2 className="text-lg font-bold tracking-wide">
                Features
              </h2>
            </div>
            <div className="p-6 flex flex-col space-y-3 lg:space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="h-10 flex items-center gap-3">
                  <feature.icon className="w-6 h-6 text-red-500" />
                  <span className="text-gray-800 font-medium">
                    {feature.name}
                  </span>
                </div>
              ))}
              <div className="mt-6 text-center">
                <div className="inline-block px-8 py-3 rounded-xl 
                                bg-gradient-to-r from-red-500 to-red-400 
                                text-white font-semibold tracking-wide 
                                shadow-md">
                  Fee
                </div>
              </div>
            </div>
          </div>

          {/* Chronic Care Column */}
          <div className="w-full min-w-[300px] md:min-w-0 bg-white rounded-2xl shadow-lg">
            <div className="bg-blue-600 text-white text-center py-4 rounded-t-2xl">
              <h2 className="text-lg font-bold tracking-wide">
                Chronic Care
              </h2>
            </div>
            <div className="p-6 flex flex-col space-y-3 lg:space-y-2 items-center">
              {features.map((feature, index) => (
                <div key={index} className="h-10 flex items-center justify-center">
                  {feature.chronic ? (
                    <Check className="w-6 h-6 text-green-600" />
                  ) : (
                    <X className="w-6 h-6 text-red-600" />
                  )}
                </div>
              ))}
              <div className="mt-6 text-center">
                <div className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl shadow-lg">
                  <span className="text-xl font-bold">₹ 2500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personalised Care Column */}
          <div className="w-full min-w-[300px] md:min-w-0 bg-white rounded-2xl shadow-lg">
            {/* Heading */}
            <div className="bg-green-600 text-white text-center py-4 rounded-t-2xl">
              <h2 className="text-lg font-bold tracking-wide">
                Personalised Care
              </h2>
            </div>
            {/* Content Area */}
            <div className="p-6 flex flex-col space-y-3 lg:space-y-2 items-center">
              {features.map((feature, index) => (
                <div key={index} className="h-10 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
              ))}
              {/* Fee */}
              <div className="mt-6 text-center">
                <div className="inline-block bg-green-600 text-white px-8 py-3 rounded-xl shadow-lg">
                  <span className="text-xl font-bold">₹ 7500</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-green-700">
                  By Invite Only
                </p>
              </div>
            </div>
          </div>

        </div>
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <p className="text-lg font-semibold text-gray-700 leading-relaxed">
            Join Chronic care today and secure your health journey.
          </p>
          <p className="text-lg font-semibold text-gray-700 leading-relaxed mt-2">
            When you upgrade to a Personalized Care, everything you’ve already paid gets adjusted – making your upgrade effectively free!
          </p>
        </div>
      </div>
    </section>
  );
}