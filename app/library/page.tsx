import { Books } from '@/components/library/books'
import { Movies } from '@/components/library/movies'
import { Bangumi } from '@/components/library/bangumi'
import { siteConfig } from '@/lib/config'
import { pages } from '@/lib/data'
import { getBangumiList } from '@/lib/bangumi'
import { generateCanonicalUrl } from '@/lib/seo'
import { StaticTableOfContents } from '@/components/table-of-contents'
import { getDoubanBooks, getDoubanMovies } from '@/lib/douban'

import type { Metadata } from 'next'
import { RefreshButton } from '@/components/refresh-button'

export const metadata: Metadata = {
  title: pages.library.title,
  description: pages.library.description,
  alternates: {
    canonical: generateCanonicalUrl(pages.library.slug),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl(pages.library.slug),
    title: `${pages.library.title} | ${siteConfig.name}`,
    description: pages.library.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${pages.library.slug}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: pages.library.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pages.library.title} | ${siteConfig.name}`,
    description: pages.library.description,
    images: [`${pages.library.slug}/opengraph-image`],
  },
}

export default async function LibraryPage() {
  // 在服务端并发获取数据
  const [bangumi, booksData, moviesData] = await Promise.all([
    getBangumiList(),
    getDoubanBooks(),
    getDoubanMovies(),
  ])

  return (
    <>
      <StaticTableOfContents
        items={[
          { id: 'movies', title: '影视', level: 1 },
          { id: 'movies-collect', title: '看过', level: 3 },
          { id: 'movies-doings', title: '在看', level: 3 },
          { id: 'movies-wish', title: '想看', level: 3 },
          { id: 'books', title: '书籍', level: 1 },
          { id: 'books-collect', title: '读过', level: 3 },
          { id: 'books-doings', title: '在读', level: 3 },
          { id: 'books-wish', title: '想读', level: 3 },
          { id: 'bangumi', title: '追番', level: 1 },
          { id: 'bangumi-collect', title: '看过', level: 3 },
          { id: 'bangumi-doings', title: '在看', level: 3 },
          { id: 'bangumi-wish', title: '想看', level: 3 },
        ]}
      />

      <div className="space-y-8 py-8 sm:space-y-12 sm:py-12">
        {/* Header */}
        <section className="space-y-3" id="title">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <h1 className="text-3xl font-bold">{pages.library.title}</h1>
            <RefreshButton />
          </div>
          <p className="text-text-secondary">{`${pages.library.description}。`}</p>
        </section>

        {/* 影视 - 豆瓣 API 数据 */}
        <Movies id="movies" data={moviesData} />

        {/* 书籍 - 豆瓣 API 数据 */}
        <Books id="books" data={booksData} />

        {/* 追番 - API 数据 */}
        <Bangumi id="bangumi" bangumi={bangumi} />
      </div>
    </>
  )
}
