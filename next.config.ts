import bundleAnalyzer from '@next/bundle-analyzer'

import type { NextConfig } from 'next'

const enableAnalyze = process.env.ANALYZE === 'true'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: enableAnalyze,
})

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx'],
  reactStrictMode: true,
  reactCompiler: true,
  crossOrigin: 'anonymous',
  images: {
    unoptimized: true,
  },
  experimental: {
    useTypeScriptCli: true
  }
}

export default enableAnalyze ? withBundleAnalyzer(nextConfig) : nextConfig
