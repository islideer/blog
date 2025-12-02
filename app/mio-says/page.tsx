import Image from 'next/image'
import { LazyImage } from '@/components/lazy-image'
import { siteConfig } from '@/lib/config'
import { mioSays } from '@/lib/data'
import { generateCanonicalUrl } from '@/lib/seo'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxOptionsWithBreaks } from '@/lib/mdx'
import { pagesData } from '@/lib/config'
import { RelativeTime } from '@/components/relative-time'

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pagesData.mioSays.title,
    description: pagesData.mioSays.description,
    alternates: {
      canonical: generateCanonicalUrl('/mio-says'),
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url: generateCanonicalUrl('/mio-says'),
      title: `${pagesData.mioSays.title} | ${siteConfig.name}`,
      description: pagesData.mioSays.description,
      siteName: siteConfig.name,
      images: [
        {
          url: '/mio-says/opengraph-image',
          width: 1200,
          height: 630,
          alt: pagesData.mioSays.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pagesData.mioSays.title} | ${siteConfig.name}`,
      description: pagesData.mioSays.description,
      images: ['/mio-says/opengraph-image'],
    },
  }
}

export default async function MioSaysPage() {
  // 按日期从新到旧排序
  const sortedMioSays = mioSays.toSorted((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="space-y-12 py-8 sm:py-12">
      {/* Header */}
      <section className="flex flex-row gap-6 sm:items-start sm:justify-between">
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-mio-pink)' }}>
            Mio 说
          </h1>
          <p className="text-text-secondary">
            {`Mio 的专属发言空间，Viki 无编辑权限。共 ${sortedMioSays.length.toLocaleString('zh-CN')} 条内容。`}
          </p>
        </div>
        <div className="shrink-0 self-end">
          <Image
            src="https://s2.loli.net/2025/11/21/CcTp4FnkGH6dO1g.png"
            alt="Mio with Viki"
            width={160}
            height={100}
            className="h-auto w-32 rounded-lg sm:w-40"
            priority
          />
        </div>
      </section>

      {/* Mio Says Timeline */}
      <section className="space-y-4">
        <div
          className="space-y-8 sm:border-l-2 sm:pl-6"
          style={{ borderColor: 'var(--color-mio-border)' }}
        >
          {sortedMioSays.length === 0 ? (
            <p className="text-text-tertiary text-sm italic opacity-60">
              Mio 还没有说什么，敬请期待
            </p>
          ) : (
            sortedMioSays.map((mioSay, index) => (
              <article
                key={mioSay.id}
                id={mioSay.id}
                className="space-y-2 pb-8"
                style={{
                  borderBottom:
                    index < sortedMioSays.length - 1 ? `1px solid var(--color-mio-border)` : 'none',
                }}
              >
                {/* 序号和日期时间 */}
                <div className="flex items-center gap-2">
                  <a
                    href={`#${mioSay.id}`}
                    style={{ color: 'var(--color-mio-pink)' }}
                    className="cursor-pointer font-mono text-xs font-semibold no-underline hover:underline"
                  >
                    #{mioSay.id}
                  </a>
                  <span style={{ color: 'var(--color-mio-pink)', opacity: 0.4 }}>·</span>
                  <RelativeTime
                    date={mioSay.date}
                    className="text-xs"
                    style={{ color: 'var(--color-mio-pink)', opacity: 0.7 }}
                  />
                </div>

                {/* 文本内容 */}
                {mioSay.content && mioSay.content.trim() !== '' && (
                  <div className="prose prose-sm">
                    <MDXRemote source={mioSay.content} options={mdxOptionsWithBreaks} />
                  </div>
                )}

                {/* 图片 */}
                {mioSay.images && mioSay.images.length > 0 && (
                  <div
                    className={`grid grid-cols-1 gap-2 pt-1 ${mioSay.images.length > 1 ? 'sm:grid-cols-2' : 'sm:max-w-md'}`}
                  >
                    {mioSay.images.map((image, imageIndex) => {
                      // 前 3 条内容的第一张图片优先加载,其他懒加载
                      const shouldPriority = index < 3 && imageIndex === 0

                      return (
                        <div
                          key={imageIndex}
                          className="flex max-w-full items-center justify-center overflow-hidden rounded border"
                          style={{
                            borderColor: 'var(--color-mio-border)',
                            backgroundColor: 'var(--color-image-bg)',
                          }}
                        >
                          <LazyImage
                            src={image}
                            alt={
                              mioSay.content && mioSay.content.trim() !== ''
                                ? `${mioSay.content.slice(0, 20)}... 的图片 ${imageIndex + 1}`
                                : `Mio 说图片 ${imageIndex + 1}`
                            }
                            width={540}
                            height={304}
                            className="w-full"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            preload={shouldPriority}
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
