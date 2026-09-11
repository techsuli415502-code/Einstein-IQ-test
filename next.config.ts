import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-a70f3ff1-7c08-4023-9cdd-e451d35289cf.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
