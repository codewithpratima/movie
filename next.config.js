/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.nflxext.com", "plus.unsplash.com"], // Allow Netflix assets domain
  },
};

module.exports = nextConfig;
