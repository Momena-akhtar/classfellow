import LandingHeader from "@/components/landing-header";
import FeaturesSection from "@/components/features-section";
import HowItWorksSection from "@/components/how-it-works";
import Footer from "@/components/footer";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <Hero />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />      
    </div>
  );
}
