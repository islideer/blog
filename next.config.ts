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
      { hostname: 'media.steampowered.com' },

      // 头像服务
      { hostname: 'q.qlogo.cn' },
      { hostname: 'gravatar.loli.net' },

      // 友链头像部分
      { hostname: 'www.shiro.team' },
      { hostname: 'thricecola.com' },
      { hostname: 'yunnet.top' },
      { hostname: 'www.lapis.cafe' },
      { hostname: 'blog.dogxi.me' },
    ],
    unoptimized: true,
  },
}

export default withBundleAnalyzer(nextConfig)
