import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { BRANCHES, SITE } from "@/lib/content";
import { MotionProvider } from "@/components/ui/Motion";
import "./globals.css";

const appleSans = Inter({
  variable: "--font-apple-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const siteTitle = "The Prime Step | IT & Skill Training Institute — Indore";
const siteDescription =
  "Indore's premier IT training institute. Job-oriented courses in Java Full Stack, Python, MERN Stack, Data Science, AI & Machine Learning with hands-on live projects and dedicated placement cell across Vijay Nagar, Bhawarkua & Annapurna campuses.";

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
  ...(gscVerification
    ? {
        verification: {
          google: gscVerification,
        },
      }
    : {}),
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
    { media: "(prefers-color-scheme: dark)", color: "#072B2A" },
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
      url: `${SITE.url}/vijay-nagar`,
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
      url: `${SITE.url}/bhawarkua`,
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
      url: `${SITE.url}/annapurna`,
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

    // 5. WebSite
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
      className={`${appleSans.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://www.theprimestep.com" />
        <link rel="dns-prefetch" href="https://www.theprimestep.com" />
      </head>
      <body>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
