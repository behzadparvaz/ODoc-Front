/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const runtimeCaching = require('next-pwa/cache');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
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
        source: '/(.*).(jpg|png|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=259200, immutable', // Cache for 3 Days
          },
        ],
      },
    ];
  },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV === 'development',
          dest: 'public',
          register: true,
          skipWaiting: true,
          runtimeCaching,
        },
      },
    ],
    withBundleAnalyzer,
  ],
  nextConfig,
);
