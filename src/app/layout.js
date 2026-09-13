import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Nyamurongi & Co. Advocates | Advocate of the High Court of Kenya",
  description:
    "Nyamurongi & Co. Advocates — trusted legal representation in Kisii, Kenya. Corporate, litigation, property, employment, banking, and family law.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="bg-ink font-sans text-fg antialiased">
        <Preloader />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
