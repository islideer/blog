import { LazyImage } from '@/components/lazy-image'
import { siteConfig } from '@/lib/config'
import { thoughts } from '@/lib/data'
import { generateCanonicalUrl } from '@/lib/seo'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxOptionsWithBreaks } from '@/lib/mdx'
import { pagesData } from '@/lib/config'
import { RelativeTime } from '@/components/relative-time'

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pagesData.thoughts.title,
    description: pagesData.thoughts.description,
    alternates: {
      canonical: generateCanonicalUrl('/thoughts'),
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url: generateCanonicalUrl('/thoughts'),
      title: `${pagesData.thoughts.title} | ${siteConfig.name}`,
      description: pagesData.thoughts.description,
      siteName: siteConfig.name,
      images: [
        {
          url: '/thoughts/opengraph-image',
          width: 1200,
          height: 630,
          alt: pagesData.thoughts.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pagesData.thoughts.title} | ${siteConfig.name}`,
      description: pagesData.thoughts.description,
      images: ['/thoughts/opengraph-image'],
    },
  }
}

export default async function ThoughtsPage() {
  // 按日期从新到旧排序
  const sortedThoughts = thoughts.toSorted((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="space-y-12 py-8 sm:py-12">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">碎碎念</h1>
        <p className="text-text-secondary">
          Viki 的碎碎念小角落，记录生活中的点滴想法和言论，共{' '}
          {sortedThoughts.length.toLocaleString('zh-CN')} 条内容。
        </p>
      </section>

      {/* Thoughts Timeline */}
      <section className="space-y-4">
        <div
          className="space-y-8 sm:border-l-2 sm:pl-4 sm:pl-6"
          style={{ borderColor: 'rgba(128, 128, 128, 0.2)' }}
        >
          {sortedThoughts.length === 0 ? (
            <p className="text-text-tertiary text-sm italic opacity-60">还没有碎碎念，快来记录吧</p>
          ) : (
            sortedThoughts.map((thought, index) => (
              <article
                key={thought.id}
                className="space-y-2 pb-8"
                style={{
                  borderBottom:
                    index < sortedThoughts.length - 1
                      ? '1px solid rgba(128, 128, 128, 0.1)'
                      : 'none',
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
                  <div className="prose-blog prose-blog-small">
                    <MDXRemote source={thought.content} options={mdxOptionsWithBreaks} />
                  </div>
                )}

                {/* 图片 */}
                {thought.images && thought.images.length > 0 && (
                  <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                    {thought.images.map((image, imageIndex) => {
                      // 前 3 条内容的第一张图片优先加载,其他懒加载
                      const shouldPriority = index < 3 && imageIndex === 0

                      return (
                        <div
                          key={imageIndex}
                          className="flex max-h-[600px] max-w-full items-center justify-center overflow-hidden rounded border border-zinc-200 dark:border-zinc-700"
                        >
                          <LazyImage
                            src={image}
                            alt={
                              thought.content && thought.content.trim() !== ''
                                ? `${thought.content.slice(0, 20)}... 的图片 ${imageIndex + 1}`
                                : `碎碎念图片 ${imageIndex + 1}`
                            }
                            width={800}
                            height={600}
                            className="h-auto max-h-full w-full object-contain"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            priority={shouldPriority}
                          />
                        </div>
                      )
                    })}
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
