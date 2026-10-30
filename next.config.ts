import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep share metadata in <head> even for social apps using an unrecognized
  // crawler or browser user agent; their preview fetchers may not run JavaScript.
  htmlLimitedBots: /.*/,
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  images: {
    remotePatterns: [
      {
        // Supabase Storage: matches https://<project-ref>.supabase.co/storage/v1/object/public/**
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
