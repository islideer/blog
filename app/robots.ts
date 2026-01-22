import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'

export const dynamic = 'force-static'

const disallow = [
  '/api/', // 禁止爬取 API 路由
  '/out/', // 禁止爬取构建输出目录
  '/_next/', // 禁止爬取 Next.js 内部文件

  // 禁止爬取 opengraph 图片等动态生成的资源
  '/opengraph-image/',
  '/*/opengraph-image/',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
        crawlDelay: 0, // 无爬取延迟，鼓励爬取
      },
      // 针对常见搜索引擎的优化配置
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url, // 指定首选域名
  }
}
