import { Books } from '@/components/books'
import { Movies } from '@/components/movies'
import { Bangumi } from '@/components/bangumi'
import { siteConfig } from '@/lib/config'
import { pagesData } from '@/lib/data'
import { generateCanonicalUrl } from '@/lib/seo'
import { StaticTableOfContents } from '@/components/table-of-contents'
import { getBangumiList } from '@/lib/bangumi'
import { getDoubanBooks, getDoubanMovies } from '@/lib/douban'

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
  // 在服务端获取数据
  const bangumi = await getBangumiList()
  const booksData = await getDoubanBooks()
  const moviesData = await getDoubanMovies()

  return (
    <>
      <StaticTableOfContents
        items={[
          { id: 'movies', title: '影视', level: 1 },
          { id: 'movies-doings', title: '在看', level: 3 },
          { id: 'movies-wish', title: '想看', level: 3 },
          { id: 'movies-collect', title: '看过', level: 3 },
          { id: 'books', title: '书籍', level: 1 },
          { id: 'books-doings', title: '在读', level: 3 },
          { id: 'books-wish', title: '想读', level: 3 },
          { id: 'books-collect', title: '读过', level: 3 },
          { id: 'bangumi', title: '追番', level: 1 },
        ]}
      />

      <div className="space-y-8 py-8 sm:space-y-12 sm:py-12">
        {/* Header */}
        <section className="space-y-3" id="title">
          <h1 className="text-3xl font-bold">{pagesData.library.title}</h1>
          <p className="text-text-secondary">{`${pagesData.library.description}。`}</p>
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
