import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
  preload: true,
})

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-source-sans-3",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
  preload: true,
});

export const metadata: Metadata = {
  title: "VerseCredit: Global & Indian Financial News at a Glance",
  description:
    "Latest finance, market, and economic news delivered clearly and accurately.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth no-scrollbar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSans3.variable} ${poppins.variable} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
