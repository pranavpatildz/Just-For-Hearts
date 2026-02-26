import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import Reveal from "@/components/ui/Reveal";
import Benefits from "@/components/public/Benefits";
import ComparisonSection from "@/components/public/ComparisonSection";
import Programs from "@/components/public/Programs";
import JFHProBenefits from "@/components/public/JFHProBenefits";
import MeetExperts from "@/components/public/MeetExperts";

import ComparisonTable from "@/components/public/ComparisonTable";
import Experts from "@/components/public/Experts";
import Consultants from "@/components/public/Consultants";
import Testimonials from "@/components/public/Testimonials";
import FAQ from "@/components/public/FAQ";
import Footer from "@/components/public/Footer";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <main className="w-full max-w-[1400px] xl:max-w-[1500px] 2xl:max-w-[1600px] mx-auto px-4 lg:px-6">
        <Reveal>
          <Hero />
        </Reveal>
        <ComparisonSection />
        <Reveal delay={0.1}>
          <Programs />
        </Reveal>
        <JFHProBenefits />
        <MeetExperts />

        <ComparisonTable />
        <Benefits />
        <Experts />
        <Consultants />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
