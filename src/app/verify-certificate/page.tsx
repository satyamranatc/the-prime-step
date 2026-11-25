import type { Metadata } from "next";
import { Suspense } from "react";
import { SITE } from "@/lib/content";
import Experience from "@/components/features/Experience";
import Footer from "@/components/features/Footer";
import VerifyCertificateClient from "@/components/certificates/VerifyCertificateClient";

const pageTitle = "Certificate Verification | The Prime Step Indore";
const pageDescription =
  "Verify the authenticity of official course completion certificates issued by The Prime Step IT Training & Placement Institute, Indore.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${SITE.url}/verify-certificate`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE.url}/verify-certificate`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function VerifyCertificatePage() {
  return (
    <Experience>
      <main className="min-h-[calc(100svh-72px)] bg-canvas py-12 sm:py-16 lg:py-20">
        <Suspense
          fallback={
            <div className="mx-auto max-w-2xl px-4 sm:px-6">
              <div className="h-64 animate-pulse rounded-[16px] border border-hairline bg-surface" />
            </div>
          }
        >
          <VerifyCertificateClient />
        </Suspense>
      </main>
      <Footer />
    </Experience>
  );
}
