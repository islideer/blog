import bundleAnalyzer from '@next/bundle-analyzer'

import type { NextConfig } from 'next'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  reactCompiler: true,
  crossOrigin: 'anonymous',
  expireTime: 60 * 10, // 10 分钟
  images: {
    unoptimized: true,
  },
}

export default withBundleAnalyzer(nextConfig)
