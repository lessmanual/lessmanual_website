import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  experimental: {
    // Partial Prerendering - requires Next.js canary version
    // ppr: true,
    // Optimize package imports
    optimizePackageImports: ['framer-motion', 'next-intl'],
  },
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'figma.com',
      },
    ],
    // Image optimization settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  // Production optimizations
  productionBrowserSourceMaps: false,
  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/logo.png',
        destination: '/images/logo.png',
      },
    ]
  },
  // 301 redirects from old /pl/* URLs to new /* URLs
  async redirects() {
    return [
      {
        source: '/pl/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
