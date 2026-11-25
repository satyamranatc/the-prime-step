import type { Metadata } from "next";
import { Suspense } from "react";
import { getAdminSession, isAuthConfigured } from "@/lib/certificates/auth";
import { isMongoConfigured } from "@/lib/certificates/mongodb";
import AdminLoginForm from "@/components/certificates/AdminLoginForm";
import AdminBlogClient from "@/components/admin/AdminBlogClient";

export const metadata: Metadata = {
  title: "Blog CMS",
  description: "Private SEO blog editor for authorized administrators.",
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

async function AdminBlogGate() {
  const session = await getAdminSession();
  const authReady = isAuthConfigured();
  const dbReady = isMongoConfigured();

  if (!session) {
    return <AdminLoginForm authConfigured={authReady} dbConfigured={dbReady} />;
  }

  return <AdminBlogClient adminId={session.adminId} dbConfigured={dbReady} />;
}

export default function AdminBlogPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#F3F5F8] px-4">
          <div className="h-64 w-full max-w-md animate-pulse rounded-[16px] border border-hairline bg-white" />
        </main>
      }
    >
      <AdminBlogGate />
    </Suspense>
  );
}
