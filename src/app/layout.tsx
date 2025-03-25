import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Serif, Roboto, Niconne, Bodoni_Moda, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Lenis from "@/components/Lenis";
import { SpeedInsights } from "@vercel/speed-insights/next"
import localFont from 'next/font/local'


const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: "400"
});

const niconne = Niconne({
  variable: "--font-niconne",
  subsets: ["latin"],
  weight: "400"
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
});


const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi-Variable.ttf',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-VariableItalic.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi',
});

export const metadata: Metadata = {
  title: "Frozen Memories",
  description: "Frozen Memories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoSerif.variable} ${roboto.variable} ${niconne.variable} ${bodoniModa.variable} ${satoshi.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Lenis>
          <Analytics />
          <SpeedInsights />
          {children}
        </Lenis>
      </body>
    </html>
  );
}
