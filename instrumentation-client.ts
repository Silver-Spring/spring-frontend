import posthog from 'posthog-js';

// Only initialize PostHog in production to avoid polluting analytics with dev data
if (process.env.NODE_ENV === 'production') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
    // Use reverse proxy in production to bypass ad blockers
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com',
    defaults: '2026-01-30',
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: true,
    },
    // Disable automatic pageview capture to prevent double-tracking
    capture_pageview: true,
    capture_pageleave: true,
    capture_performance: true,
    enable_heatmaps: true,
    // Enable session recording
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[data-private]',
    },
  });
} else {
  console.log('[PostHog] Analytics disabled in development mode');
}
