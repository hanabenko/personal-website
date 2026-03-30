import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin project root so Vercel trace includes all files (avoids wrong root when multiple lockfiles exist)
  outputFileTracingRoot: path.join(process.cwd()),
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
