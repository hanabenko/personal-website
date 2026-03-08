import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin project root so Vercel trace includes all files (avoids wrong root when multiple lockfiles exist)
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;
