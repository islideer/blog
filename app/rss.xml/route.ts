import { Feed } from 'feed'
import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-static'

export async function GET() {
  const siteUrl = 'https://blog.viki.moe'
  const posts = getAllPosts()

  const feed = new Feed({
    title: 'Viki 写东西的地方',
    description: '分享技术和日常',
    id: siteUrl,
    link: siteUrl,
    language: 'zh-CN',
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} Viki. 所有文章均遵循 CC BY-SA 4.0 协议，转载请注明出处。`,
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
      id: `${siteUrl}/${post.slug}`,
      link: `${siteUrl}/${post.slug}`,
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
