"use client";

import Link from "next/link";
import {
  Bell,
  ClipboardList,
  Clock,
  Dumbbell,
  HeartPulse,
  LifeBuoy,
  MessageCircle,
  Search,
  Smartphone,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const cards = [
  {
    title: "Personalized Planning",
    description: "Get custom food, fitness & stress plans that actually suit your lifestyle",
    icon: Target,
  },
  {
    title: "Motivation That Doesn’t Fade",
    description: "Daily nudges, progress reviews & reminders keep you going",
    icon: TrendingUp,
  },
  {
    title: "Structured Change",
    description: "Small changes over time = long-term transformation",
    icon: Dumbbell,
  },
  {
    title: "Built for Diabetes, Heart & Obesity",
    description:
      "Programs crafted specifically for long-term management of lifestyle diseases",
    icon: HeartPulse,
  },
  {
    title: "Save Time, Avoid Clinics",
    description: "No queues. No scheduling stress. Just consistent care over WhatsApp",
    icon: Clock,
  },
  {
    title: "Recovery Support",
    description: "Fallen off track? We help you bounce back quickly – without judgment",
    icon: LifeBuoy,
  },
  {
    title: "Caregiver-Friendly",
    description: "We update families, solve doubts, and offer peace of mind remotely",
    icon: Users,
  },
  {
    title: "No More Guesswork",
    description: "Don’t Google symptoms – get expert advice based on your actual data",
    icon: Search,
  },
  {
    title: "Real-Time Monitoring",
    description: "We track your BP, sugar, weight, sleep – and respond when needed",
    icon: Smartphone,
  },
  {
    title: "Weekly Check-ins",
    description: "A real coach checks in with you every week – not an app, not a bot",
    icon: MessageCircle,
  },
  {
    title: "Sustainable Habit Building",
    description:
      "We help you build habits step-by-step so changes stick for life – not just during the program",
    icon: ClipboardList,
  },
  {
    title: "Early Alerts",
    description: "Catch warning signs before they turn into serious complications",
    icon: Bell,
  },
] as const;

const accents = [
  {
    cardBg: "bg-white",
    iconBg: "bg-slate-100",
    iconColor: "text-teal-600",
    strip: "bg-teal-600",
  },
  {
    cardBg: "bg-white",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
    strip: "bg-teal-500",
  },
  {
    cardBg: "bg-white",
    iconBg: "bg-slate-100",
    iconColor: "text-teal-500",
    strip: "bg-teal-500",
  },
] as const;

export default function WhyYearRoundPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center md:px-8 md:py-20 lg:px-16">
          <h1 className="text-3xl md:text-5xl font-semibold text-slate-800">
            Why <span className="text-teal-600">Year-Round</span>, not just one{" "}
            <span className="text-teal-600">consult</span>?
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Because Health Is a Journey - Not a Prescription. Diabetics avoid sugar spikes and
            complications, Heart patients reduced re-hospitalizations, Obesity is managed
            sustainably, not temporarily. And it all happens not in one visit, but in small steps
            - guided consistently.
          </p>
          <Link
            href="/get-started"
            className="primary-btn mt-8"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-16">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {cards.map((card, index) => {
              const Icon = card.icon;
              const accent = accents[index % accents.length];

              return (
                <article
                  key={card.title}
                  className={`relative flex min-h-[250px] h-full flex-col items-center justify-between overflow-hidden rounded-2xl p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl md:p-6 ${accent.cardBg}`}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${accent.iconBg}`}
                  >
                    <Icon className={`w-7 h-7 ${accent.iconColor}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-medium text-slate-800">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 md:text-base">{card.description}</p>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-2 rounded-b-2xl ${accent.strip}`}
                    aria-hidden="true"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
