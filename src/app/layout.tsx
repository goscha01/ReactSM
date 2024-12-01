import type { Metadata } from "next";
import localFont from "next/font/local";
import { } from "next/font/google";
import "./globals.css";
import MainContextProvider from "@/components/MainContext";
import Script from "next/script"

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
  keywords: "Create, Edit and Save Custom Stamp Designs Online for FREE!"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

        <Script id="google-script" strategy="afterInteractive">{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
          
                    gtag('config', 'G-WV0S24L3GV');
          `}

        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <iframe
          src="https://www.googletagmanager.com/gtag/js?id=G-WV0S24L3GV"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden"}}
          >

          </iframe>
        </noscript>
        <MainContextProvider>
          {children}
        </MainContextProvider>
      </body>
    </html>
  );
}
