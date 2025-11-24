import { dayjs } from '@/lib/dayjs'
import Image from 'next/image'
import { siteConfig } from '@/lib/config'
import { getAllMioSays } from '@/lib/mio-says'
import { generateCanonicalUrl } from '@/lib/seo'
import { renderMarkdown } from '@/lib/markdown-utils'
import { pageMetadata } from '@/lib/pages'
import { RelativeTime } from '@/components/relative-time'

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const mioSays = await getAllMioSays()

  // 获取最新 Mio 说内容（截断到 80 字）
  const latestContent =
    mioSays.length > 0
      ? mioSays[0].content.length > 80
        ? `${mioSays[0].content.slice(0, 80)}...`
        : mioSays[0].content
      : 'Mio 的专属发言空间'

  // 获取最新更新时间（使用绝对时间，避免缓存问题）
  const lastUpdate = mioSays.length > 0 ? dayjs(mioSays[0].date).format('YYYY/MM/DD HH:mm') : ''

  const ogImageParams = new URLSearchParams({
    title: pageMetadata.mioSays.title,
    subtitle: latestContent,
    type: 'mio-says',
    count: mioSays.length.toString(),
    lastUpdate: lastUpdate,
    v: siteConfig.openGraph.version.toString(), // 版本号用于缓存控制
  })

  const ogImageUrl = `${siteConfig.url}/api/og?${ogImageParams.toString()}`

  return {
    title: pageMetadata.mioSays.title,
    description: pageMetadata.mioSays.description,
    alternates: {
      canonical: generateCanonicalUrl('/mio-says'),
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url: generateCanonicalUrl('/mio-says'),
      title: `${pageMetadata.mioSays.title} | ${siteConfig.name}`,
      description: pageMetadata.mioSays.description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${pageMetadata.mioSays.title} | ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageMetadata.mioSays.title} | ${siteConfig.name}`,
      description: pageMetadata.mioSays.description,
      creator: siteConfig.author.twitter,
      images: [ogImageUrl],
    },
  }
}

export default async function MioSaysPage() {
  const mioSays = await getAllMioSays()

  return (
    <div className="space-y-12 py-8 sm:py-12">
      {/* Header */}
      <section className="flex flex-row gap-6 sm:items-start sm:justify-between">
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-mio-pink)' }}>
            Mio 说
          </h1>
          <p className="text-text-secondary">
            {`Mio 的专属发言空间，Viki 无编辑权限，共 ${mioSays.length.toLocaleString('zh-CN')} 条内容。`}
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
          {mioSays.length === 0 ? (
            <p className="text-text-tertiary text-sm italic opacity-60">
              Mio 还没有说什么，敬请期待
            </p>
          ) : (
            mioSays.map((mioSay, index) => (
              <article
                key={mioSay.id}
                className="space-y-2 pb-8"
                style={{
                  borderBottom:
                    index < mioSays.length - 1 ? `1px solid var(--color-mio-border)` : 'none',
                }}
              >
                {/* 序号和日期时间 */}
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xs font-semibold"
                    style={{ color: 'var(--color-mio-pink)', opacity: 0.7 }}
                  >
                    #{mioSay.id}
                  </span>
                  <span style={{ color: 'var(--color-mio-pink)', opacity: 0.4 }}>·</span>
                  <RelativeTime
                    date={mioSay.date}
                    className="text-xs"
                    style={{ color: 'var(--color-mio-pink)', opacity: 0.7 }}
                  />
                </div>

                {/* 文本内容 */}
                {mioSay.content && mioSay.content.trim() !== '' && (
                  <p className="text-sm leading-relaxed">{renderMarkdown(mioSay.content)}</p>
                )}

                {/* 图片 */}
                {mioSay.images && mioSay.images.length > 0 && (
                  <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                    {mioSay.images.map((image, index) => (
                      <div
                        key={index}
                        className="flex max-h-[600px] max-w-full items-center justify-center overflow-hidden rounded border"
                        style={{ borderColor: 'var(--color-mio-border)' }}
                      >
                        <Image
                          src={image}
                          alt={
                            mioSay.content && mioSay.content.trim() !== ''
                              ? `${mioSay.content.slice(0, 20)}... 的图片 ${index + 1}`
                              : `Mio 说图片 ${index + 1}`
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
