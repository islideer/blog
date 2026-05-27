import { pages, thoughts } from '@/lib/data'
import { BackToTop } from '@/components/back-to-top'
import { siteConfig } from '@/lib/config'
import { countWords } from '@/lib/word-count'
import { ThoughtsPageContent } from '@/components/thoughts-page-content'
import { generateCanonicalUrl, generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo'
import { getThoughtsPage } from '@/actions/thoughts'
import { RSSIcon } from '@/icons/rss'

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

  // 首屏加载前 5 条
  const { items: initialItems, hasMore: initialHasMore } = await getThoughtsPage('thoughts', 1)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebPageSchema(
              pages.thoughts.title,
              pages.thoughts.description,
              pages.thoughts.slug,
            ),
          ),
        }}
      />
      {/* Back to Top Button */}
      <BackToTop />

      {/* Preconnect to external domains for better performance */}
      <link rel="preconnect" href="https://s2.loli.net" />
      <link rel="dns-prefetch" href="https://s2.loli.net" />
      <link rel="preconnect" href="https://image.viki.moe" />
      <link rel="dns-prefetch" href="https://image.viki.moe" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: '首页', url: '/' },
              { name: pages.thoughts.title, url: pages.thoughts.slug },
            ]),
          ),
        }}
      />
      <div className="space-y-12 py-8 sm:py-12">
        {/* Header */}
        <section className="space-y-3">
          <div className="flex items-baseline gap-2">
            <h1 className="text-3xl font-bold sm:text-4xl">{pages.thoughts.title}</h1>
            <a
              href="/thoughts/rss"
              target="_blank"
              rel="noopener noreferrer"
              className="no-icon group/btn text-text-secondary sm:hover:bg-bg-secondary sm:hover:text-text-primary active:bg-bg-secondary active:text-text-primary inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-xs no-underline transition-colors"
              aria-label="RSS"
            >
              <span className="inline-flex items-center gap-1.5 transition-transform group-active/btn:scale-90">
                <RSSIcon className="h-3.5 w-3.5" />
                RSS
              </span>
            </a>
          </div>
          <p className="text-text-secondary">
            {`${pages.thoughts.description}，共 ${sortedThoughts.length.toLocaleString('zh-Hans-CN')} 条内容，月均 ${averagePerMonth.toLocaleString('zh-Hans-CN')} 条，累计 ${totalWords.toLocaleString('zh-Hans-CN')} 字。`}
          </p>
        </section>

        {/* Thoughts Timeline */}
        <section className="space-y-4">
          <div className="border-border-tertiary sm:border-l-2 sm:pl-6">
            <ThoughtsPageContent
              type="thoughts"
              initialItems={initialItems}
              initialHasMore={initialHasMore}
              emptyMessage="还没有碎碎念，快来记录吧"
              contentPrefix="碎碎念"
            />
          </div>
        </section>
      </div>
    </>
  )
}
