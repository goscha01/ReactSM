import type { Metadata } from "next";
import localFont from "next/font/local";
import { } from "next/font/google";
import "./globals.css";
import MainContextProvider from "@/components/MainContext";
import { GoogleAnalytics } from '@next/third-parties/google';
import GoogleAdsense from "@/components/GoogleAdsense";
import Head from 'next/head';  // Import next/head

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
      <head>
        {/* Add Google AdSense Script Here */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9305828682531722"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MainContextProvider>
          <GoogleAdsense />
          {children}
        </MainContextProvider>
        <GoogleAnalytics gaId="G-WV0S24L3GV" />
      </body>
    </html>
  );
}
