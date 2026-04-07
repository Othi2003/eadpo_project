import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: "./fonts/Satoshi.ttf",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "PEADPO",
  description: "Site officiel de la PremièreÉglise des Assemblées de Dieu de la Patte d'Oie - PEAPO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${satoshi.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}