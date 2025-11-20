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
    images: [
      {
        url: `${siteConfig.url}/api/og?title=${encodeURIComponent('碎碎念')}&subtitle=${encodeURIComponent('记录生活中的点滴想法')}&type=thoughts`,
        width: 1200,
        height: 630,
        alt: '碎碎念',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '碎碎念',
    description: '记录生活中的点滴想法和碎碎念',
    creator: siteConfig.author.twitter,
    images: [
      `${siteConfig.url}/api/og?title=${encodeURIComponent('碎碎念')}&subtitle=${encodeURIComponent('记录生活中的点滴想法')}&type=thoughts`,
    ],
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
          共 {thoughts.length.toLocaleString('zh-CN')} 条碎碎念，记录生活中的点滴想法。
        </p>
      </section>

      {/* Thoughts Timeline */}
      <section className="space-y-4">
        <div
          className="space-y-8 sm:border-l-2 sm:pl-6"
          style={{ borderColor: 'rgba(128, 128, 128, 0.2)' }}
        >
          {thoughts.length === 0 ? (
            <p className="text-text-tertiary text-sm italic opacity-60">还没有碎碎念，快来记录吧</p>
          ) : (
            thoughts.map((thought, index) => (
              <article
                key={thought.id}
                className="space-y-2 pb-8"
                style={{
                  borderBottom:
                    index < thoughts.length - 1 ? '1px solid rgba(128, 128, 128, 0.1)' : 'none',
                }}
              >
                {/* 日期时间 */}
                <div className="flex items-center gap-2">
                  <svg
                    className="text-text-tertiary size-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <time className="text-text-tertiary text-xs">
                    发布于 {dayjs(thought.date).format('YYYY.MM.DD HH:mm ddd')}
                  </time>
                </div>

                <p className="text-sm leading-relaxed">{renderMarkdown(thought.content)}</p>

                {/* 图片 */}
                {thought.images && thought.images.length > 0 && (
                  <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                    {thought.images.map((image, index) => (
                      <div
                        key={index}
                        className="flex max-h-[600px] max-w-full items-center justify-center overflow-hidden rounded border border-zinc-200 dark:border-zinc-700"
                      >
                        <Image
                          src={image}
                          alt={`${thought.content.slice(0, 20)}... 的图片 ${index + 1}`}
                          width={800}
                          height={600}
                          className="h-auto max-h-full w-full object-contain"
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
