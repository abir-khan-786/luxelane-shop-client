import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'url-shortener.me',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
