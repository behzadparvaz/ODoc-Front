/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  scope: '/',
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontEndNav: true, // Enable caching for front-end navigation
  aggressiveFrontEndNavCaching: true, // Aggressive caching for smoother navigation
  reloadOnOnline: true, // Force reload when going back online
  runtimeCaching: [
    {
      urlPattern: /\.(?:js|css|html|svg|png|jpg|jpeg|gif|webp)$/, // Static assets caching
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        },
      },
    },
    {
      // Matches dynamic routes like /store-id
      urlPattern: /^\/[a-zA-Z0-9]+$/,
      handler: 'NetworkOnly', // Always fetch from network
    },
  ],
  disableDevLogs: true,
});

const nextConfig = {
  distDir: 'build',
  swcMinify: true,
  images: {
    domains: [
      'trustseal.eNamad.ir',
      'logo.samandehi.ir',
      '5.34.204.173',
      's3.ir-thr-at1.arvanstorage.ir',
    ],
    minimumCacheTTL: 60,
  },
  webpack: (config) => {
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
            value: 'SAMEORIGIN',
          },
        ],
      },
      {
        source: '/(.*).(jpg|png|svg|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=259200, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = withPlugins([withPWA, withBundleAnalyzer], nextConfig);
