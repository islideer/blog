import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  // 获取最新文章的发布时间
  const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : new Date()

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: latestPostDate, // 首页随最新文章更新
      changeFrequency: 'daily',
      priority: 1.0, // 最高优先级
    },
    {
      url: `${siteConfig.url}/posts`,
      lastModified: latestPostDate, // 文章列表页随最新文章更新
      changeFrequency: 'weekly',
      priority: 0.9, // 高优先级
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6, // 中等优先级
    },
    {
      url: `${siteConfig.url}/timeline`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5, // 中等优先级
    },
    {
      url: `${siteConfig.url}/thoughts`,
      lastModified: new Date(),
      changeFrequency: 'hourly', // 小时级别更新
      priority: 0.6, // 中高优先级（频繁更新）
    },
    {
      url: `${siteConfig.url}/mio-says`,
      lastModified: new Date(),
      changeFrequency: 'hourly', // 小时级别更新
      priority: 0.6, // 中高优先级（频繁更新）
    },
  ]

  // 博客文章页面
  const postPages: MetadataRoute.Sitemap = posts.map((post) => {
    const postDate = new Date(post.date)
    const now = new Date()
    const daysSincePublished = Math.floor(
      (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24),
    )

    // 根据文章新旧程度调整优先级
    // 新文章（30 天内）：0.9
    // 中等新鲜度（30-180 天）：0.8
    // 旧文章（180 天以上）：0.7
    let priority = 0.7
    if (daysSincePublished <= 30) {
      priority = 0.9
    } else if (daysSincePublished <= 180) {
      priority = 0.8
    }

    return {
      url: `${siteConfig.url}/${post.slug}`,
      lastModified: postDate,
      changeFrequency: 'monthly' as const,
      priority,
    }
  })

  return [...staticPages, ...postPages]
}
