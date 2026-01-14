import { siteConfig } from '@/lib/config'
import { generateCanonicalUrl } from '@/lib/seo'
import { timeline } from '@/lib/data'
import { TimelineView } from '@/components/timeline-view'
import { pagesData } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: pagesData.timeline.title,
  description: pagesData.timeline.description,
  alternates: {
    canonical: generateCanonicalUrl(pagesData.timeline.slug),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl(pagesData.timeline.slug),
    title: `${pagesData.timeline.title} | ${siteConfig.name}`,
    description: pagesData.timeline.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${pagesData.timeline.slug}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: pagesData.timeline.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pagesData.timeline.title} | ${siteConfig.name}`,
    description: pagesData.timeline.description,
    images: [`${pagesData.timeline.slug}/opengraph-image`],
  },
}

export default function TimelinePage() {
  return (
    <div className="space-y-12 py-8 sm:py-12">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">{pagesData.timeline.title}</h1>
        <p className="text-text-secondary">
          {`${pagesData.timeline.description}，共 ${timeline.length.toLocaleString('zh-Hans-CN')} 条记录，按年份分组展示。`}
        </p>
      </section>

      {/* Timeline Content */}
      <TimelineView items={timeline} />
    </div>
  )
}
