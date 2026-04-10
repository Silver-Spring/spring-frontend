import posthog from 'posthog-js';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  // Use reverse proxy in production to bypass ad blockers
  api_host: process.env.NODE_ENV === 'production'
    ? '/ingest'
    : process.env.NEXT_PUBLIC_POSTHOG_HOST,
  ui_host: 'https://us.posthog.com',
  defaults: '2026-01-30',
  capture_exceptions: {
    capture_unhandled_errors: true,
    capture_unhandled_rejections: true,
    capture_console_errors: true,
  },
  debug: process.env.NODE_ENV === 'development',
  // Disable automatic pageview capture to prevent double-tracking
  capture_pageview: false,
  // Enable session recording
  session_recording: {
    maskAllInputs: true,
    maskTextSelector: '[data-private]',
  },
});
