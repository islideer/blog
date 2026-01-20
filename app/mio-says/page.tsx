import Image from 'next/image'
import { siteConfig } from '@/lib/config'
import { mioSays } from '@/lib/data'
import { generateCanonicalUrl } from '@/lib/seo'
import { pages } from '@/lib/data'
import { countWords } from '@/lib/word-count'
import { ThoughtsList } from '@/components/thoughts-list'

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pages.mioSays.title,
    description: pages.mioSays.description,
    alternates: {
      canonical: generateCanonicalUrl(pages.mioSays.slug),
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url: generateCanonicalUrl(pages.mioSays.slug),
      title: `${pages.mioSays.title} | ${siteConfig.name}`,
      description: pages.mioSays.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${pages.mioSays.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: pages.mioSays.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pages.mioSays.title} | ${siteConfig.name}`,
      description: pages.mioSays.description,
      images: [`${pages.mioSays.slug}/opengraph-image`],
    },
  }
}

export default async function MioSaysPage() {
  // 按日期从新到旧排序
  const sortedMioSays = mioSays.toSorted((a, b) => (a.date < b.date ? 1 : -1))

  const totalWords = sortedMioSays.reduce((sum, mioSay) => {
    return sum + (mioSay.content ? countWords(mioSay.content) : 0)
  }, 0)

  return (
    <div className="space-y-12 py-8 sm:py-12">
      {/* Header */}
      <section className="flex flex-row gap-6 sm:items-start sm:justify-between">
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-mio-pink)' }}>
            {pages.mioSays.title}
          </h1>
          <p className="text-text-secondary">
            {`${pages.mioSays.description}，共 ${sortedMioSays.length.toLocaleString('zh-Hans-CN')} 条内容，累计 ${totalWords.toLocaleString('zh-Hans-CN')} 字。`}
          </p>
        </div>
        <div className="shrink-0 self-end">
          <Image
            src="https://s2.loli.net/2025/11/21/CcTp4FnkGH6dO1g.png"
            alt={`${siteConfig.lover.name} with ${siteConfig.author.name}`}
            width={160}
            height={100}
            className="h-auto w-32 rounded-md sm:w-40"
            priority
          />
        </div>
      </section>

      {/* Mio Says Timeline */}
      <section className="space-y-4">
        <div className="sm:border-l-2 sm:pl-6" style={{ borderColor: 'var(--color-mio-border)' }}>
          <ThoughtsList
            thoughts={sortedMioSays}
            mioTheme
            emptyMessage={`${siteConfig.lover.name} 还没有说什么，敬请期待`}
            contentPrefix={`${siteConfig.lover.name} 说`}
          />
        </div>
      </section>
    </div>
  )
}
