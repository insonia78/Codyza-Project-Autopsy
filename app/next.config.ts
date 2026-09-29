import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this app so a stray lockfile in a parent
    // directory cannot change root detection (local builds, CI, Vercel).
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
