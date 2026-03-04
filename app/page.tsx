import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import Reveal from "@/components/ui/Reveal";
import ComparisonSection from "@/components/public/ComparisonSection";
import Programs from "@/components/public/Programs";
import JFHProBenefits from "@/components/public/JFHProBenefits";
import MeetExperts from "@/components/public/MeetExperts";
import ConsultantsCarousel from "@/components/public/ConsultantsCarousel";
import PatientFeedbackSection from "@/components/public/PatientFeedbackSection";
import FAQSection from "@/components/public/FAQSection";
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
        <ConsultantsCarousel />
        <PatientFeedbackSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
