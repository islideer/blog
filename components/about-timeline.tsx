import type { TimelineItem } from '@/lib/about-data'

interface AboutTimelineProps {
  items: TimelineItem[]
}

export function AboutTimeline({ items }: AboutTimelineProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-text-secondary text-sm font-semibold tracking-wider uppercase">
        Timeline
      </h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between gap-2">
            <p className="text-text-secondary">{item.description}</p>
            <time className="text-text-tertiary shrink-0 text-sm">{item.date}</time>
          </div>
        ))}
      </div>
    </section>
  )
}
