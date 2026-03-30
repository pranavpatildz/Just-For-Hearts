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
    cardBg: "bg-gradient-to-b from-red-50 to-white",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    strip: "bg-red-300",
  },
  {
    cardBg: "bg-gradient-to-b from-green-50 to-white",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    strip: "bg-green-300",
  },
  {
    cardBg: "bg-gradient-to-b from-blue-50 to-white",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    strip: "bg-blue-300",
  },
] as const;

export default function WhyYearRoundPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-r from-green-50 via-white to-green-50">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Why <span className="text-red-500">Year-Round</span>, not just one{" "}
            <span className="text-red-500">consult</span>?
          </h1>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed mt-6">
            Because Health Is a Journey - Not a Prescription. Diabetics avoid sugar spikes and
            complications, Heart patients reduced re-hospitalizations, Obesity is managed
            sustainably, not temporarily. And it all happens not in one visit, but in small steps
            - guided consistently.
          </p>
          <Link
            href="/get-started"
            className="inline-flex mt-8 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full shadow-md transition"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cards.map((card, index) => {
              const Icon = card.icon;
              const accent = accents[index % accents.length];

              return (
                <article
                  key={card.title}
                  className={`relative rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 p-8 text-center flex flex-col items-center min-h-[250px] h-full justify-between overflow-hidden ${accent.cardBg}`}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${accent.iconBg}`}
                  >
                    <Icon className={`w-7 h-7 ${accent.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
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
