'use client';

import { useEffect } from 'react';

const GoogleAdsense = ({ adClient }: { adClient: string }) => {
  const ADSENSE_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || 'ca-pub-9305828682531722';
  const AD_SLOT_ID = '4053401472';

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('AdSense not loaded in development mode');
      return;
    }

    try {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    } catch (err) {
      console.error('Error appending AdSense script:', err);
    }
  }, [adClient]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Error pushing AdSense:', err);
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={AD_SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
};

export default GoogleAdsense;
