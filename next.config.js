/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Increase the timeout for serverless functions
  serverActions: {
    bodySizeLimit: '10mb',
  },
  experimental: {
    serverActionsTimeout: 120, // 2 minutes
  }
};

module.exports = nextConfig;
