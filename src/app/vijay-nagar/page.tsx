import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import BranchLandingTemplate from "@/components/pages/BranchLandingTemplate";

export const metadata: Metadata = {
  title: "Computer Classes in Vijay Nagar, Indore | The Prime Step",
  description:
    "Best IT training and computer coaching in Vijay Nagar, Indore at Shagun Tower (above Apna Sweets). Learn Python, Java, Full Stack, Data Science & Tally with 100% placement assistance.",
  alternates: {
    canonical: `${SITE.url}/vijay-nagar`,
  },
  openGraph: {
    title: "Computer Classes in Vijay Nagar, Indore | The Prime Step",
    description:
      "Best IT training and computer coaching in Vijay Nagar, Indore at Shagun Tower. 100% practical lab training with industry placement assistance.",
    url: `${SITE.url}/vijay-nagar`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function VijayNagarBranchPage() {
  return (
    <BranchLandingTemplate
      branchKey="Vijay Nagar"
      slug="vijay-nagar"
      headline="Computer Classes & IT Training Institute in Vijay Nagar, Indore"
      lead="The flagship head office and technology training hub of The Prime Step. Located conveniently at Vijay Nagar Square, offering industry-aligned practical IT courses with dedicated lab mentorship."
      description="Equipped with multi-floor modern computer labs across Offices 123, 210, and 303 in Shagun Tower. Each workstation is equipped with high-speed development environments, dual monitors for coding practice, and dedicated project mentors available throughout the day. Students enjoy 24/7 lab access for capstone project development."
      googleMapsUrl="https://maps.google.com/?q=The+Prime+Step+Shagun+Tower+Vijay+Nagar+Indore"
      nearbyAreas={[
        "Vijay Nagar Square",
        "Scheme 54",
        "Scheme 78",
        "MR 10",
        "Bapat Square",
        "Nanda Nagar",
        "Sukhlia",
        "Radisson Square",
        "Mahalaxmi Nagar",
      ]}
      reviews={[
        {
          author: "Aman Sharma",
          role: "Java Full Stack Developer placed at Infobeans",
          text: "The practical labs at Shagun Tower Vijay Nagar are top notch. Mentors don't just teach theory; they sit with you and review every line of code.",
          rating: 5,
        },
        {
          author: "Pooja Verma",
          role: "Data Analyst placed at Yash Technologies",
          text: "I completed Data Science and Power BI here. The campus is right above Apna Sweets, super accessible by metro and city bus.",
          rating: 5,
        },
        {
          author: "Rohan Patel",
          role: "Python & Django Student",
          text: "The best computer classes in Vijay Nagar. 100% practical approach with real project submissions.",
          rating: 5,
        },
      ]}
    />
  );
}

