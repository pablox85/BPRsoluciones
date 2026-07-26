import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { MotionPreload } from "@/components/animations/MotionPreload";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SEOJsonLd } from "@/components/seo/SEOJsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}>
        <div className="site-shell">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <MotionPreload />
        <ScrollReveal />
        <SEOJsonLd />
        <AnalyticsScripts />
        <Analytics />
      </body>
    </html>
  );
}
