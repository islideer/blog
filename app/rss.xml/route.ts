import { Feed } from 'feed'
import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-static'

export async function GET() {
  const siteUrl = 'https://viki.moe'
  const posts = getAllPosts()

  const feed = new Feed({
    title: 'Viki 写东西的地方',
    description: '分享前端技术见解和实验最新 Web 特性。Less is more.',
    id: siteUrl,
    link: siteUrl,
    language: 'zh-CN',
    image: `${siteUrl}/og-image.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} Viki. 基于 CC BY-SA 4.0 协议`,
    updated: new Date(posts[0]?.date || Date.now()),
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
    author: {
      name: 'Viki',
      email: 'hi@viki.moe',
      link: 'https://github.com/vikiboss',
    },
  })

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.excerpt,
      content: post.excerpt,
      author: [
        {
          name: 'Viki',
          email: 'hi@viki.moe',
          link: 'https://github.com/vikiboss',
        },
      ],
      date: new Date(post.date),
      category: post.tags?.map((tag) => ({ name: tag })),
    })
  })

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
