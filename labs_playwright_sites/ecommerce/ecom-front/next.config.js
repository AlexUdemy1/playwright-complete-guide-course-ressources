/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: false,
    images: {
      // domains: ['localhost'],
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3001',
        },
      ],
    },
  };
