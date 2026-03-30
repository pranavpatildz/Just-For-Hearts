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
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#F8FAFC] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-16">
        <Reveal>
          <div className="mb-10 text-center md:mb-16">
            <h2 className="text-3xl font-semibold md:text-5xl">
              <span className="text-teal-600">Meet</span>{" "}
              <span className="text-gray-900">the</span>{" "}
              <span className="text-teal-600">Experts</span>
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              When you choose JFH, you donâ€™t just get an expert, you get a team
              that has helped thousands live better.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <Reveal>
            <div className="relative h-[260px] w-full overflow-hidden rounded-2xl shadow-md md:h-[380px]">
              <Image
                src="/images/Experts.jpg"
                alt="JFH Experts Team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xl font-medium text-gray-900 md:text-2xl">
                  Trusted Legacy
                </h3>
                <div className="mb-6 h-1 w-12 rounded-full bg-teal-600"></div>

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
                    grid grid-cols-2 gap-x-4 gap-y-3
                    text-slate-600 text-sm leading-relaxed
                    md:flex md:flex-col md:space-y-3 md:text-lg
                  "
                >
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex items-start gap-2"
                  >
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
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
                    <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
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
                    <Video className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
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
                    <Users className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                    <span>
                      <Counter value={350} suffix="k+" />{" "}
                      Youtube subscribers
                    </span>
                  </motion.li>
                </motion.ul>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-medium text-gray-900 md:text-2xl">
                  Multidisciplinary Team
                </h3>
                <div className="mb-6 h-1 w-12 rounded-full bg-teal-500"></div>

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
                    grid grid-cols-2 gap-x-4 gap-y-3
                    text-slate-600 text-sm leading-relaxed
                    md:flex md:flex-col md:space-y-3 md:text-lg
                  "
                >
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex items-start gap-2"
                  >
                    <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                    General Physicians
                  </motion.li>
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex items-start gap-2"
                  >
                    <HeartPulse className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                    Cardiac Rehab Experts
                  </motion.li>
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex items-start gap-2"
                  >
                    <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                    Dietitians, Physios, Educators
                  </motion.li>
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex items-start gap-2"
                  >
                    <Leaf className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                    Ayurveda, Yoga, Mindfulness
                  </motion.li>
                </motion.ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 text-center md:mt-16">
            <button className="primary-btn px-6 py-3 text-sm font-medium md:px-10 md:py-4 md:text-lg">
              Explore JFH Programs
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
