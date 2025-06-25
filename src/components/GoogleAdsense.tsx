'use client';

import { useEffect, useRef, useState } from 'react';

const GoogleAdSense = ({ adClient }: { adClient: string }) => {
  const ADSENSE_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || 'ca-pub-9305828682531722';
  const AD_SLOT_ID = '4053401472';
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('AdSense not loaded in development mode');
      return;
    }

    // Inject AdSense script
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, [adClient]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    // Attempt to load ad
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Error pushing AdSense:', err);
    }

    // Watch for content rendering
    const timeout = setTimeout(() => {
      const hasContent = adRef.current?.children.length;
      setIsVisible(Boolean(hasContent));
    }, 2000); // wait 2 seconds to check

    return () => clearTimeout(timeout);
  }, []);

  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <div
      ref={adRef}
      style={{
        display: isVisible ? 'block' : 'none',
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={AD_SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAdSense;
