import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.nflxext.com"], // Allow Netflix assets domain
  },
};

export default nextConfig;
