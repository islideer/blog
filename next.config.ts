import createMDX from '@next/mdx'
import bundleAnalyzer from '@next/bundle-analyzer'

import type { NextConfig } from 'next'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  reactCompiler: true,
  output: 'export', // 静态导出
  images: {
    unoptimized: true, // 静态导出需要
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withBundleAnalyzer(withMDX(nextConfig))
