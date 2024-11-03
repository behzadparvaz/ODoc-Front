/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const runtimeCaching = require('next-pwa/cache');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  distDir: 'build',
  images: {
    domains: [
      'https://trustseal.eNamad.ir',
      'https://logo.samandehi.ir',
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
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        // This works, and returns appropriate Response headers:
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
          },
        ],
      },
      {
        // This works, and returns appropriate Response headers:
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
          },
        ],
      },
      {
        // This works, and returns appropriate Response headers:
        source: '/(.*).svg',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
          },
        ],
      },
    ];
  },
};

// const AppleUniversalLinkConfig = {
//   experimental: {
//     headers() {
//       return [
//         {
//           source: '/.well-known/apple-app-site-association',
//           headers: [{ key: 'content-type', value: 'application/json' }],
//         },
//         {
//           source: '/apple-app-site-association',
//           headers: [{ key: 'content-type', value: 'application/json' }],
//         },
//       ];
//     },
//   },
// };

// const tehranTimezoneOffset = 0;
// const now = new Date();
// const tehranTime = new Date(now.getTime() + tehranTimezoneOffset * 60000);
// const year = tehranTime.getFullYear();
// const month = String(tehranTime.getMonth() + 1).padStart(2, '0');
// const day = String(tehranTime.getDate()).padStart(2, '0');
// const hour = String(tehranTime.getHours()).padStart(2, '0');
// const minute = String(tehranTime.getMinutes()).padStart(2, '0');
// const timestamp = `${year}${month}${day}${hour}${minute}`;

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
          sw: `sw.js`,
          runtimeCaching,
          // fallbacks: {
          //   image: '',
          // },
        },
      },
    ],
    withBundleAnalyzer,
  ],
  nextConfig,
  // AppleUniversalLinkConfig
);
