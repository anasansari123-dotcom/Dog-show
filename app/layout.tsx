import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat, Noto_Sans_Devanagari } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import { ScrollProgress } from "@/components/ui";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["600", "700", "800", "900"] });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-devanagari", weight: ["500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "AUC Grand Dog Show 2026 | Alliance for Universal Care Foundation",
    template: "%s | AUC Grand Dog Show 2026",
  },
  description:
    "3rd & 4th All Breed Championship Dog Show — Sunday, 20 December 2026 at Maa Khandwari Devi P.G. College, Chahaniya, Chandauli (U.P.). Affiliated to United Kennel Club of India.",
  icons: { icon: "/images/logo-transparent.png" },
  openGraph: {
    title: "AUC Grand Dog Show 2026",
    description: "3rd & 4th All Breed Championship Dog Show — 20 December 2026, Chandauli (U.P.)",
    images: ["/images/poster-main.jpeg"],
  },
};

export const viewport: Viewport = { themeColor: "#0a1633", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${devanagari.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
