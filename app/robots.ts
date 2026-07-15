import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'

export const dynamic = 'force-static'

export const revalidate = 86400

const restrictedPaths = ['/api/', '/out/', '/_next/', '/opengraph-image/', '/*/opengraph-image/']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 通用规则
      {
        userAgent: '*',
        allow: '/',
        disallow: restrictedPaths,
      },
      // 主流搜索引擎
      {
        userAgent: ['Googlebot', 'Bingbot'],
        allow: '/',
        disallow: restrictedPaths,
      },
      // AI 检索与用户触发类（允许）
      {
        userAgent: [
          'OAI-SearchBot', // ChatGPT 搜索检索
          'Claude-SearchBot', // Claude 搜索检索
          'PerplexityBot', // Perplexity 搜索
          'ChatGPT-User', // 用户主动查询触发
          'Claude-User', // 用户主动查询触发
          'Perplexity-User', // 用户主动查询触发
          'Google-Agent', // 用户主动查询触发
        ],
        allow: '/',
        disallow: restrictedPaths,
      },
      // AI 训练爬虫（封锁）
      {
        userAgent: [
          'GPTBot', // OpenAI 训练爬虫
          'ClaudeBot', // Anthropic 训练爬虫
          'CCBot', // Common Crawl 训练
          'Meta-ExternalAgent', // Meta 训练爬虫
          'Google-Extended', // Google AI 训练退出标识
          'Applebot-Extended', // Apple AI 训练退出标识
          'Bytespider', // ByteDance 未声明爬虫
        ],
        disallow: ['/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
