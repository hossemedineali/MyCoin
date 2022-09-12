/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  nextConfig,
  
  images: {
    domains: ['assets.coingecko.com','www.coingecko.com'],
  },
  experimental: {
    images: {
      unoptimized: true,
    }},
    
}


/*
async redirects() {
      return [
        {
          source: '/',
          destination: '/',
          permanent: true,
        },
      ]
    },
*/