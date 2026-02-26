"use client"

import Image from "next/image"
import Reveal from "@/components/ui/Reveal"
import {
  ShieldCheck,
  Calendar,
  Video,
  Users,
  Stethoscope,
  HeartPulse,
  GraduationCap,
  Leaf
} from "lucide-react"
import { motion } from "framer-motion"
import Counter from "@/components/ui/Counter"

export default function MeetExperts() {
  return (
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] 
    py-12 md:py-20 
    bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">

      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <Reveal>
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-red-500">Meet</span>{" "}
              <span className="text-gray-900">the</span>{" "}
              <span className="text-red-500">Experts</span>
            </h2>

            <p className="mt-4 text-gray-600 text-sm md:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
              When you choose JFH, you don’t just get an expert, you get a team
              that has helped thousands live better.
            </p>
          </div>
        </Reveal>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* Image */}
          <Reveal>
            <div className="relative w-full h-[260px] md:h-[380px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/Experts.jpg"
                alt="JFH Experts Team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          {/* Text Content */}
          <Reveal delay={0.2}>
            <div className="space-y-8">

              {/* Trusted Legacy */}
              <div>
                <h3 className="text-lg md:text-3xl font-bold text-gray-900 mb-4">
                  Trusted Legacy
                </h3>
                <div className="w-12 h-1 bg-red-500 rounded-full mb-6"></div>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.15
                      }
                    }
                  }}
                  className="
                    grid grid-cols-2 gap-y-3 gap-x-4
                    md:flex md:flex-col md:space-y-3
                    text-gray-600 text-sm md:text-lg leading-relaxed
                  "
                >
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex items-start gap-2"
                  >
                    <ShieldCheck className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>
                      <Counter value={25} suffix="+" />{" "}
                      years of preventive care
                    </span>
                  </motion.li>
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex items-start gap-2"
                  >
                    <Calendar className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>
                      <Counter value={10000} suffix="+" />{" "}
                      wellness events
                    </span>
                  </motion.li>
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex items-start gap-2"
                  >
                    <Video className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>
                      <Counter value={50000} suffix="+" />{" "}
                      teleconsults
                    </span>
                  </motion.li>
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex items-start gap-2"
                  >
                    <Users className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>
                      <Counter value={350} suffix="k+" />{" "}
                      Youtube subscribers
                    </span>
                  </motion.li>
                </motion.ul>
              </div>

              {/* Multidisciplinary Team */}
              <div>
                <h3 className="text-lg md:text-3xl font-bold text-gray-900 mb-4">
                  Multidisciplinary Team
                </h3>
                <div className="w-12 h-1 bg-red-500 rounded-full mb-6"></div>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.15
                      }
                    }
                  }}
                  className="
                    grid grid-cols-2 gap-y-3 gap-x-4
                    md:flex md:flex-col md:space-y-3
                    text-gray-600 text-sm md:text-lg leading-relaxed
                  "
                >
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex items-start gap-2"
                  >
                    <Stethoscope className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    General Physicians
                  </motion.li>
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex items-start gap-2"
                  >
                    <HeartPulse className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    Cardiac Rehab Experts
                  </motion.li>
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex items-start gap-2"
                  >
                    <GraduationCap className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    Dietitians, Physios, Educators
                  </motion.li>
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex items-start gap-2"
                  >
                    <Leaf className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    Ayurveda, Yoga, Mindfulness
                  </motion.li>
                </motion.ul>
              </div>

            </div>
          </Reveal>

        </div>

        {/* CTA Button */}
        <Reveal delay={0.3}>
          <div className="text-center mt-10 md:mt-16">
            <button className="bg-red-500 hover:bg-red-600 text-white 
            px-6 md:px-10 py-3 md:py-4 
            rounded-full text-sm md:text-lg font-medium 
            transition-all duration-300 shadow-md hover:shadow-lg">
              Explore JFH Programs
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  )
}