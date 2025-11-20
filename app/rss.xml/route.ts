import { Feed } from 'feed'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'

export const dynamic = 'force-static'

export async function GET() {
  const posts = getAllPosts()

  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: siteConfig.language,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.author.name}. 所有文章均遵循 ${siteConfig.copyright.license.name} 协议，转载请注明出处。`,
    updated: new Date(posts[0]?.date || Date.now()),
    feedLinks: {
      rss2: `${siteConfig.url}${siteConfig.links.rss}`,
    },
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: siteConfig.author.github,
    },
  })

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/${post.slug}`,
      link: `${siteConfig.url}/${post.slug}`,
      description: post.excerpt,
      content: post.excerpt,
      author: [
        {
          name: siteConfig.author.name,
          email: siteConfig.author.email,
          link: siteConfig.author.github,
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
