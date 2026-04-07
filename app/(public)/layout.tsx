"use client"

import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
