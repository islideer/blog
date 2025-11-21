import { siteConfig } from '@/lib/config'
import { generateCanonicalUrl } from '@/lib/seo'
import { timelineData } from '@/lib/timeline'
import { TimelineView } from '@/components/timeline-view'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '大事记',
  description: '记录生活中的重要时刻和里程碑',
  alternates: {
    canonical: generateCanonicalUrl('/timeline'),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl('/timeline'),
    title: '大事记',
    description: '记录生活中的重要时刻和里程碑',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: '大事记',
    description: '记录生活中的重要时刻和里程碑',
    creator: siteConfig.author.twitter,
  },
}

export default function TimelinePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">大事记</h1>
        <p className="text-text-secondary">
          共 {timelineData.length.toLocaleString('zh-CN')}{' '}
          条记录，记录生活中的重要时刻和里程碑。
        </p>
      </section>

      {/* Timeline Content */}
      <TimelineView items={timelineData} />
    </div>
  )
}
