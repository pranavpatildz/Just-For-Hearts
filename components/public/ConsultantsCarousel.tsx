"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Instagram, Linkedin, Stethoscope } from "lucide-react"

const doctors = [
  {
    name: "Dr. Ravindra L. Kulkarni",
    title: "Sr Consultant Physician & Cardiologist",
    qualification: "MD DNB FSCAI, Fellowship in Interventional Cardiology – Italy",
    experience: "25+ Years Experience",
    image: "/images/dr-ravindra-l-kulkarni.jpg",
    instagram: "https://www.instagram.com/ravindra.l.kulkarni.1?igsh=MWt4ZmQ4aTZqY3hlaw==",
    linkedin: "https://in.linkedin.com/in/drravindrakulkarni",
  },
  {
    name: "Divya Sanglikar",
    title: "Clinical Dietitian & Sports Nutritionist",
    qualification: "M.Sc. Dietetics",
    experience: "18+ Years Experience",
    image: "/images/divya-sanglikar.jpg",
    instagram: "https://www.instagram.com/divyasanglikar?igsh=MTM4aWIxeW91dWY2bA==",
    linkedin: "https://www.linkedin.com/in/divya-sanglikar-28444219",
  },
  {
    name: "Dr. Manisha R. Deokar",
    title: "Consultant – Preventive Cardiology & Echocardiographer",
    qualification: "BAMS, MD (sch), DYA",
    experience: "15+ Years Experience",
    image: "/images/dr-manisha-r-deokar.jpg",
    instagram: "https://www.instagram.com/manishardeokar?igsh=MWUwandsZ3hpNjc0eQ==",
    linkedin: "https://www.instagram.com/manishardeokar?igsh=MWUwandsZ3hpNjc0eQ==",
  },
  {
    name: "Dr. Tejas Limaye",
    title: "Diabetes Educator & Nutritionist",
    qualification: "M.Sc., Ph.D., R.D., Clinical Nutritionist",
    experience: "15+ Years Experience",
    image: "/images/dr-tejas-limaye.jpg",
    instagram: "https://www.instagram.com/dr_tejas_limaye?igsh=MTkxc3d1eHBlbXJkOQ==",
    linkedin: "https://www.linkedin.com/in/tejas-limaye-5b749a15",
  },
  {
    name: "Neha Vishal Katekar",
    title: "Weight Loss & Lifestyle Disease Expert",
    qualification: "M.Sc (Clinical Nutrition), CDE",
    experience: "15+ Years Experience",
    image: "/images/neha-vishal-katekar.jpg",
    instagram: "https://www.instagram.com/b_healthy_wth_neha?igsh=YjRxbHhoZnBqMGE0",
    linkedin: "https://www.linkedin.com/in/neha-katekar-b8877a53",
  },
  {
    name: "Tejashree Vadgaonkar",
    title: "Diet Planning & Habit Development Expert",
    qualification: "M.Sc Dietetics, Certified Diabetes Educator",
    experience: "14+ Years Experience",
    image: "/images/tejashree-vadgaonkar.jpg",
    instagram: "https://www.instagram.com/heal_the_holistic_way?igsh=N2luMTJhOWhyeDRw",
    linkedin: "https://www.linkedin.com/in/tejashree-vadgaonkar-4507bb62",
  },
  {
    name: "Dr. Snehal Vankudre",
    title: "Cardiovascular Prevention Specialist",
    qualification: "PhD in Cardiovascular Prevention",
    experience: "10+ Years Experience",
    image: "/images/dr-snehal-vankudre.jpg",
    instagram: "https://www.instagram.com/drsnehalhearthhealthcoach?igsh=MXU4cTMzMGhrNDNuYQ==",
    linkedin: "https://www.linkedin.com/in/dr-snehal-vankudre-pakhare-3147b242",
  },
  {
    name: "Dr. Kirti Kakade",
    title: "Ayurveda Expert & Nutritionist",
    qualification: "BAMS, DNHE",
    experience: "15+ Years Experience",
    image: "/images/dr-kirti-kakade.jpg",
    instagram: "https://www.instagram.com/drkir_tikakade?igsh=d3dzOHh5dG1yNjU=",
    linkedin: "https://www.linkedin.com/in/kirti-ghavle-42564845",
  },
  {
    name: "Ishwari Hatolkar",
    title: "Content Creator",
    qualification: "Bachelors in Pharmacy",
    experience: "3+ Years Experience",
    image: "/images/ishwari-hatolkar.jpg",
    instagram: "https://www.instagram.com/pharmacy_chya_bai?igsh=cW5zcno1c3JmOGZt",
    linkedin: "https://www.linkedin.com/in/ishwari-sarang-hatolkar-2a8896386",
  },
  {
    name: "Dr. Tanaji Gaikwad",
    title: "Cardiology Coordinator",
    qualification: "15+ Years Experience",
    experience: "15+ Years Experience",
    image: "/images/dr-tanaji-gaikwad.jpg",
    instagram: "https://www.instagram.com/tanajigaikwad830?igsh=MWp4bWlhNXJ0eG51dw==",
    linkedin: "https://www.linkedin.com/in/tanaji-gaikwad-5192951b2",
  },
  {
    name: "Archana Sonawane",
    title: "Physician Assistant",
    qualification: "15+ Years Experience",
    image: "/images/archana-sonawane.jpg",
    instagram: "https://www.instagram.com/archana1499?igsh=MXE3ZDRqMThhZW8zbA==",
    linkedin: "https://www.linkedin.com/in/archana-sonwane-326b16b0",
  }
]



export default function ConsultantsCarousel() {
  const [current, setCurrent] = useState(0)
  const [visibleCards, setVisibleCards] = useState(1)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true)
  const autoRef = useRef<NodeJS.Timeout | null>(null)
  const pauseRef = useRef<NodeJS.Timeout | null>(null)

  const extendedDoctors = [
    ...doctors,
    ...doctors.slice(0, visibleCards)
  ]

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(window.innerWidth >= 1024 ? 3 : 1)
    }

    updateVisibleCards()
    window.addEventListener("resize", updateVisibleCards)
    return () => window.removeEventListener("resize", updateVisibleCards)
  }, [])

  useEffect(() => {
    setCurrent(0)
  }, [visibleCards])

  const startAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setCurrent(prev => prev + 1)
    }, 3000)
  }

  const pauseAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current)
    if (pauseRef.current) clearTimeout(pauseRef.current)

    pauseRef.current = setTimeout(() => {
      startAuto()
    }, 10000)
  }

  const next = () => {
    pauseAuto()
    setCurrent(prev => prev + 1)
  }

  const prev = () => {
    pauseAuto()
    setCurrent(prev => (prev === 0 ? doctors.length - 1 : prev - 1))
  }

  useEffect(() => {
    startAuto()
    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
      if (pauseRef.current) clearTimeout(pauseRef.current)
    }
  }, [])

  const handleTransitionEnd = () => {
    if (current >= doctors.length) {
      setIsTransitionEnabled(false)
      setCurrent(0)
    }
  }

  useEffect(() => {
    if (!isTransitionEnabled) {
      requestAnimationFrame(() => {
        setIsTransitionEnabled(true)
      })
    }
  }, [isTransitionEnabled])

  return (
    <section className="overflow-hidden bg-slate-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            <span className="text-slate-900">Our </span>
            <span className="text-teal-600">Consultants</span>
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className={`flex duration-500 ease-in-out ${isTransitionEnabled ? "transition-transform" : ""}`}
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(-${current * (100 / visibleCards)}%)`
              }}
            >
              {extendedDoctors.map((doc, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-2 sm:px-3 lg:w-1/3"
                >
                  <div className="mx-auto flex h-[520px] max-w-sm flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl lg:mx-0 lg:max-w-none md:p-6">
                    <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-slate-100">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="mt-4 flex flex-1 flex-col justify-between text-center">
                      <div>
                        <div className="flex items-center justify-center gap-2">
                          <Stethoscope className="h-5 w-5 text-teal-600" />
                          <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                            {doc.name}
                          </h3>
                        </div>

                        <p className="mt-2 text-sm font-semibold text-teal-500">
                          {doc.title}
                        </p>

                        <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-slate-600">
                          {doc.qualification}
                        </p>
                      </div>

                      <div>
                        <p className="mt-3 font-semibold text-teal-600">
                          {doc.experience}
                        </p>

                        <div className="mt-4 flex justify-center gap-[10px]">

                          <a
                            href={doc.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#0f766e] text-white shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-[#115e59]"
                          >
                            <Instagram className="h-[18px] w-[18px] text-white" />
                          </a>

                          <a
                            href={doc.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#0f766e] text-white shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-[#115e59]"
                          >
                            <Linkedin className="h-[18px] w-[18px] text-white" />
                          </a>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-1 top-1/2 rounded-full border border-slate-200 bg-white p-3 text-teal-600 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg md:left-0"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-1 top-1/2 rounded-full border border-slate-200 bg-white p-3 text-teal-600 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg md:right-0"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}
