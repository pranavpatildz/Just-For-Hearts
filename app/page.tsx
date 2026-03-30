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
    <div className="bg-slate-50">
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] space-y-2 px-4 md:px-8 lg:px-16">
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
