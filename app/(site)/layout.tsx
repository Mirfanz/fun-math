import Navbar from "@ui/navbar";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { auth } from "@/auth";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
      <div className="bg-gray-900 text-slate-50 text-center">
        JANGAN MAIN SLOTT!!!
      </div>
      <Navbar session={session} />
      <Suspense fallback={"Tunggu Sebentar..."}>{children}</Suspense>
      <Toaster />
      <Sonner />
    </>
  );
}
