import type { Metadata } from "next";
import { Suspense } from "react";
import { getAdminSession, isAuthConfigured } from "@/lib/certificates/auth";
import { isMongoConfigured } from "@/lib/certificates/mongodb";
import AdminLoginForm from "@/components/certificates/AdminLoginForm";
import AdminOverviewClient from "@/components/admin/AdminOverviewClient";

export const metadata: Metadata = {
  title: "Admin Dashboard | The Prime Step",
  description: "Private institute operations dashboard for authorized administrators.",
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

async function AdminOverviewGate() {
  const session = await getAdminSession();
  const authReady = isAuthConfigured();
  const dbReady = isMongoConfigured();

  if (!session) {
    return <AdminLoginForm authConfigured={authReady} dbConfigured={dbReady} />;
  }

  return <AdminOverviewClient adminId={session.adminId} dbConfigured={dbReady} />;
}

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-canvas px-4">
          <div className="h-64 w-full max-w-md animate-pulse rounded-[16px] border border-hairline bg-surface" />
        </main>
      }
    >
      <AdminOverviewGate />
    </Suspense>
  );
}
