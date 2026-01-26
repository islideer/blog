import { CollectionList } from '@/components/collection/collection-list'
import { collection, pages } from '@/lib/data'
import { siteConfig } from '@/lib/config'
import { generateCanonicalUrl } from '@/lib/seo'
import { StaticTableOfContents } from '@/components/table-of-contents'

import type { Metadata } from 'next'

export const revalidate = 86400 // 缓存 1 天

export const metadata: Metadata = {
  title: pages.collection.title,
  description: pages.collection.description,
  alternates: {
    canonical: generateCanonicalUrl(pages.collection.slug),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl(pages.collection.slug),
    title: `${pages.collection.title} | ${siteConfig.name}`,
    description: pages.collection.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${pages.collection.slug}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: pages.collection.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pages.collection.title} | ${siteConfig.name}`,
    description: pages.collection.description,
    images: [`${pages.collection.slug}/opengraph-image`],
  },
}

export default function CollectionPage() {
  return (
    <>
      <StaticTableOfContents
        items={collection.map((category) => ({
          id: category.category,
          title: category.title,
        }))}
      />

      <div className="space-y-8 py-8 sm:space-y-12 sm:py-12">
        {/* Header */}
        <section className="space-y-3" id="title">
          <h1 className="text-3xl font-bold">{pages.collection.title}</h1>
          <p className="text-text-secondary">{`${pages.collection.description}。`}</p>
        </section>

        {/* Collection Lists */}
        {collection.map((category) => (
          <CollectionList key={category.category} category={category} id={category.category} />
        ))}
      </div>
    </>
  )
}
