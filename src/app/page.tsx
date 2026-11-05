import Experience from "@/components/features/Experience";
import Hero from "@/components/features/Hero";
import Programs from "@/components/features/Programs";
import Learning from "@/components/features/Learning";
import Build from "@/components/features/Build";
import Careers from "@/components/features/Careers";
import NextStep from "@/components/features/NextStep";
import Footer from "@/components/features/Footer";

export default function Home() {
  return (
    <Experience>
      <main>
        <Hero />
        <Programs />
        <Learning />
        <Build />
        <Careers />
        <NextStep />
      </main>
      <Footer />
    </Experience>
  );
}
