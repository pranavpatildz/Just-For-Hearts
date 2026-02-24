import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import Benefits from "@/components/public/Benefits";
import ComparisonSection from "@/components/public/ComparisonSection";
import Programs from "@/components/public/Programs";
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
      <main className="max-w-7xl mx-auto px-6 md:px-10">
        <Hero />
        <ComparisonSection />
        <Benefits />
        <Programs />
        <ComparisonTable />
        <Experts />
        <Consultants />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
