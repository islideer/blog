import dayjs from 'dayjs'
import type { TimelineItem } from '@/lib/about-data'

interface AboutTimelineProps {
  items: TimelineItem[]
}

export function AboutTimeline({ items }: AboutTimelineProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-text-secondary text-sm font-semibold tracking-wider uppercase">大事记</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <time className="text-text-tertiary shrink-0 font-mono text-sm">
              {dayjs(item.date).isValid() ? dayjs(item.date).format('YYYY/MM/DD') : item.date}
            </time>
            <p className="text-text-secondary">{item.description}</p>
          </div>
        ))}
        <div className="via-text-tertiary mt-2 h-0.5 w-12 bg-linear-to-r from-transparent to-transparent" />
      </div>
    </section>
  )
}
