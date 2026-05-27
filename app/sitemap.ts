import { siteConfig } from '@/lib/config'
import { getAllPosts } from '@/lib/posts'
import { MetadataRoute } from 'next'
import { mioSays, pages, thoughts } from '@/lib/data'

export const dynamic = 'force-static'
export const revalidate = 86400 // 缓存 1 天

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  // 获取最新文章的发布时间
  const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : new Date()
  const latestThoughtDate = thoughts[0]?.date ? new Date(thoughts[0].date) : new Date()
  const latestMioSayDate = mioSays[0]?.date ? new Date(mioSays[0].date) : new Date()

  // 取三者中最新的日期作为首页和相关页面的 lastModified
  const latestDate = new Date(
    Math.max(latestPostDate.getTime(), latestThoughtDate.getTime(), latestMioSayDate.getTime()),
  )

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: latestDate, // 首页随最新文章更新
      changeFrequency: 'daily',
      priority: 1.0, // 最高优先级
    },
    {
      url: `${siteConfig.url}${siteConfig.links['llms.txt']}`,
      lastModified: latestDate, // llms.txt 首页随最新文章更新
      changeFrequency: 'daily',
      priority: 0.9, // 次高优先级
    },
    {
      url: `${siteConfig.url}${pages.posts.slug}`,
      lastModified: latestPostDate, // 文章列表页随最新文章更新
      changeFrequency: 'weekly',
      priority: 0.9, // 高优先级
    },
    {
      url: `${siteConfig.url}${pages.thoughts.slug}`,
      lastModified: latestThoughtDate, // 碎碎念列表页随最新文章更新
      changeFrequency: 'weekly', // 小时级别更新
      priority: 0.8, // 中高优先级（频繁更新）
    },
    {
      url: `${siteConfig.url}${pages.mioSays.slug}`,
      lastModified: latestMioSayDate, // Mio 说列表页随最新文章更新
      changeFrequency: 'weekly', // 小时级别更新
      priority: 0.8, // 中高优先级（频繁更新）
    },
    {
      url: `${siteConfig.url}${pages.about.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6, // 中等优先级
    },
    {
      url: `${siteConfig.url}${pages.timeline.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6, // 中等优先级
    },
    {
      url: `${siteConfig.url}${pages.friends.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6, // 中等优先级
    },
    {
      url: `${siteConfig.url}${pages.library.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6, // 中等优先级
    },
    {
      url: `${siteConfig.url}${pages.game.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6, // 中等优先级
    },
    {
      url: `${siteConfig.url}${pages.reading.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6, // 中等优先级
    },
    {
      url: `${siteConfig.url}${pages.collection.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6, // 中等优先级
    },
    {
      url: `${siteConfig.url}${pages.messages.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6, // 中等优先级
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

  // 碎碎念页面
  const thoughtPages: MetadataRoute.Sitemap = thoughts.map((thought) => {
    const thoughtDate = new Date(thought.date)
    const daysSincePublished = Math.floor(
      (Date.now() - thoughtDate.getTime()) / (1000 * 60 * 60 * 24),
    )

    return {
      url: `${siteConfig.url}${pages.thoughts.slug}/${thought.id}`,
      lastModified: thoughtDate,
      changeFrequency: 'monthly' as const,
      priority: daysSincePublished <= 7 ? 0.9 : 0.8, // 最近一周的碎碎念优先级更高
    }
  })

  // Mio 说页面
  const mioSayPages: MetadataRoute.Sitemap = mioSays.map((mioSay) => {
    const mioSayDate = new Date(mioSay.date)
    const daysSincePublished = Math.floor(
      (Date.now() - mioSayDate.getTime()) / (1000 * 60 * 60 * 24),
    )

    return {
      url: `${siteConfig.url}${pages.mioSays.slug}/${mioSay.id}`,
      lastModified: mioSayDate,
      changeFrequency: 'monthly' as const,
      priority: daysSincePublished <= 7 ? 0.9 : 0.8, // 最近一周的 Mio 说优先级更高
    }
  })

  return [...staticPages, ...postPages, ...thoughtPages, ...mioSayPages]
}
