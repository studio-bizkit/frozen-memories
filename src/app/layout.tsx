import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Serif, Roboto , Niconne, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Lenis from "@/components/Lenis";

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
        className={`${geistSans.variable} ${geistMono.variable} ${robotoSerif.variable} ${roboto.variable} ${niconne.variable} ${bodoniModa.variable} antialiased`}
      >
        <Lenis>
          <Analytics />
          {children}
        </Lenis>
      </body>
    </html>
  );
}
