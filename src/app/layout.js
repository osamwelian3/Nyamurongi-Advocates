import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ThemeHead from "@/components/ThemeHead";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { DEFAULT_THEME } from "@/lib/themes";

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
    <html lang="en" data-theme={DEFAULT_THEME} suppressHydrationWarning className={`${cormorant.variable} ${outfit.variable}`}>
      <head>
        <ThemeHead />
      </head>
      <body className="bg-ink font-sans text-fg antialiased">
        <Preloader />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <ThemeSwitcher />
      </body>
    </html>
  );
}
