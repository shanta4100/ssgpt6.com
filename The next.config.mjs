/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  distDir: '.vercel/output',
  images: { unoptimized: true },
  trailingSlash: true, // Crucial for 135 sub-pages to work without 404s
};

export default nextConfig;