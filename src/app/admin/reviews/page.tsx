import type { Metadata } from "next";
import { Suspense } from "react";
import { getAdminSession, isAuthConfigured } from "@/lib/certificates/auth";
import { isMongoConfigured } from "@/lib/certificates/mongodb";
import AdminLoginForm from "@/components/certificates/AdminLoginForm";
import AdminReviewsClient from "@/components/admin/AdminReviewsClient";

export const metadata: Metadata = {
  title: "Verified Reviews & Placements | The Prime Step Admin",
  description: "Private student reviews and placement stories manager for authorized administrators.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

async function AdminReviewsGate() {
  const session = await getAdminSession();
  const authReady = isAuthConfigured();
  const dbReady = isMongoConfigured();

  if (!session) {
    return <AdminLoginForm authConfigured={authReady} dbConfigured={dbReady} />;
  }

  return <AdminReviewsClient adminId={session.adminId} dbConfigured={dbReady} />;
}

export default function AdminReviewsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-canvas px-4">
          <div className="h-64 w-full max-w-md animate-pulse rounded-[16px] border border-hairline bg-surface" />
        </main>
      }
    >
      <AdminReviewsGate />
    </Suspense>
  );
}
