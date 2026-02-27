"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Instagram, Linkedin, Stethoscope } from "lucide-react"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"]
})

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

const visibleDesktop = 3

export default function ConsultantsCarousel() {
  const [current, setCurrent] = useState(0)
  const autoRef = useRef<NodeJS.Timeout | null>(null)
  const pauseRef = useRef<NodeJS.Timeout | null>(null)

  const extendedDoctors = [...doctors, ...doctors.slice(0, visibleDesktop)]

  const startAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setCurrent(prev => prev + 1)
    }, 4000)
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
    setCurrent(prev => prev - 1)
  }

  useEffect(() => {
    startAuto()
    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
    }
  }, [])

  useEffect(() => {
    if (current === doctors.length) {
      setTimeout(() => {
        setCurrent(0)
      }, 500)
    }
    if (current < 0) {
      setTimeout(() => {
        setCurrent(doctors.length - 1)
      }, 500)
    }
  }, [current, doctors.length]) // Add doctors.length to dependency array

  return (
    <section className="py-16 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-gray-900">Our </span>
            <span className="text-red-600">Consultants</span>
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${current * (100 / (window.innerWidth >= 1024 ? visibleDesktop : 1))}%)`
              }}
            >
              {extendedDoctors.map((doc, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/3 shrink-0 px-4"
                  style={{
                    width: `${100 / (window.innerWidth >= 1024 ? visibleDesktop : 1)}%`
                  }}
                >
                  <div className="bg-white rounded-3xl shadow-xl p-6 mx-auto max-w-sm flex flex-col h-[520px]">

                    {/* IMAGE */}
                    <div className="relative w-full h-72 rounded-2xl overflow-hidden">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col flex-1 justify-between text-center mt-4">

                      <div>
                        <div className="flex items-center justify-center gap-2">
                          <Stethoscope className="text-red-600 w-5 h-5" />
                          <h3 className={`${playfair.className} text-xl font-bold text-gray-900`}>
                            {doc.name}
                          </h3>
                        </div>

                        <p className="text-blue-600 font-semibold text-sm mt-2">
                          {doc.title}
                        </p>

                        <p className="text-gray-600 text-sm mt-2 min-h-[48px]">
                          {doc.qualification}
                        </p>
                      </div>

                      <div>
                        <p className="text-red-600 font-semibold mt-3">
                          {doc.experience}
                        </p>

                        <div className="flex justify-center gap-4 mt-4">

                          <a
                            href={doc.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-3 rounded-full shadow-md hover:scale-110 transition"
                          >
                            <Instagram className="text-white w-5 h-5" />
                          </a>

                          <a
                            href={doc.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#0A66C2] p-3 rounded-full shadow-md hover:scale-110 transition"
                          >
                            <Linkedin className="text-white w-5 h-5" />
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
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-3"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-3"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}