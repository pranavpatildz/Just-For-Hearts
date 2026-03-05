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
} from "lucide-react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const benefits = [
  {
    title: "25+ Years of Clinical Excellence",
    description:
      "Backed by senior doctors, cardiologists, diabetes educators & rehab experts with 10+ years of experience each",
    accent: "bg-red-200",
    icon: Stethoscope,
    color: "text-red-500",
  },
  {
    title: "A whole Team Behind Every Patient",
    description:
      "Not just one coach - a coordinated team of experts guides your journey across diet, exercise, stress, and medications",
    accent: "bg-green-200",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "Remote Monitoring That Works",
    description:
      "Real-time tracking of vitals, daily habits & red flags - no hospital queues, just smart follow-ups",
    accent: "bg-blue-200",
    icon: HeartPulse,
    color: "text-blue-500",
  },
  {
    title: "Proven, Trusted, and Growing",
    description:
      "50,000+ patients empowered | 10,000+ health events delivered | Lakhs of consultations and counting",
    accent: "bg-red-200",
    icon: TrendingUp,
    color: "text-red-500",
  },
  {
    title: "Remote Monitoring That Works",
    description:
      "Real-time tracking of vitals, daily habits & red flags - no hospital queues, just smart follow-ups",
    accent: "bg-green-200",
    icon: Activity,
    color: "text-green-500",
  },
  {
    title: "Continuous 1-on-1 Human Support",
    description:
      "Coaches reach out with weekly check-ins, personalized feedback & real conversations - no bots, no templates",
    accent: "bg-blue-200",
    icon: MessageCircle,
    color: "text-blue-500",
  },
];

export default function WhyJFHPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <motion.section
        className="relative py-20 px-6 overflow-hidden"
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
          className="absolute inset-0 bg-gradient-to-r from-green-100/85 via-green-50/80 to-white/75"
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800">
            Why <span className="text-red-500">Choose</span> JFH Pro Programs
          </h1>
        </div>
      </motion.section>

      <motion.section
        className="max-w-7xl mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-stretch">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={`${benefit.title}-${index}`}
                className="bg-white relative rounded-2xl border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full blur-3xl opacity-30" />
                <div className="relative z-10 flex flex-col flex-grow items-center text-center px-6 py-8">
                  <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center shadow-sm mb-4">
                    <Icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="mt-3 text-gray-600">{benefit.description}</p>
                </div>
                <div className={`${benefit.accent} h-12 w-full mt-auto`} />
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        className="py-8 pb-16 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/get-started"
          className="bg-red-500 text-white px-10 py-4 rounded-full text-lg hover:bg-red-600 transition"
        >
          Get Started
        </Link>
      </motion.section>

      <Footer />
    </div>
  );
}
