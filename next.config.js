/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const runtimeCaching = require('next-pwa/cache');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Next.js configuration object
const nextConfig = {
  distDir: 'build', // Custom output directory for build files
  swcMinify: true, // Enable SWC minification
  images: {
    domains: [
      'trustseal.eNamad.ir',
      'logo.samandehi.ir',
      '5.34.204.173',
      's3.ir-thr-at1.arvanstorage.ir',
    ],
    minimumCacheTTL: 60, // Minimum cache time for images
  },
  webpack: (config) => {
    // Add support for importing SVG files as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Prevent clickjacking by allowing framing only from the same origin
          },
        ],
      },
      {
        source: '/(.*).(jpg|png|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=259200, immutable', // Cache images for 3 days
          },
        ],
      },
    ];
  },
};

// Export the combined configuration with plugins
module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
          dest: 'public', // Destination folder for service worker and manifest
          register: true, // Automatically register the service worker
          skipWaiting: true, // Activate the new service worker immediately
          runtimeCaching,
        },
      },
    ],
    withBundleAnalyzer,
  ],
  nextConfig,
);
