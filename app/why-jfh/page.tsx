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
    cardBg: "bg-gradient-to-b from-red-50 to-white",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    strip: "bg-red-300",
    icon: Stethoscope,
  },
  {
    title: "A whole Team Behind Every Patient",
    description:
      "Not just one coach - a coordinated team of experts guides your journey across diet, exercise, stress, and medications",
    cardBg: "bg-gradient-to-b from-green-50 to-white",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    strip: "bg-green-300",
    icon: Users,
  },
  {
    title: "Remote Monitoring That Works",
    description:
      "Real-time tracking of vitals, daily habits & red flags - no hospital queues, just smart follow-ups",
    cardBg: "bg-gradient-to-b from-blue-50 to-white",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    strip: "bg-blue-300",
    icon: HeartPulse,
  },
  {
    title: "Proven, Trusted, and Growing",
    description:
      "50,000+ patients empowered | 10,000+ health events delivered | Lakhs of consultations and counting",
    cardBg: "bg-gradient-to-b from-red-50 to-white",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    strip: "bg-red-300",
    icon: TrendingUp,
  },
  {
    title: "Personalized Heart Health Plans",
    description:
      "Customized care plans tailored to your heart condition, lifestyle, and medical history. Our experts continuously monitor and adjust your plan for better outcomes.",
    cardBg: "bg-gradient-to-b from-green-50 to-white",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    strip: "bg-green-300",
    icon: ClipboardCheck,
  },
  {
    title: "Continuous 1-on-1 Human Support",
    description:
      "Coaches reach out with weekly check-ins, personalized feedback & real conversations - no bots, no templates",
    cardBg: "bg-gradient-to-b from-blue-50 to-white",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    strip: "bg-blue-300",
    icon: MessageCircle,
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
                className={`relative rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 p-8 text-center flex flex-col items-center min-h-[250px] h-full justify-between overflow-hidden ${benefit.cardBg}`}
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-2 rounded-b-2xl ${benefit.strip}`} />
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
