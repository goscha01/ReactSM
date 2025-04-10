import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from '@next/third-parties/google';
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
      <head>
        {/* SEO and Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Create, Edit and Save Custom Stamp Designs Online for FREE!" />
        <meta name="keywords" content="Create, Edit and Save Custom Stamp Designs Online for FREE!" />
        {/* Google Analytics - Best practice to add it in the head */}
        <GoogleAnalytics gaId="G-WV0S24L3GV" />
        {/* Add other meta tags if needed */}
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MainContextProvider>
          {children}
        </MainContextProvider>


      </body>
    </html>
  );
}
