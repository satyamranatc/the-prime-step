import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import BranchLandingTemplate from "@/components/pages/BranchLandingTemplate";

export const metadata: Metadata = {
  title: "Computer Classes in Annapurna, Indore | The Prime Step",
  description:
    "Professional computer training & Tally GST classes in Annapurna, Indore at Kalyan Tower (above Surbhi Sweets). Practical coaching in MS Office, Excel, Python & Spoken English.",
  alternates: {
    canonical: `${SITE.url}/annapurna`,
  },
  openGraph: {
    title: "Computer Classes in Annapurna, Indore | The Prime Step",
    description:
      "Professional computer training & Tally GST classes in Annapurna, Indore. Hands-on computer classes with personalized faculty attention.",
    url: `${SITE.url}/annapurna`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function AnnapurnaBranchPage() {
  return (
    <BranchLandingTemplate
      branchKey="Annapurna"
      slug="annapurna"
      headline="Computer Classes & Professional Skills in Annapurna, Indore"
      lead="Serving students, school leavers, commerce graduates, and professionals in Western Indore. Located on Annapurna Mandir Road at Kalyan Tower, offering foundational and career-oriented computer education."
      description="Equipped with dedicated accounting and general computing labs. Our Annapurna campus provides specialized training in Tally Prime with GST, MS Office & Advanced Excel MIS reporting, Python fundamentals, and Spoken English communication with small batch sizes for maximum personal faculty attention."
      googleMapsUrl="https://maps.google.com/?q=The+Prime+Step+Annapurna+Indore"
      nearbyAreas={[
        "Annapurna Mandir Road",
        "Ranjeet Hanuman",
        "Usha Nagar",
        "Sudama Nagar",
        "Gopur Square",
        "Dravid Nagar",
        "Footi Kothi",
        "Chhatribagh",
      ]}
      reviews={[
        {
          author: "Deepak Soni",
          role: "Accountant at CA Firm",
          text: "I completed Tally Prime and Advanced Excel here. The faculty explained GST returns and e-invoicing using live company books.",
          rating: 5,
        },
        {
          author: "Kavita Tiwari",
          role: "Office Executive",
          text: "The best computer classes in Annapurna area. Clean labs, peaceful environment, and very patient teachers.",
          rating: 5,
        },
        {
          author: "Mohit Jain",
          role: "B.Com Graduate",
          text: "Great experience. Flexible batch timings allowed me to attend college in the morning and computer classes in the afternoon.",
          rating: 5,
        },
      ]}
    />
  );
}

