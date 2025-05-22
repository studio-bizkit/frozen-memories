import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
