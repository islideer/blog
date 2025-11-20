import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Image from 'next/image'
import { siteConfig } from '@/lib/config'
import { getAllThoughts } from '@/lib/thoughts'
import { generateCanonicalUrl } from '@/lib/seo'
import { renderMarkdown } from '@/lib/markdown-utils'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '碎碎念',
  description: '记录生活中的点滴想法和碎碎念',
  alternates: {
    canonical: generateCanonicalUrl('/thoughts'),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl('/thoughts'),
    title: '碎碎念',
    description: '记录生活中的点滴想法和碎碎念',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: '碎碎念',
    description: '记录生活中的点滴想法和碎碎念',
    creator: siteConfig.author.twitter,
  },
}

export default async function ThoughtsPage() {
  dayjs.locale('zh-cn')
  const thoughts = await getAllThoughts()

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">碎碎念</h1>
        <p className="text-text-secondary">
          共 {thoughts.length.toLocaleString('zh-CN')} 条碎碎念，记录生活中的点滴想法
        </p>
      </section>

      {/* Thoughts Timeline */}
      <section className="space-y-4">
        <div
          className="space-y-12 border-l-2 pl-4 sm:pl-6"
          style={{ borderColor: 'rgba(128, 128, 128, 0.2)' }}
        >
          {thoughts.length === 0 ? (
            <p className="text-text-tertiary text-sm italic opacity-60">还没有碎碎念，快来记录吧</p>
          ) : (
            thoughts.map((thought, index) => (
              <article
                key={thought.id}
                className="space-y-3 pb-12"
                style={{
                  borderBottom:
                    index < thoughts.length - 1 ? '1px solid rgba(128, 128, 128, 0.15)' : 'none',
                }}
              >
                {/* 日期时间 */}
                <time className="text-text-tertiary block text-xs sm:text-sm">
                  {dayjs(thought.date).format('YYYY.MM.DD HH:mm ddd')}
                </time>

                <p>{renderMarkdown(thought.content)}</p>

                {/* 图片 */}
                {thought.images && thought.images.length > 0 && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {thought.images.map((image, index) => (
                      <div key={index} className="relative aspect-video overflow-hidden rounded">
                        <Image
                          src={image}
                          alt={`${thought.content.slice(0, 20)}... 的图片 ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
