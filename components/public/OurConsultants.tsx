"use client"

import Image from "next/image"
import { Instagram, Linkedin } from "lucide-react"

const consultants = [
  {
    image: "/images/consultant-ravindra.jpg",
    name: "Dr Ravindra L Kulkarni",
    role: "Sr Consultant Physician & Cardiologist",
    degree: "MD DNB FSCAI, Fellowship in Interventional Cardiology – Italy",
    experience: "25+ Years Experience",
    instagram: "#",
    linkedin: "#",
  },
  {
    image: "/images/consultant-divya.jpg",
    name: "Divya Sanglikar",
    role: "Clinical Dietitian & Sports Nutritionist",
    degree: "M.Sc. Dietetics",
    experience: "18+ Years Experience",
    instagram: "#",
    linkedin: "#",
  },
  {
    image: "/images/consultant-manisha.jpg",
    name: "Dr Manisha R Deokar",
    role: "Consultant – Preventive Cardiology & Echocardiographer",
    degree: "BAMS, MD (sch), DYA, Ecocardiographer",
    experience: "15+ Years Experience",
    instagram: "#",
    linkedin: "#",
  },
  {
    image: "/images/consultant-tejas.jpg",
    name: "Dr Tejas Limaye",
    role: "Diabetes Educator & Nutritionist",
    degree: "M.Sc., Ph.D., R.D., Clinical Nutritionist, Diabetes Educator",
    experience: "15+ Years Experience",
    instagram: "#",
    linkedin: "#",
  },
  {
    image: "/images/consultant-neha.jpg",
    name: "Neha Vishal Katekar",
    role: "Weight Loss, Diabetes & Lifestyle Disease Management Expert",
    degree: "M.Sc (Clinical Nutrition), CDE (Certified Diabetes Educator)",
    experience: "15+ Years Experience",
    instagram: "#",
    linkedin: "#",
  },
  {
    image: "/images/consultant-tejashree.jpg",
    name: "Tejashree Vadgaonkar",
    role: "Diet Planning, Habit Development Expert",
    degree: "M.Sc Dietetics, Certified Diabetes Educator",
    experience: "14+ Years Experience",
    instagram: "#",
    linkedin: "#",
  },
  {
    image: "/images/consultant-snehal.jpg",
    name: "Dr Snehal Vankudre",
    role: "Cardiovascular Prevention and Rehabilitation",
    degree: "PhD in Cardiovascular Prevention and Rehabilitation",
    experience: "10+ Years Experience",
    instagram: "#",
    linkedin: "#",
  },
  {
    image: "/images/consultant-kirti.jpg",
    name: "Dr Kirti Kakade",
    role: "Ayurveda Expert & Nutritionist",
    degree: "BAMS, DNHE",
    experience: "15+ Years Experience",
    instagram: "#",
    linkedin: "#",
  },
  {
    image: "/images/consultant-ishwari.jpg",
    name: "Ishwari Hatolkar",
    role: "Content Creator",
    degree: "Bachelors in Pharmacy",
    experience: "3+ Year Experience",
    instagram: "#",
    linkedin: "#",
  },
  {
    image: "/images/consultant-tanaji.jpg",
    name: "Dr Tanaji Gaikwad",
    role: "Cardiology Coordinator",
    degree: "",
    experience: "15+ Years Experience",
    instagram: "#",
    linkedin: "#",
  },
  {
    image: "/images/consultant-archana.jpg",
    name: "Archana Sonawane",
    role: "Physician Assistant",
    degree: "",
    experience: "15+ Years Experience",
    instagram: "#",
    linkedin: "#",
  },
]

export default function OurConsultants() {
  const extendedConsultants = [...consultants, ...consultants, ...consultants]

  return (
    <section className="w-full py-20 bg-gradient-to-br from-blue-50 via-slate-100 to-green-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-gray-900">Our</span>{" "}
            <span className="text-red-600">Consultants</span>
          </h2>
        </div>

        <div
          className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]"
        >
          <ul className="flex items-stretch justify-center md:justify-start [&_li]:mx-3 animate-infinite-scroll group-hover:paused">
            {extendedConsultants.map((doc, index) => (
              <li
                key={index}
                className="flex-shrink-0 w-1/2 md:w-1/3"
                style={{ maxWidth: "380px" }}
              >
                <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center h-full flex flex-col">
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                      {doc.name}
                    </h3>

                    <p className="text-blue-700 font-semibold text-sm md:text-base mt-2">
                      {doc.role}
                    </p>

                    {doc.degree && (
                      <p className="text-gray-700 text-sm md:text-base mt-2">
                        {doc.degree}
                      </p>
                    )}

                    <p className="text-red-600 font-semibold text-sm md:text-base mt-3">
                      {doc.experience}
                    </p>
                  </div>


                  <div className="flex justify-center gap-5 mt-4 pt-4 border-t">
                    <a href={doc.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-5 h-5 text-gray-800 hover:text-pink-600 transition" />
                    </a>
                    <a href={doc.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5 text-gray-800 hover:text-blue-700 transition" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
