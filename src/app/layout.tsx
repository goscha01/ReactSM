import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from '@next/third-parties/google';
import MainContextProvider from "@/components/MainContext";
import NavbarSection from "@/components/NavbarSection";
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
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Create, Edit and Save Custom Stamp Designs Online for FREE!" />
        <meta name="keywords" content="Create, Edit and Save Custom Stamp Designs Online for FREE!" />
        <GoogleAnalytics gaId="G-WV0S24L3GV" />
        <meta name="google-site-verification" content="2YLwLylxLC1CTmfSrVginy5cf8vywcibBySUXStybdU" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MainContextProvider>
          <NavbarSection />
          <main >
            {children}
          </main>
        </MainContextProvider>
      </body>
    </html>
  );
}
