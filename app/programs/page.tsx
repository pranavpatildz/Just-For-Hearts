import Footer from "@/components/public/Footer";
import Navbar from "@/components/public/Navbar";
import Programs from "@/components/public/Programs";
import Reveal from "@/components/ui/Reveal";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] px-4 pt-20 md:px-8 lg:px-16">
        <h1 className="mb-10 text-center text-3xl font-bold md:text-4xl">
          <span className="text-red-500">JFH</span> Programs
        </h1>
        <Reveal>
          <Programs showHeading={false} />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
