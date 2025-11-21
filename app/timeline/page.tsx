import { siteConfig } from '@/lib/config'
import { generateCanonicalUrl } from '@/lib/seo'
import { timelineData } from '@/lib/timeline'
import { TimelineView } from '@/components/timeline-view'
import { pageMetadata } from '@/lib/pages'
import type { Metadata } from 'next'

const ogImageParams = new URLSearchParams({
  title: pageMetadata.timeline.title,
  subtitle: `共 ${timelineData.length} 条记录，${pageMetadata.timeline.description}`,
  type: 'timeline',
  count: timelineData.length.toString(),
})

const ogImageUrl = `${siteConfig.url}/api/og?${ogImageParams.toString()}`

export const metadata: Metadata = {
  title: pageMetadata.timeline.title,
  description: pageMetadata.timeline.description,
  alternates: {
    canonical: generateCanonicalUrl('/timeline'),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl('/timeline'),
    title: `${pageMetadata.timeline.title} | ${siteConfig.name}`,
    description: pageMetadata.timeline.description,
    siteName: siteConfig.name,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${pageMetadata.timeline.title} | ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageMetadata.timeline.title} | ${siteConfig.name}`,
    description: pageMetadata.timeline.description,
    creator: siteConfig.author.twitter,
    images: [ogImageUrl],
  },
}

export default function TimelinePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">大事记</h1>
        <p className="text-text-secondary">
          共 {timelineData.length.toLocaleString('zh-CN')} 条记录，记录生活中的重要时刻和里程碑。
        </p>
      </section>

      {/* Timeline Content */}
      <TimelineView items={timelineData} />
    </div>
  )
}
