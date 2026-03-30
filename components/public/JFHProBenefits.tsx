import {
  Users,
  MessageCircle,
  Clock,
  BookOpen,
  HeartPulse,
  CheckCircle
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function JFHProBenefits() {
  const benefitsData = [
    {
      icon: Users,
      color: "text-teal-600",
      heading: "Team Support",
      description: "A dedicated team guiding your fitness, nutrition, and recovery to help you achieve your health goals.",
    },
    {
      icon: MessageCircle,
      color: "text-teal-500",
      heading: "Chat Support",
      description: "Join our ongoing group access to stay motivated and informed, with experts always available to answer your questions.",
    },
    {
      icon: Clock,
      color: "text-teal-400",
      heading: "Duration",
      description: "This 3 to 12 months program helps you progress at your own pace with ongoing guidance and support.",
    },
    {
      icon: BookOpen,
      color: "text-teal-500",
      heading: "Education & Workshop",
      description: "Get daily messages, task tracking, and reminders, along with workshops to keep you motivated and on track.",
    },
    {
      icon: HeartPulse,
      color: "text-teal-600",
      heading: "Best For",
      description: "Best for managing diabetes, heart health, and obesity, while creating lasting healthy habits.",
    },
    {
      icon: CheckCircle,
      color: "text-teal-400",
      heading: "Follow-ups",
      description: "Continuous follow-ups keep you accountable and on track throughout your journey.",
    },
  ];

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-[#F8FAFC] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal delay={0.2}>
          <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            <span className="text-teal-600">JFH Pro</span>{" "}
            <span className="text-slate-900">Benefits</span>
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {benefitsData.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Reveal key={index} delay={index * 0.1}>
                  <div
                    className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl md:min-h-[220px] md:p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                      <IconComponent className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 md:text-xl">
                      {benefit.heading}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                      {benefit.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
