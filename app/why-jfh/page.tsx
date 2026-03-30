"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Users,
  HeartPulse,
  TrendingUp,
  Activity,
  MessageCircle,
  ClipboardCheck,
} from "lucide-react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const benefits = [
  {
    title: "25+ Years of Clinical Excellence",
    description:
      "Backed by senior doctors, cardiologists, diabetes educators & rehab experts with 10+ years of experience each",
    cardBg: "bg-white",
    iconBg: "bg-slate-100",
    iconColor: "text-teal-600",
    strip: "bg-teal-600",
    icon: Stethoscope,
  },
  {
    title: "A whole Team Behind Every Patient",
    description:
      "Not just one coach - a coordinated team of experts guides your journey across diet, exercise, stress, and medications",
    cardBg: "bg-white",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
    strip: "bg-teal-500",
    icon: Users,
  },
  {
    title: "Remote Monitoring That Works",
    description:
      "Real-time tracking of vitals, daily habits & red flags - no hospital queues, just smart follow-ups",
    cardBg: "bg-white",
    iconBg: "bg-slate-100",
    iconColor: "text-teal-500",
    strip: "bg-teal-500",
    icon: HeartPulse,
  },
  {
    title: "Proven, Trusted, and Growing",
    description:
      "50,000+ patients empowered | 10,000+ health events delivered | Lakhs of consultations and counting",
    cardBg: "bg-white",
    iconBg: "bg-slate-100",
    iconColor: "text-teal-600",
    strip: "bg-teal-600",
    icon: TrendingUp,
  },
  {
    title: "Personalized Heart Health Plans",
    description:
      "Customized care plans tailored to your heart condition, lifestyle, and medical history. Our experts continuously monitor and adjust your plan for better outcomes.",
    cardBg: "bg-white",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
    strip: "bg-teal-500",
    icon: ClipboardCheck,
  },
  {
    title: "Continuous 1-on-1 Human Support",
    description:
      "Coaches reach out with weekly check-ins, personalized feedback & real conversations - no bots, no templates",
    cardBg: "bg-white",
    iconBg: "bg-slate-100",
    iconColor: "text-teal-500",
    strip: "bg-teal-500",
    icon: MessageCircle,
  },
];

export default function WhyJFHPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <motion.section
        className="relative overflow-hidden px-4 py-16 md:px-8 md:py-20 lg:px-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/images/Hero1.jpg')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-100/90 via-white/85 to-white/80"
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-center text-slate-800">
            Why <span className="text-teal-600">Choose</span> JFH Pro Programs
          </h1>
        </div>
      </motion.section>

      <motion.section
        className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={`${benefit.title}-${index}`}
                className={`relative flex min-h-[250px] h-full flex-col items-center justify-between overflow-hidden rounded-2xl p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl md:p-6 ${benefit.cardBg}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="relative z-10 flex flex-col flex-grow items-center text-center">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${benefit.iconBg}`}
                  >
                    <Icon className={`w-6 h-6 ${benefit.iconColor}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-medium text-slate-900">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 md:text-base">{benefit.description}</p>
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-2 rounded-b-2xl ${benefit.strip}`} />
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        className="px-4 py-8 pb-16 text-center md:px-8 lg:px-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/get-started"
          className="primary-btn px-10 py-4 text-lg"
        >
          Get Started
        </Link>
      </motion.section>

      <Footer />
    </div>
  );
}
