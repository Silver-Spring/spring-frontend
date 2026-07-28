interface LinkedInTrackPayload {
  conversion_id: number;
}

interface LinkedInTrack {
  (action: 'track', payload?: LinkedInTrackPayload): void;
  q: [string, LinkedInTrackPayload | undefined][];
}

declare global {
  interface Window {
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
    lintrk?: LinkedInTrack;
  }
}

// Resolved to undefined outside production builds so localhost and Vercel preview
// traffic never reaches Campaign Manager, matching the PostHog gate.
export const linkedInPartnerId =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID
    : undefined;

export const linkedInInsightTagSrc = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';

export const linkedInPixelUrl = (partnerId: string): string =>
  `https://px.ads.linkedin.com/collect/?pid=${partnerId}&fmt=gif`;

const track = (payload?: LinkedInTrackPayload): void => {
  if (typeof window === 'undefined' || typeof window.lintrk !== 'function') return;

  window.lintrk('track', payload);
};

export const trackLinkedInPageView = (): void => track();

export const trackLinkedInConversion = (conversionId: number): void =>
  track({ conversion_id: conversionId });

export const trackLinkedInWorkbookPurchase = (): void => {
  const conversionId = Number(process.env.NEXT_PUBLIC_LINKEDIN_WORKBOOK_CONVERSION_ID);
  if (!conversionId) return;

  trackLinkedInConversion(conversionId);
};
