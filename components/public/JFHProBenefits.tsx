import {
  Users,
  MessageCircle,
  Clock,
  BookOpen,
  HeartPulse,
  CheckCircle
} from "lucide-react";

export default function JFHProBenefits() {
  const benefitsData = [
    {
      icon: Users,
      color: "text-red-500",
      heading: "Team Support",
      description: "A dedicated team guiding your fitness, nutrition, and recovery to help you achieve your health goals.",
    },
    {
      icon: MessageCircle,
      color: "text-blue-500",
      heading: "Chat Support",
      description: "Join our ongoing group access to stay motivated and informed, with experts always available to answer your questions.",
    },
    {
      icon: Clock,
      color: "text-amber-500",
      heading: "Duration",
      description: "This 3 to 12 months program helps you progress at your own pace with ongoing guidance and support.",
    },
    {
      icon: BookOpen,
      color: "text-indigo-500",
      heading: "Education & Workshop",
      description: "Get daily messages, task tracking, and reminders, along with workshops to keep you motivated and on track.",
    },
    {
      icon: HeartPulse,
      color: "text-pink-500",
      heading: "Best For",
      description: "Best for managing diabetes, heart health, and obesity, while creating lasting healthy habits.",
    },
    {
      icon: CheckCircle,
      color: "text-green-500",
      heading: "Follow-ups",
      description: "Continuous follow-ups keep you accountable and on track throughout your journey.",
    },
  ];

  return (
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-10 md:py-16 bg-gradient-to-r from-blue-100 via-blue-200 to-green-200">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          <span className="text-red-500">JFH Pro</span>{' '}
          <span className="text-gray-900">Benefits</span>
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {benefitsData.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-4 md:p-8 min-h-[150px] md:min-h-[220px] flex flex-col justify-center items-center text-center hover:shadow-lg transition-all duration-300 border border-gray-200 gap-1"
              >
                <div className="text-2xl">
                  <IconComponent className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <h3 className="font-semibold text-sm md:text-lg text-gray-800">
                  {benefit.heading}
                </h3>
                <p className="text-gray-600 text-xs md:text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
