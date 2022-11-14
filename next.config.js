/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'q.qlogo.cn'
      }
    ]
  }
}

module.exports = nextConfig
