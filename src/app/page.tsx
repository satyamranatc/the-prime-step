import { FAQS, SITE } from "@/lib/content";
import Experience from "@/components/features/Experience";
import Hero from "@/components/features/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import CourseCatalog from "@/components/home/CourseCatalog";
import WhyUs from "@/components/home/WhyUs";
import PopularPrograms from "@/components/home/PopularPrograms";
import StudentProjectsAndProof from "@/components/home/StudentProjectsAndProof";
import TrainingPlacement from "@/components/home/TrainingPlacement";
import Pathways from "@/components/home/Pathways";
import CampusesAndFAQ from "@/components/home/CampusesAndFAQ";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/features/Footer";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "@id": `${SITE.url}/#course-java`,
      name: "Java Full Stack Developer Master Program",
      description:
        "Comprehensive enterprise Java training covering Core Java, Advanced Java, Spring Boot, Microservices, Hibernate, and Full Stack architecture.",
      provider: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "Course",
      "@id": `${SITE.url}/#course-python`,
      name: "Python Full Stack, Data Science & Applied AI",
      description:
        "Practical Python development covering automation, Django, FastAPI, Data Analytics, Pandas, NumPy, Machine Learning, and Generative AI applications.",
      provider: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "Course",
      "@id": `${SITE.url}/#course-mern`,
      name: "MERN Stack Web Development Program",
      description:
        "Full stack JavaScript engineering covering MongoDB, Express.js, React, Node.js, Next.js, REST APIs, and production deployment.",
      provider: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <Experience>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <main>
        <Hero />
        <TrustStrip />
        <CourseCatalog />
        <WhyUs />
        <PopularPrograms />
        <StudentProjectsAndProof />
        <TrainingPlacement />
        <Pathways />
        <CampusesAndFAQ />
        <FinalCTA />
      </main>
      <Footer />
    </Experience>
  );
}
