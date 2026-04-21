import { pages } from '@/lib/data'
import { timeline } from '@/lib/data'
import { BackToTop } from '@/components/back-to-top'
import { siteConfig } from '@/lib/config'
import { TimelineView } from './_components/timeline-view'
import { generateCanonicalUrl, generateWebPageSchema } from '@/lib/seo'
import { StaticTableOfContents } from '@/components/table-of-contents'
import { cleanMarkdownContent, truncateText } from '@/lib/markdown'

import type { Metadata } from 'next'

export const revalidate = 86400 // 缓存 1 天

export const metadata: Metadata = {
  title: pages.timeline.title,
  description: pages.timeline.description,
  alternates: {
    canonical: generateCanonicalUrl(pages.timeline.slug),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl(pages.timeline.slug),
    title: `${pages.timeline.title} | ${siteConfig.name}`,
    description: pages.timeline.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: pages.timeline.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pages.timeline.title} | ${siteConfig.name}`,
    description: pages.timeline.description,
    images: [`${siteConfig.url}/opengraph-image`],
  },
}

export default function TimelinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebPageSchema(
              pages.timeline.title,
              pages.timeline.description,
              pages.timeline.slug,
            ),
          ),
        }}
      />
      <StaticTableOfContents
        behavior="auto"
        items={timeline.map((item, idx) => ({
          id: String(timeline.length - idx), // 反向 ID，最新的在前
          title: `${item.date} / ${truncateText(cleanMarkdownContent(item.description), 10)}`,
        }))}
      />

      {/* Back to Top Button */}
      <BackToTop />

      <div className="space-y-12 py-8 sm:py-12">
        {/* Header */}
        <section className="space-y-3">
          <h1 className="text-3xl font-bold">{pages.timeline.title}</h1>
          <p className="text-text-secondary">
            {`${pages.timeline.description}，共 ${timeline.length.toLocaleString('zh-Hans-CN')} 条记录，按年份分组展示。`}
          </p>
        </section>

        {/* Timeline Content */}
        <TimelineView items={timeline} />
      </div>
    </>
  )
}
