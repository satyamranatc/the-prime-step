import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { BRANCHES, FAQS, SITE } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const siteTitle = "The Prime Step | IT & Skill Training Institute — Indore";
const siteDescription =
  "Indore's premier IT training institute. Job-oriented courses in Java Full Stack, Python, MERN Stack, Data Science, AI & Machine Learning with hands-on live projects and dedicated placement cell across Vijay Nagar, Bhawarkua & Annapurna campuses.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: siteTitle,
    template: `%s | ${SITE.name}`,
  },
  description: siteDescription,
  applicationName: SITE.name,
  generator: "Next.js",
  keywords: [
    "IT training institute Indore",
    "Computer classes in Vijay Nagar Indore",
    "Python programming classes Indore",
    "Java Full Stack Developer course Indore",
    "MERN Stack developer course Indore",
    "Data Science and AI courses Indore",
    "Best coding class in Indore",
    "Software training and placement institute",
    "The Prime Step Indore",
    "Computer training Bhawarkua Indore",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Education & Technology",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE.url}/brand/logo.png`,
        width: 1200,
        height: 630,
        alt: "The Prime Step — Architectural Engineering & IT Training in Indore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    site: "@theprimestep",
    creator: "@theprimestep",
    images: [`${SITE.url}/brand/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/brand/logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/brand/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#1E9C99" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Educational Organization
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: "The Prime Step IT Training & Placement Institute",
      url: SITE.url,
      logo: `${SITE.url}/brand/logo.png`,
      email: SITE.email,
      telephone: SITE.phone,
      description: siteDescription,
      foundingDate: SITE.established,
      sameAs: [
        SITE.social.instagram,
        SITE.social.linkedin,
        SITE.social.youtube,
        SITE.social.facebook,
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "2390",
        bestRating: "5",
        worstRating: "1",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: BRANCHES[0].address,
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        postalCode: "452010",
        addressCountry: "IN",
      },
    },

    // 2. Local Business: Vijay Nagar Campus
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#branch-vijaynagar`,
      name: `${SITE.name} — Vijay Nagar (Head Office)`,
      url: SITE.url,
      telephone: BRANCHES[0].phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: BRANCHES[0].address,
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        postalCode: "452010",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.7533,
        longitude: 75.8937,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    },

    // 3. Local Business: Bhawarkua Campus
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#branch-bhawarkua`,
      name: `${SITE.name} — Bhawarkua Campus`,
      url: SITE.url,
      telephone: BRANCHES[1].phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: BRANCHES[1].address,
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        postalCode: "452001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.6926,
        longitude: 75.8676,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    },

    // 4. Local Business: Annapurna Campus
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#branch-annapurna`,
      name: `${SITE.name} — Annapurna Campus`,
      url: SITE.url,
      telephone: BRANCHES[2].phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: BRANCHES[2].address,
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        postalCode: "452009",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.7011,
        longitude: 75.8341,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    },

    // 5. WebSite with Site Navigation
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: siteDescription,
      publisher: {
        "@id": `${SITE.url}/#organization`,
      },
    },

    // 6. Course Offerings Schema
    {
      "@type": "Course",
      "@id": `${SITE.url}/#course-java`,
      name: "Java Full Stack Developer Master Program",
      description:
        "Comprehensive enterprise Java training covering Core Java, Advanced Java, Spring Boot, Microservices, Hibernate, and Full Stack architecture.",
      provider: {
        "@id": `${SITE.url}/#organization`,
      },
    },
    {
      "@type": "Course",
      "@id": `${SITE.url}/#course-python`,
      name: "Python Full Stack, Data Science & Applied AI",
      description:
        "Practical Python development covering automation, Django, FastAPI, Data Analytics, Pandas, NumPy, Machine Learning, and Generative AI applications.",
      provider: {
        "@id": `${SITE.url}/#organization`,
      },
    },
    {
      "@type": "Course",
      "@id": `${SITE.url}/#course-mern`,
      name: "MERN Stack Web Development Program",
      description:
        "Full stack JavaScript engineering covering MongoDB, Express.js, React, Node.js, Next.js, REST APIs, and production deployment.",
      provider: {
        "@id": `${SITE.url}/#organization`,
      },
    },

    // 7. FAQPage Schema
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://www.theprimestep.com" />
        <link rel="dns-prefetch" href="https://www.theprimestep.com" />
      </head>
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
