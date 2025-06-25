import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  title: "Custom Stamp Maker - Design & Save Stamps Online Free",
  description:
    "Design your own custom stamps online for free. Easily create, edit, and save personalized stamp designs — no software needed. Fast, fun, and completely free.",
  keywords:
    "custom stamp maker, design stamps online, create stamps free, online stamp editor, personalized stamp design, make your own stamp, free stamp maker",
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
        <title>Custom Stamp Maker - Design & Save Stamps Online Free</title>

        <meta
          name="description"
          content="Design your own custom stamps online for free. Easily create, edit, and save personalized stamp designs — no software needed. Fast, fun, and completely free."
        />
        <meta
          name="keywords"
          content="custom stamp maker, design stamps online, create stamps free, online stamp editor, personalized stamp design, make your own stamp, free stamp maker"
        />

        <meta
          property="og:title"
          content="Custom Stamp Maker - Design & Save Stamps Online Free"
        />
        <meta
          property="og:description"
          content="Design your own custom stamps online for free. Easily create, edit, and save personalized stamp designs — no software needed."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://www.mystampmaker.com/" />
        <meta
          property="og:image"
          content="http://www.mystampmaker.com/preview-image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Custom Stamp Maker - Design & Save Stamps Online Free"
        />
        <meta
          name="twitter:description"
          content="Design custom stamps online for free. Easy to create, edit, and save personalized designs."
        />
        <meta
          name="twitter:image"
          content="http://www.mystampmaker.com/preview-image.png"
        />
        {/* Google Analytics - Best practice to add it in the head */}
        <GoogleAnalytics gaId="G-WV0S24L3GV" />
        {/* Add other meta tags if needed */}
<link rel="icon" href="/favicon.ico" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainContextProvider>{children}</MainContextProvider>
      </body>
    </html>
  );
}
