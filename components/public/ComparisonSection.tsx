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
    <section className="section-shell relative overflow-hidden bg-[#F8FAFC]">
      <div className="w-full px-4 md:px-8 lg:px-16">

        {/* Heading */}
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
            <span className="text-teal-600">Chronic Care</span>
            <span className="mx-2 text-slate-900">VS</span>
            <span className="text-teal-500">Personalised Care</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Start small or go all in. JFH is with you every step.
          </p>
        </div>

        {/* Table */}
        <div className="flex gap-6 overflow-x-auto pb-6 md:grid md:grid-cols-3 md:gap-8 xl:gap-8">

          {/* Features Column */}
          <div className="w-full min-w-[300px] rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md md:min-w-0">
            <div className="rounded-t-2xl bg-[#F1F5F9] py-4 text-center text-slate-900">
              <h2 className="text-lg font-bold tracking-wide">
                Features
              </h2>
            </div>
            <div className="flex flex-col space-y-4 p-6 md:space-y-6 lg:space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="h-10 flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-teal-600" />
                  <span className="font-medium text-slate-800">
                    {feature.name}
                  </span>
                </div>
              ))}
              <div className="mt-6 text-center">
                  <div className="inline-block rounded-xl px-8 py-3 
                                bg-teal-700 
                                text-white font-semibold tracking-wide 
                                shadow-md">
                  Fee
                </div>
              </div>
            </div>
          </div>

          {/* Chronic Care Column */}
          <div className="w-full min-w-[300px] rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md md:min-w-0">
            <div className="rounded-t-2xl bg-[#F1F5F9] py-4 text-center text-slate-900">
              <h2 className="text-lg font-bold tracking-wide">
                Chronic Care
              </h2>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 md:space-y-6 lg:space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="h-10 flex items-center justify-center">
                  {feature.chronic ? (
                    <Check className="w-6 h-6 text-teal-500" />
                  ) : (
                    <X className="w-6 h-6 text-slate-400" />
                  )}
                </div>
              ))}
              <div className="mt-6 text-center">
                <div className="inline-block rounded-xl bg-teal-700 px-8 py-3 text-white shadow-lg">
                  <span className="text-xl font-bold">₹ 2500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personalised Care Column */}
          <div className="w-full min-w-[300px] rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md md:min-w-0">
            <div className="rounded-t-2xl bg-[#F1F5F9] py-4 text-center text-slate-900">
              <h2 className="text-lg font-bold tracking-wide">
                Personalised Care
              </h2>
            </div>
            {/* Content Area */}
            <div className="flex flex-col items-center space-y-4 p-6 md:space-y-6 lg:space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="h-10 flex items-center justify-center">
                    <Check className="w-6 h-6 text-teal-500" />
                </div>
              ))}
              {/* Fee */}
              <div className="mt-6 text-center">
                <div className="inline-block rounded-xl bg-teal-600 px-8 py-3 text-white shadow-lg">
                  <span className="text-xl font-bold">₹ 7500</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-teal-500">
                  By Invite Only
                </p>
              </div>
            </div>
          </div>

        </div>
        <div className="mx-auto mt-10 max-w-4xl text-center">
          <p className="text-base font-medium leading-relaxed text-slate-700 md:text-lg">
            Join Chronic care today and secure your health journey.
          </p>
          <p className="mt-3 text-base font-medium leading-relaxed text-slate-700 md:text-lg">
            When you upgrade to a Personalized Care, everything you’ve already paid gets adjusted – making your upgrade effectively free!
          </p>
        </div>
      </div>
    </section>
  );
}
