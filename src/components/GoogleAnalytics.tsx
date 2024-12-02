"use client";
import Script from "next/script";
import { memo, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Add proper type declaration for gtag
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

const TRACKING_ID = "G-WV0S24L3GV";

const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    if (pathname) {
      window?.gtag?.("event", "page_view", {
        page_path: pathname,
        page_search: searchParams?.toString() ?? '',
        send_to: TRACKING_ID,
      });
    }
  }, [pathname, searchParams]);

  if (!TRACKING_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${TRACKING_ID}');
          `,
        }}
      />
    </>
  );
};

const MemoizedGoogleAnalytics = memo(GoogleAnalytics);

export default function AnalyticsWrapper() {
  return (
    <Suspense fallback={null}>
      <MemoizedGoogleAnalytics />
    </Suspense>
  );
}

