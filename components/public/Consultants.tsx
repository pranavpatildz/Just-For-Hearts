"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Consultants() {
  const consultantsData = [
    {
      name: "Dr. Priya Singh",
      specialty: "Dietitian",
      image: "/images/consultant-priya.jpg", // Placeholder image
    },
    {
      name: "Dr. Alok Verma",
      specialty: "Fitness Expert",
      image: "/images/consultant-alok.jpg", // Placeholder image
    },
    {
      name: "Dr. Neha Rao",
      specialty: "Therapist",
      image: "/images/consultant-neha.jpg", // Placeholder image
    },
    {
      name: "Dr. Rohan Gupta",
      specialty: "Nutritionist",
      image: "/images/consultant-rohan.jpg", // Placeholder image
    },
  ];

  return (
    <section className="py-12 bg-gray-50"> {/* Reduced vertical padding */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Our Consultants</h2>
          <p className="mt-4 text-lg text-gray-600">Connect with our team of dedicated health professionals.</p>
        </div>

        <motion.div
          className="flex overflow-x-auto gap-6 pb-4"
          whileTap={{ cursor: "grabbing" }}
        >
          {consultantsData.map((consultant, index) => (
            <motion.div
              key={index}
              className="min-w-[280px] flex-shrink-0 rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center bg-white"
            >
              <Image
                src={consultant.image}
                alt={consultant.name}
                width={150}
                height={150}
                className="rounded-xl shadow-md mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{consultant.name}</h3>
              <p className="text-red-600">{consultant.specialty}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}