import { pages } from '@/lib/data'
import { thoughts } from '@/lib/data'
import { BackToTop } from '@/components/back-to-top'
import { siteConfig } from '@/lib/config'
import { countWords } from '@/lib/word-count'
import { ThoughtsList } from '@/components/thoughts/thoughts-list'
import { generateCanonicalUrl } from '@/lib/seo'
import { getInteractionCounts } from '@/lib/interactions'
import { StaticTableOfContents } from '@/components/table-of-contents'

import type { Metadata } from 'next'

export const revalidate = 86400 // 缓存 1 天

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pages.thoughts.title,
    description: pages.thoughts.description,
    alternates: {
      canonical: generateCanonicalUrl(pages.thoughts.slug),
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url: generateCanonicalUrl(pages.thoughts.slug),
      title: `${pages.thoughts.title} | ${siteConfig.name}`,
      description: pages.thoughts.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: pages.thoughts.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pages.thoughts.title} | ${siteConfig.name}`,
      description: pages.thoughts.description,
      images: [`${siteConfig.url}/opengraph-image`],
    },
  }
}

export default async function ThoughtsPage() {
  // 按日期从新到旧排序
  const sortedThoughts = thoughts.toSorted((a, b) => (a.date < b.date ? 1 : -1))

  const totalWords = sortedThoughts.reduce((sum, thought) => {
    return sum + (thought.content ? countWords(thought.content) : 0)
  }, 0)

  const last = sortedThoughts[0]?.date || new Date().toISOString()
  const first = sortedThoughts[sortedThoughts.length - 1]?.date || new Date().toISOString()
  const avg = (new Date(last).getTime() - new Date(first).getTime()) / (1000 * 60 * 60 * 24 * 30)
  const averagePerMonth = Math.round(sortedThoughts.length / Math.max(1, avg) || 1)

  // 提取所有 ID 用于批量加载互动数据
  const ids = sortedThoughts.map((t) => t.id)

  // 服务端直接获取互动计数
  const counts = await getInteractionCounts('thoughts', ids)

  return (
    <>
      <StaticTableOfContents
        behavior="auto"
        items={ids.map((id) => ({
          id,
          title: `${pages.thoughts.title} #${id}`,
        }))}
      />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Preconnect to external domains for better performance */}
      <link rel="preconnect" href="https://s2.loli.net" />
      <link rel="dns-prefetch" href="https://s2.loli.net" />

      <div className="space-y-12 py-8 sm:py-12">
        {/* Header */}
        <section className="space-y-3">
          <h1 className="text-3xl font-bold">{pages.thoughts.title}</h1>
          <p className="text-text-secondary">
            {`${pages.thoughts.description}，共 ${sortedThoughts.length.toLocaleString('zh-Hans-CN')} 条内容，月均 ${averagePerMonth.toLocaleString('zh-Hans-CN')} 条，累计 ${totalWords.toLocaleString('zh-Hans-CN')} 字。`}
          </p>
        </section>

        {/* Thoughts Timeline */}
        <section className="space-y-4">
          <div className="border-border-tertiary sm:border-l-2 sm:pl-6">
            <ThoughtsList
              thoughts={sortedThoughts}
              counts={counts}
              emptyMessage="还没有碎碎念，快来记录吧"
              contentPrefix="碎碎念"
            />
          </div>
        </section>
      </div>
    </>
  )
}
