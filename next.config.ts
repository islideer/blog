import bundleAnalyzer from '@next/bundle-analyzer'

import type { NextConfig } from 'next'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  reactCompiler: true,
  // 移除 output: 'export'，使用混合模式
  // 页面默认静态生成，API 路由动态执行
  images: {
    unoptimized: true, // CDN 友好
  },
}

export default withBundleAnalyzer(nextConfig)
