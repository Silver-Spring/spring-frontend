import posthog from 'posthog-js';

// Defer PostHog initialization to not block initial render
// Use requestIdleCallback for better performance, fallback to setTimeout
if (typeof window !== 'undefined') {
  const initPostHog = () => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: '2026-01-30',
      capture_exceptions: {
        capture_unhandled_errors: true,
        capture_unhandled_rejections: true,
        capture_console_errors: true,
      },
      debug: process.env.NODE_ENV === 'development',
      // Disable automatic pageview capture to prevent double-tracking
      capture_pageview: false,
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(initPostHog);
  } else {
    setTimeout(initPostHog, 1);
  }
}
