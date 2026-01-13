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
};

export default nextConfig;
