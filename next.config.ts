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
      new URL('https://*.loli.net/**'),
      new URL('https://*.viki.moe/**'),
      new URL('https://viki.moe/**'),

      // 友链头像部分
      new URL('https://*.shiro.team/**'),
      new URL('https://thricecola.com/**'),
    ],
  },
}

export default withBundleAnalyzer(nextConfig)
