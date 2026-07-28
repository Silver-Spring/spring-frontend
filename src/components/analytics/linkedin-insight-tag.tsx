'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import {
  linkedInInsightTagSrc,
  linkedInPartnerId,
  linkedInPixelUrl,
  trackLinkedInPageView,
} from '@/lib/analytics';

export const LinkedInInsightTag = () => {
  const pathname = usePathname();
  const hasSkippedInitialPageView = useRef(false);

  // insight.min.js fires its own page view when it loads, so only client-side
  // navigations need a manual one — otherwise the landing page is counted twice.
  useEffect(() => {
    if (!hasSkippedInitialPageView.current) {
      hasSkippedInitialPageView.current = true;
      return;
    }

    trackLinkedInPageView();
  }, [pathname]);

  if (!linkedInPartnerId) return null;

  return (
    <>
      <Script id="linkedin-insight-tag-init" strategy="afterInteractive">
        {`window._linkedin_partner_id = "${linkedInPartnerId}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
if (!window.lintrk) {
  window.lintrk = function (action, payload) { window.lintrk.q.push([action, payload]); };
  window.lintrk.q = [];
}`}
      </Script>
      <Script id="linkedin-insight-tag" src={linkedInInsightTagSrc} strategy="afterInteractive" />
      <noscript>
        {/* next/image needs client-side JS, which is exactly what is missing here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          className="hidden"
          alt=""
          src={linkedInPixelUrl(linkedInPartnerId)}
        />
      </noscript>
    </>
  );
};
