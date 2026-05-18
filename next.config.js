/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  experimental: {
    optimizePackageImports: ['framer-motion', '@number-flow/react'],
  },
}

module.exports = nextConfig
