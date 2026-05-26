import { Feed } from 'feed'
import { pages, mioSays } from '@/lib/data'
import { siteConfig } from '@/lib/config'
import { cleanMarkdownContent, parseMarkdown } from '@/lib/markdown'

export const dynamic = 'force-static'
export const revalidate = 14400 // 缓存 4 小时

const author = {
  name: siteConfig.lover.name,
}

export async function GET() {
  // 按日期从新到旧排序
  const sortedMioSays = mioSays.toSorted((a, b) => (a.date < b.date ? 1 : -1))

  const feed = new Feed({
    id: `${siteConfig.url}${pages.mioSays.slug}`,
    title: `${pages.mioSays.title} | ${siteConfig.name}`,
    description: pages.mioSays.description,
    link: `${siteConfig.url}${pages.mioSays.slug}`,
    language: siteConfig.language,
    image: `${siteConfig.url}/apple-icon.png`, // RSS 阅读器显示的图片
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `© ${siteConfig.copyright.year.start}-${siteConfig.copyright.year.end} ${siteConfig.author.name}. 所有${pages.mioSays.title}均遵循 ${siteConfig.copyright.license.name} 协议，转载请注明出处。`,
    updated: new Date(sortedMioSays[0]?.date || Date.now()),
    generator: 'Next.js 16 + Feed', // 生成器信息
    feedLinks: {
      rss2: `${siteConfig.url}${pages.mioSays.slug}/${siteConfig.links.rss}`,
      // json: `${siteConfig.url}${pages.mioSays.slug}/feed.json`, // 可选：JSON Feed
      // atom: `${siteConfig.url}${pages.mioSays.slug}/atom.xml`, // 可选：Atom Feed
    },
    author,
  })

  // 只包含最新的 60 篇内容
  const recentMioSays = sortedMioSays.slice(0, 60)

  await Promise.all(
    recentMioSays.map(async (mioSay) => {
      const rawImage = mioSay?.images?.[0]
      const imageUrl = rawImage
        ? rawImage.startsWith('http')
          ? rawImage
          : `${siteConfig.url}${rawImage}`
        : undefined

      const rawContent = cleanMarkdownContent(mioSay.content || '')

      function createRawContent(maxLength = 20) {
        const end = rawContent.length > maxLength ? '...' : ''
        const content = rawContent.substring(0, maxLength) + end || '无内容'
        const hasImage = mioSay?.images && mioSay.images.length > 0
        return `${hasImage ? '[图]' : ''} ${content}`
      }

      function createImageMd() {
        if (mioSay?.images && mioSay.images.length > 0) {
          return mioSay.images
            .map((img) => `![image](${img.startsWith('http') ? img : `${siteConfig.url}${img}`})`)
            .join('\n\n')
        }
        return ''
      }

      const md = `${mioSay.content || ''}\n\n${createImageMd()}`.trim()

      const htmlContent = (await parseMarkdown(md))
        .replace(/\s*data\-zoomable\s*/g, ' ')
        .replace(/\s*alt="[^"]+"\s*/g, ' ')
        .replace(/\s*data\-zoom\-src="[^"]+"\s*/g, ' ')
        .replace(/\s*>/g, '>')

      feed.addItem({
        id: `${siteConfig.url}${pages.mioSays.slug}/${mioSay.id}`,
        title: `#${mioSay.id} ${createRawContent(40)}`,
        description: `#${mioSay.id} ${createRawContent(120)}`,
        link: `${siteConfig.url}${pages.mioSays.slug}/${mioSay.id}`,
        content: htmlContent,
        author: [author],
        date: new Date(mioSay.date),
        published: new Date(mioSay.date),
        guid: `${siteConfig.url}${pages.mioSays.slug}/${mioSay.id}`,
        ...(imageUrl ? { image: imageUrl } : {}),
      })
    }),
  )

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // 缓存 1 小时，对于博客来说足够了
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
