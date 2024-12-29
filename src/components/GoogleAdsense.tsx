'use client';

import Script from "next/script";
import { useEffect } from "react";


const GoogleAdsense = () => {
  const ADSENSE_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || 'ca-pub-9305828682531722';
  console.log("Adsense!")

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // Debug logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('AdSense debug: Component mounted');
      console.log('AdSense ID:', ADSENSE_ID);
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
          console.log('AdSense script loaded successfully');
        }}
      />

      {/* Example Ad Unit */}
      {/* <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot="4053401472"
        data-ad-format="auto"
        data-full-width-responsive="true"
      /> */}
    </>
  );
};

export default GoogleAdsense;