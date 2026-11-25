import type { Metadata } from "next";
import { Suspense } from "react";
import { getAdminSession, isAuthConfigured } from "@/lib/certificates/auth";
import { isMongoConfigured } from "@/lib/certificates/mongodb";
import AdminLoginForm from "@/components/certificates/AdminLoginForm";
import AdminLeadsClient from "@/components/admin/AdminLeadsClient";

export const metadata: Metadata = {
  title: "Admissions Leads CRM | The Prime Step Admin",
  description: "Private admissions and demo leads CRM for authorized administrators.",
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

async function AdminLeadsGate() {
  const session = await getAdminSession();
  const authReady = isAuthConfigured();
  const dbReady = isMongoConfigured();

  if (!session) {
    return <AdminLoginForm authConfigured={authReady} dbConfigured={dbReady} />;
  }

  return <AdminLeadsClient adminId={session.adminId} dbConfigured={dbReady} />;
}

export default function AdminLeadsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-canvas px-4">
          <div className="h-64 w-full max-w-md animate-pulse rounded-[16px] border border-hairline bg-surface" />
        </main>
      }
    >
      <AdminLeadsGate />
    </Suspense>
  );
}
