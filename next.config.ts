import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  allowedDevOrigins: ['192.168.31.74:3000'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
