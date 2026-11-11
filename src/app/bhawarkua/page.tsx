import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import BranchLandingTemplate from "@/components/pages/BranchLandingTemplate";

export const metadata: Metadata = {
  title: "Computer Classes in Bhawarkua, Indore | The Prime Step",
  description:
    "Top IT training & coding classes in Bhawarkua, Indore (near Holkar Science College & Indrapuri). Practical programming in Python, Java, C/C++, Web Development & Tally GST.",
  alternates: {
    canonical: `${SITE.url}/bhawarkua`,
  },
  openGraph: {
    title: "Computer Classes in Bhawarkua, Indore | The Prime Step",
    description:
      "Top IT training & coding classes in Bhawarkua, Indore. Practical lab-based programming for college students and job seekers.",
    url: `${SITE.url}/bhawarkua`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function BhawarkuaBranchPage() {
  return (
    <BranchLandingTemplate
      branchKey="Bhawarkua"
      slug="bhawarkua"
      headline="Computer Classes & Coding Institute in Bhawarkua, Indore"
      lead="The student tech hub of The Prime Step, situated right on Bhawarkua Main Road in Indrapuri. Tailored for college students and competitive job seekers looking for hands-on software development and placement readiness."
      description="Located directly above Canara Bank at Indrapuri, within walking distance from Holkar Science College, GACC, and DAVV campus. Our Bhawarkua campus features high-density programming labs, quiet coding zones, and flexible early morning and evening batches designed specifically around college schedules."
      googleMapsUrl="https://maps.google.com/?q=The+Prime+Step+Bhawarkua+Indore"
      nearbyAreas={[
        "Bhawarkua Square",
        "Indrapuri Colony",
        "Holkar College Road",
        "Tower Square",
        "Bholaram Ustad Marg",
        "Vishnupuri",
        "Navlakha",
        "Sapna Sangeeta",
        "Rajiv Gandhi Square",
      ]}
      reviews={[
        {
          author: "Ankit Joshi",
          role: "B.Tech Student, Holkar College",
          text: "Very convenient location in Bhawarkua. I took C++ and Java during my 2nd year. The doubt sessions helped me crack college campus placements easily.",
          rating: 5,
        },
        {
          author: "Sneha Patidar",
          role: "Full Stack Developer placed in Indore IT Park",
          text: "The mentors in Bhawarkua are extremely supportive. They treat you like junior engineers in an office rather than regular classroom students.",
          rating: 5,
        },
        {
          author: "Vikas Malviya",
          role: "Web Design & MERN Stack Alumnus",
          text: "Affordable fee installment structure and genuine placement drives. Highly recommended for students around Bhawarkua.",
          rating: 5,
        },
      ]}
    />
  );
}

