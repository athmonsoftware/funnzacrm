import type { NextConfig } from "next";

const BACKEND_URL =
  process.env.BACKEND_URL ?? "https://funza-ai-main-6s44.onrender.com";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return {
      // Runs BEFORE filesystem routes: auth is owned by the backend,
      // so this overrides the local /api/auth/[...all] route.
      beforeFiles: [
        {
          source: "/api/auth/:path*",
          destination: `${BACKEND_URL}/api/auth/:path*`,
        },
      ],
      // Runs AFTER filesystem routes: local API routes (e.g. /api/stripe/*)
      // still work; everything else under /api is proxied to the backend.
      afterFiles: [
        {
          source: "/api/:path*",
          destination: `${BACKEND_URL}/api/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
