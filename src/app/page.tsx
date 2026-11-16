import Experience from "@/components/features/Experience";
import Hero from "@/components/features/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import CourseCatalog from "@/components/home/CourseCatalog";
import Pathways from "@/components/home/Pathways";
import WhyUs from "@/components/home/WhyUs";
import Build from "@/components/features/Build";
import PopularPrograms from "@/components/home/PopularPrograms";
import TrainingPlacement from "@/components/home/TrainingPlacement";
import CampusesAndFAQ from "@/components/home/CampusesAndFAQ";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/features/Footer";

export default function Home() {
  return (
    <Experience>
      <main>
        <Hero />
        <TrustStrip />
        <CourseCatalog />
        <Pathways />
        <WhyUs />
        <Build />
        <PopularPrograms />
        <TrainingPlacement />
        <CampusesAndFAQ />
        <FinalCTA />
      </main>
      <Footer />
    </Experience>
  );
}
