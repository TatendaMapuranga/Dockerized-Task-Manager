/** @type {import('next').NextConfig} */
import config from "@/contexts/config"

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  async rewrites() {
    const apiUrl =
      config.hostUrl;
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`, // Proxy to Backend
      },
    ];
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;
