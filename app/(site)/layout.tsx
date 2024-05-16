import Navbar from "@ui/navbar";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-gray-900 text-slate-50 text-center">
        JANGAN MAIN SLOTT!!!
      </div>
      <Navbar />
      <Suspense fallback={"Tunggu Sebentar..."}>{children}</Suspense>
      <Toaster />
      <Sonner />
    </>
  );
}
