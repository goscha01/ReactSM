'use client';

import Script from "next/script";
import { useEffect } from "react";

const GoogleAdsense = () => {
  const ADSENSE_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || 'ca-pub-9305828682531722';

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log("Loading AdSense script...");

      const loadAd = () => {
        try {
          // Ensure adsbygoogle is initialized and try again
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.error('AdSense error:', err);
        }
      };

      const intervalId = setInterval(() => {
        if (window.adsbygoogle) {
          loadAd();
          clearInterval(intervalId); // Stop trying after it works
        }
      }, 500); // Retry every 500ms

      // Clean up interval when component is unmounted
      return () => clearInterval(intervalId);
    }
  }, []);

  if (process.env.NODE_ENV !== "production") {
    console.log('AdSense not loaded in development mode');
    return null;
  }

  return (
    <>
      <Script
        id="adsbygoogle-init"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onError={(e) => {
          console.error('AdSense script failed to load:', e);
        }}
        onLoad={() => {
          console.log('%c✅ AdSense script loaded successfully!', 'color: green; font-size: 16px;');
        }}
      />

      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot="4053401472"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
};

export default GoogleAdsense;
