import bundleAnalyzer from '@next/bundle-analyzer'

import type { NextConfig } from 'next'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: '**.loli.net' },
      { hostname: '**.viki.moe' },

      // 友链头像部分
      { hostname: 'www.shiro.team' },
      { hostname: 'thricecola.com' },
      { hostname: 'yunnet.top' },
      { hostname: 'www.lapis.cafe' },
      { hostname: 'blog.dogxi.me' },
    ],
  },
}

export default withBundleAnalyzer(nextConfig)
