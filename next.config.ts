import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Note: webpack config removed for Turbopack compatibility
  // The dynamic import in the API route handles pdf-parse bundling
};

export default nextConfig;
