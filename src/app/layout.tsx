import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from '@next/third-parties/google';
import GoogleAdsense from "@/components/GoogleAdsense";
import MainContextProvider from "@/components/MainContext";
import "./globals.css";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MainContextProvider>
          {/* Google AdSense Component */}
          <GoogleAdsense />
          {children}
        </MainContextProvider>
        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-WV0S24L3GV" />
      </body>
    </html>
  );
}
