"use client";

export default function Hero() {
  return (
    <section className="w-full bg-white px-4 py-16 text-center">
      <h1 className="text-3xl font-bold leading-tight text-[#0f172a] md:text-5xl">
        Ready to Take Charge of your{" "}
        <span className="text-red-500">Health?</span>
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 md:text-base">
        Join 40,000+ people already using Just For Hearts for diabetes, heart,
        and obesity care - all from the comfort of home.
      </p>

      <div className="group relative mt-8 flex justify-center">
        <div className="flex w-full max-w-2xl items-center rounded-full border border-gray-200 bg-white px-4 py-2 shadow-md transition hover:shadow-lg">
          <div className="mr-3 rounded-full bg-red-100 p-2 text-red-500">
            💬
          </div>

          <input
            type="text"
            placeholder="Ask our Assistant: How can Just For Hearts help you today?"
            className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
            disabled
          />

          <button className="rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600">
            Search
          </button>
        </div>

        <div className="absolute top-full mt-3 hidden group-hover:block">
          <div className="rounded-lg bg-[#0f172a] px-4 py-2 text-xs text-white shadow-lg">
            Our AI Assistant is training! This feature will be live soon.
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-2 text-xl text-red-400">❤️</div>
          <h3 className="text-sm font-semibold text-[#0f172a]">
            Healthy Life
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Expert 20-min online video consultation.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-2 text-xl text-red-400">📄</div>
          <h3 className="text-sm font-semibold text-[#0f172a]">
            Second Opinion
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Get certainty on your diagnosis & treatment.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-2 text-xl text-red-400">📈</div>
          <h3 className="text-sm font-semibold text-[#0f172a]">
            Chronic Care
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            360° support for Diabetes & Heart Health.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-2 text-xl text-red-400">📋</div>
          <h3 className="text-sm font-semibold text-[#0f172a]">
            Personalized Plans
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            3 months of aggressive reversal programs.
          </p>
        </div>
      </div>
    </section>
  );
}
