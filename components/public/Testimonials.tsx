export default function Testimonials() {
  const testimonialsData = [
    {
      quote: "My life transformed after joining Just For Hearts. The personalized guidance helped me regain my health and confidence. Highly recommend!",
      author: "Priya Sharma",
      role: "Cardiac Patient",
      rating: 5,
    },
    {
      quote: "The expert advice on diabetes management was invaluable. My blood sugar levels are stable, and I feel more energetic than ever.",
      author: "Rajesh Kumar",
      role: "Diabetes Patient",
      rating: 4,
    },
    {
      quote: "Achieved my weight loss goals with the sustainable plans from JFH. It's not just about losing weight, but adopting a healthier lifestyle.",
      author: "Smita Patel",
      role: "Obesity Management Client",
      rating: 5,
    },
  ];

  const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 ${filled ? "text-yellow-400" : "text-gray-300"}`} // Slightly larger stars
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Real People, Real Recoveries</h2>
          <p className="mt-4 text-lg text-gray-600">Hear what our patients have to say about their journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-8 space-y-4 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < testimonial.rating} />
                ))}
              </div>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}