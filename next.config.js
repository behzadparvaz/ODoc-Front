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
    cacheId: `tapsi-doctor-web-app-${application_version}`,
    runtimeCaching: [
      {
        urlPattern: /\.(jpg|jpeg|gif|png|svg|ico|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 3 * 24 * 60 * 60,
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
            maxAgeSeconds: 3 * 24 * 60 * 60,
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
            maxAgeSeconds: 3 * 24 * 60 * 60,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
});

const nextConfig = {
  output: 'standalone',
  swcMinify: true,
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: [
      'trustseal.eNamad.ir',
      'logo.samandehi.ir',
      '5.34.204.173',
      's3.ir-thr-at1.arvanstorage.ir',
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
