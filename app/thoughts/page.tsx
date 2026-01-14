import { siteConfig } from '@/lib/config'
import { thoughts } from '@/lib/data'
import { generateCanonicalUrl } from '@/lib/seo'
import { pagesData } from '@/lib/data'

import { countWords } from '@/lib/word-count'
import { ThoughtsList } from '@/components/thoughts-list'

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pagesData.thoughts.title,
    description: pagesData.thoughts.description,
    alternates: {
      canonical: generateCanonicalUrl(pagesData.thoughts.slug),
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url: generateCanonicalUrl(pagesData.thoughts.slug),
      title: `${pagesData.thoughts.title} | ${siteConfig.name}`,
      description: pagesData.thoughts.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${pagesData.thoughts.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: pagesData.thoughts.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pagesData.thoughts.title} | ${siteConfig.name}`,
      description: pagesData.thoughts.description,
      images: [`${pagesData.thoughts.slug}/opengraph-image`],
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

  return (
    <div className="space-y-12 py-8 sm:py-12">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">{pagesData.thoughts.title}</h1>
        <p className="text-text-secondary">
          {`${pagesData.thoughts.description}，共 ${sortedThoughts.length.toLocaleString('zh-Hans-CN')} 条内容，月均 ${averagePerMonth.toLocaleString('zh-Hans-CN')} 条，累计 ${totalWords.toLocaleString('zh-Hans-CN')} 字。`}
        </p>
      </section>

      {/* Thoughts Timeline */}
      <section className="space-y-4">
        <div className="sm:border-l-2 sm:pl-6" style={{ borderColor: 'rgba(128, 128, 128, 0.2)' }}>
          <ThoughtsList
            thoughts={sortedThoughts}
            emptyMessage="还没有碎碎念，快来记录吧"
            contentPrefix="碎碎念"
          />
        </div>
      </section>
    </div>
  )
}
