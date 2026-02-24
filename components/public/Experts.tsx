import Image from "next/image";
import Link from "next/link";

export default function Experts() {
  const expertData = {
    name: "Dr. Ananya Sharma",
    title: "Lead Cardiologist",
    description: "Dr. Ananya Sharma is a board-certified cardiologist with over 15 years of experience in cardiovascular health. She specializes in non-invasive cardiology and preventative care, dedicated to helping patients achieve optimal heart health through personalized treatment plans and lifestyle modifications.",
    expertise: [
      "Preventative Cardiology",
      "Heart Failure Management",
      "Echocardiography",
      "Cardiac Rehabilitation"
    ],
    image: "/images/expert-ananya.jpg", // Placeholder image
    buttonText: "Connect with Dr. Sharma",
    buttonLink: "/contact-expert"
  };

  return (
    <section className="py-24 max-w-[1280px] mx-auto px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Meet Our Experts</h2>
        <p className="mt-4 text-lg text-gray-600">Guidance from the best in cardiac care.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white rounded-2xl shadow-lg p-8">
        {/* Left Section: Image */}
        <div className="flex justify-center md:justify-start">
          <Image
            src={expertData.image}
            alt={expertData.name}
            width={400} // Adjust as needed
            height={400} // Adjust as needed
            className="rounded-2xl shadow-lg object-cover w-full h-auto max-h-[400px]"
          />
        </div>

        {/* Right Section: Content */}
        <div className="space-y-6 text-center md:text-left">
          <h3 className="text-3xl font-bold text-gray-900">{expertData.name}</h3>
          <p className="text-xl font-semibold text-red-600">{expertData.title}</p>
          <p className="text-gray-700 leading-relaxed">{expertData.description}</p>
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-gray-800">Areas of Expertise:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {expertData.expertise.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <Link
              href={expertData.buttonLink}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              {expertData.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}