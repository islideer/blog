import Image from 'next/image'
import { dayjs } from '@/lib/dayjs'
import { siteConfig } from '@/lib/config'
import { getAllThoughts } from '@/lib/thoughts'
import { generateCanonicalUrl } from '@/lib/seo'
import { renderMarkdown } from '@/lib/markdown-utils'
import { pageMetadata } from '@/lib/pages'
import { RelativeTime } from '@/components/relative-time'

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const thoughts = await getAllThoughts()

  // 获取最新碎碎念内容（截断到 80 字）
  const latestContent =
    thoughts.length > 0
      ? thoughts[0].content.length > 80
        ? `${thoughts[0].content.slice(0, 80)}...`
        : thoughts[0].content
      : '碎碎念小角落，记录生活中的点滴想法和言论'

  // 获取最新更新时间（使用绝对时间，避免缓存问题）
  const lastUpdate = thoughts.length > 0 ? dayjs(thoughts[0].date).format('YYYY/MM/DD HH:mm') : ''

  const ogImageParams = new URLSearchParams({
    title: pageMetadata.thoughts.title,
    subtitle: latestContent,
    type: 'thoughts',
    count: thoughts.length.toString(),
    lastUpdate: lastUpdate,
    v: siteConfig.openGraph.version.toString(), // 版本号用于缓存控制
  })

  const ogImageUrl = `${siteConfig.url}/api/og?${ogImageParams.toString()}`

  return {
    title: pageMetadata.thoughts.title,
    description: pageMetadata.thoughts.description,
    alternates: {
      canonical: generateCanonicalUrl('/thoughts'),
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url: generateCanonicalUrl('/thoughts'),
      title: `${pageMetadata.thoughts.title} | ${siteConfig.name}`,
      description: pageMetadata.thoughts.description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${pageMetadata.thoughts.title} | ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageMetadata.thoughts.title} | ${siteConfig.name}`,
      description: pageMetadata.thoughts.description,
      creator: siteConfig.author.twitter,
      images: [ogImageUrl],
    },
  }
}

export default async function ThoughtsPage() {
  const thoughts = await getAllThoughts()

  return (
    <div className="space-y-12 py-8 sm:py-12">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">碎碎念</h1>
        <p className="text-text-secondary">
          Viki 的碎碎念小角落，记录生活中的点滴想法和言论，共{' '}
          {thoughts.length.toLocaleString('zh-CN')} 条内容。
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
                {/* 序号和日期时间 */}
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary font-mono text-xs font-semibold">
                    #{thought.id}
                  </span>
                  <span className="text-text-tertiary opacity-50">·</span>
                  <RelativeTime date={thought.date} className="text-text-secondary text-xs" />
                </div>

                {/* 文本内容 */}
                {thought.content && thought.content.trim() !== '' && (
                  <p className="text-sm leading-relaxed">{renderMarkdown(thought.content)}</p>
                )}

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
                          alt={
                            thought.content && thought.content.trim() !== ''
                              ? `${thought.content.slice(0, 20)}... 的图片 ${index + 1}`
                              : `碎碎念图片 ${index + 1}`
                          }
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
