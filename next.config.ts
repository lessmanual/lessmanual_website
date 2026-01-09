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
      // Polish thank-you page URL
      {
        source: '/dziekujemy',
        destination: '/thank-you',
      },
    ]
  },
  // Redirects for section URLs (SEO-friendly)
  async redirects() {
    return [
      // Polish section URLs
      { source: '/kontakt', destination: '/#kontakt', permanent: true },
      { source: '/kalkulator-roi-automatyzacji', destination: '/#kalkulator', permanent: true },
      { source: '/specjalizacje', destination: '/#specializations', permanent: true },
      { source: '/jak-to-dziala', destination: '/#how-it-works', permanent: true },
      { source: '/o-nas', destination: '/#about', permanent: true },
      { source: '/faq-sekcja', destination: '/#faq', permanent: true },
      // English section URLs
      { source: '/en/contact', destination: '/en/#contact', permanent: true },
      { source: '/en/roi-calculator', destination: '/en/#kalkulator', permanent: true },
      { source: '/en/specializations', destination: '/en/#specializations', permanent: true },
      { source: '/en/how-it-works', destination: '/en/#how-it-works', permanent: true },
      { source: '/en/about-us', destination: '/en/#about', permanent: true },
      { source: '/en/faq-section', destination: '/en/#faq', permanent: true },
    ]
  },
}

export default withNextIntl(nextConfig)
