import type { Metadata } from "next";
import localFont from "next/font/local";
import { } from "next/font/google";
import "./globals.css";
import MainContextProvider from "@/components/MainContext";

import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export const metadata: Metadata = {
  title: "My Stamp Maker",
  description: "Create, Edit and Save Custom Stamp Designs Online for FREE!",
  keywords: "Create, Edit and Save Custom Stamp Designs Online for FREE!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><meta name="google-adsense-account" content="ca-pub-9305828682531722" /></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <MainContextProvider>

          {children}
        </MainContextProvider>
        <GoogleAnalytics gaId="G-WV0S24L3GV" />

      </body>

    </html>
  );
}
