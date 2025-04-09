'use client';

import Script from "next/script";
import { useEffect } from "react";

const GoogleAdsense = () => {
  const ADSENSE_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || 'ca-pub-9305828682531722';

  // Handle AdSense script loading and error handling in production
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log("Loading AdSense script...");

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }

      // Only log on production
      console.log('%c✅ AdSense script loaded successfully!', 'color: green; font-size: 16px;');
    } else {
      console.log('AdSense not loaded in development mode');
    }
  }, [ADSENSE_ID]); // Only trigger on component mount or if `ADSENSE_ID` changes

  // Conditional rendering for development mode
  if (process.env.NODE_ENV !== "production") {
    return null; // Don't render anything in development
  }

  return (
    <>
      {/* Async AdSense script loading with error handling */}
      <Script
        id="adsbygoogle-init"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onError={(e) => {
          console.error('AdSense script failed to load:', e);
        }}
      />

      {/* AdSense Ad Slot */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot="4053401472"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      {/* Temporary indicator for production (Remove in production) */}
      <div style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        background: 'green',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        zIndex: 9999
      }}>
        AdSense Active
      </div>
    </>
  );
};

export default GoogleAdsense;
