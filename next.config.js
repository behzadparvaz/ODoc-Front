/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { version: application_version } = require('./package.json');
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  scope: '/',
  disable: process.env.NODE_ENV === 'development',
  reloadOnOnline: true,
  workboxOptions: {
    mode: 'production',
    clientsClaim: true,
    skipWaiting: true,
    cleanupOutdatedCaches: true,
    disableDevLogs: true,
    cacheId: `web-app-${application_version}`,
    runtimeCaching: [
      {
        urlPattern: /\.(jpg|jpeg|gif|png|svg|ico|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 3 * 24 * 60 * 60, // Cache for 3 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /\.(woff|woff2|ttf|otf)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'font-cache',
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 3 * 24 * 60 * 60, // Cache for 3 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /\.(css)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'css-cache',
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 3 * 24 * 60 * 60, // Cache for 3 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /_next\/static\/chunks\/.*\.js$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'next-chunks',
          expiration: {
            maxAgeSeconds: 60 * 60 * 24, // Cache for one day
          },
        },
      },
    ],
  },
});

const nextConfig = {
  output: 'standalone',
  distDir: 'build',
  swcMinify: true,
  reactStrictMode: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },

  images: {
    domains: [
      'example.com', // Add your image domains here
    ],
    minimumCacheTTL: 60,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`, // Rewrite API calls
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)', // Apply headers globally
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' }, // Security header
        ],
      },
      {
        source: '/_next/static/chunks/**',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ], // Cache static chunks
      },
    ];
  },
};

module.exports = withPlugins([withPWA, withBundleAnalyzer], nextConfig);
