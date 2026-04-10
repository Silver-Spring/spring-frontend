import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Compiler for automatic optimization
  // Reduces need for manual useMemo/useCallback
  reactCompiler: true,

  // Enable Turbopack filesystem caching for faster dev restarts
  experimental: {
    turbopackFileSystemCacheForDev: true,
    // Uncomment for faster production builds (beta)
    // turbopackFileSystemCacheForBuild: true,
  },

  // Optional: Enable Cache Components mode
  // Uncomment to enable runtime-first data fetching with explicit caching
  // Note: cacheComponents is incompatible with dynamic = 'force-dynamic'
  // Disabled for now to allow dynamic rendering in protected routes
  // cacheComponents: true,

  // PostHog reverse proxy — routes analytics through the app to avoid ad blockers
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
