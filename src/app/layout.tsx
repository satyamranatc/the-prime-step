import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { BRANCHES, SITE } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const description =
  "Job-oriented IT training, Full Stack Development, Data Science, AI, and Skill Development Institute in Indore.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "The Prime Step | IT & Skill Training Institute — Indore",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Prime Step | IT & Skill Training Institute — Indore",
    description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#FAFCFC" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/brand/logo.png`,
  telephone: SITE.phone,
  email: SITE.email,
  description,
  address: {
    "@type": "PostalAddress",
    streetAddress: BRANCHES[0].address.replace(/, Indore.*$/, ""),
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "452010",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
