import { Books } from '@/components/books'
import { Movies } from '@/components/movies'
import { Bangumi } from '@/components/bangumi'
import { Playlists } from '@/components/playlists'
import { siteConfig } from '@/lib/config'
import { pagesData } from '@/lib/data'
import { generateCanonicalUrl } from '@/lib/seo'
import { StaticTableOfContents } from '@/components/table-of-contents'
import { getBangumiList } from '@/lib/bangumi'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: pagesData.library.title,
  description: pagesData.library.description,
  alternates: {
    canonical: generateCanonicalUrl(pagesData.library.slug),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl(pagesData.library.slug),
    title: `${pagesData.library.title} | ${siteConfig.name}`,
    description: pagesData.library.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${pagesData.library.slug}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: pagesData.library.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pagesData.library.title} | ${siteConfig.name}`,
    description: pagesData.library.description,
    images: [`${pagesData.library.slug}/opengraph-image`],
  },
}

export default async function LibraryPage() {
  // 在服务端获取番剧数据
  const bangumi = await getBangumiList()

  return (
    <>
      <StaticTableOfContents
        items={[
          { id: 'title', title: pagesData.library.title },
          { id: 'bangumi', title: '追番' },
          { id: 'playlists', title: '歌单' },
          { id: 'movies', title: '电影' },
          { id: 'books', title: '书籍' },
        ]}
      />

      <div className="space-y-8 py-8 sm:space-y-12 sm:py-12">
        {/* Header */}
        <section className="space-y-3" id="title">
          <h1 className="text-3xl font-bold">{pagesData.library.title}</h1>
          <p className="text-text-secondary">{`${pagesData.library.description}。`}</p>
        </section>

        {/* 追番 - API 数据 */}
        <Bangumi id="bangumi" bangumi={bangumi} />

        {/* 歌单 - 纯 SSR 数据 */}
        <Playlists id="playlists" />

        {/* 电影 - 纯 SSR 数据 */}
        <Movies id="movies" />

        {/* 书籍 - 纯 SSR 数据 */}
        <Books id="books" />
      </div>
    </>
  )
}
