import { siteConfig } from '@/lib/config'
import { generateCanonicalUrl } from '@/lib/seo'
import { timeline } from '@/lib/data'
import { TimelineView } from '@/components/timeline/timeline-view'
import { pages } from '@/lib/data'

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
        url: `${pages.timeline.slug}/opengraph-image`,
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
    images: [`${pages.timeline.slug}/opengraph-image`],
  },
}

export default function TimelinePage() {
  return (
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
  )
}
