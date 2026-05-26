import { Feed } from 'feed'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'

export const dynamic = 'force-static'
export const revalidate = 86400 // 缓存 1 天

const author = {
  name: siteConfig.author.name,
  email: siteConfig.author.email,
  link: siteConfig.author.github,
}

export async function GET() {
  const posts = await getAllPosts()

  const feed = new Feed({
    id: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    link: siteConfig.url,
    language: siteConfig.language,
    image: `${siteConfig.url}/apple-icon.png`, // RSS 阅读器显示的图片
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `© ${siteConfig.copyright.year.start}-${siteConfig.copyright.year.end} ${siteConfig.author.name}. 所有文章均遵循 ${siteConfig.copyright.license.name} 协议，转载请注明出处。`,
    updated: new Date(posts[0]?.date || Date.now()),
    generator: 'Next.js 16 + Feed', // 生成器信息
    feedLinks: {
      rss2: `${siteConfig.url}${siteConfig.links.rss}`,
      // json: `${siteConfig.url}/feed.json`, // 可选：JSON Feed
      // atom: `${siteConfig.url}/atom.xml`, // 可选：Atom Feed
    },
    author,
  })

  // 只包含最新的 20 篇文章（博客最佳实践）
  const recentPosts = posts.slice(0, 20)

  recentPosts.forEach((post) => {
    const rawImage = post.topImage || post.images[0]
    const imageUrl = rawImage
      ? rawImage.startsWith('http')
        ? rawImage
        : `${siteConfig.url}${rawImage}`
      : undefined

    feed.addItem({
      id: `${siteConfig.url}/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      link: `${siteConfig.url}/${post.slug}`,
      content: `<p>${post.excerpt}</p><br /><a href="${siteConfig.url}/${post.slug}" rel="nofollow noopener noreferrer" target="_blank">阅读全文 &raquo;</a>`,
      author: [author],
      date: new Date(post.date),
      published: new Date(post.date),
      category: post.tags?.map((tag) => ({ name: tag })) || [],
      guid: `${siteConfig.url}/${post.slug}`,
      ...(imageUrl ? { image: imageUrl } : {}),
    })
  })

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // 缓存 1 小时，对于博客来说足够了
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
