import { pages } from '@/lib/data'
import { Books } from './_components/books'
import { Movies } from './_components/movies'
import { Bangumi } from './_components/bangumi'
import { siteConfig } from '@/lib/config'
import { RefreshButton } from '@/components/refresh-button'
import { DoubanProfile } from './_components/douban-profile'
import { getBangumiList } from '@/lib/bangumi'
import { dayjs, TZ_SHANGHAI } from '@/lib/dayjs'
import { StaticTableOfContents } from '@/components/table-of-contents'
import { getDoubanBooks, getDoubanMovies } from '@/lib/douban'
import { generateCanonicalUrl, generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo'
// import { getDoubanBooks, getDoubanMovies, getDoubanProfile } from '@/lib/douban'

import type { Metadata } from 'next'

export const revalidate = 86400 // 缓存 1 天

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
        url: `${siteConfig.url}/opengraph-image`,
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
    images: [`${siteConfig.url}/opengraph-image`],
  },
}

export default async function LibraryPage() {
  // 在服务端并发获取数据
  const [booksData, moviesData] = await Promise.all([getDoubanBooks(), getDoubanMovies()])

  // const [bangumi, booksData, moviesData] = await Promise.all([
  //   getBangumiList(),
  //   getDoubanBooks(),
  //   getDoubanMovies(),
  // ])

  // const [bangumi, booksData, moviesData, doubanProfile] = await Promise.all([
  //   getBangumiList(),
  //   getDoubanBooks(),
  //   getDoubanMovies(),
  //   getDoubanProfile(),
  // ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebPageSchema(
              pages.library.title,
              pages.library.description,
              pages.library.slug,
            ),
          ),
        }}
      />
      {/* Preconnect to external domains for better performance */}
      {/* <link rel="preconnect" href="https://i0.hdslb.com" />
      <link rel="dns-prefetch" href="https://i0.hdslb.com" /> */}
      <link rel="preconnect" href="https://doubanio.viki.moe" />
      <link rel="dns-prefetch" href="https://doubanio.viki.moe" />

      <StaticTableOfContents
        items={[
          { id: 'douban-profile', title: '豆瓣个人资料', level: 1 },
          { id: 'movies', title: '影视', level: 1 },
          { id: 'movies-collect', title: '看过', level: 3 },
          { id: 'movies-doings', title: '在看', level: 3 },
          { id: 'movies-wish', title: '想看', level: 3 },
          { id: 'books', title: '书籍', level: 1 },
          { id: 'books-collect', title: '读过', level: 3 },
          { id: 'books-doings', title: '在读', level: 3 },
          { id: 'books-wish', title: '想读', level: 3 },
          // { id: 'bangumi', title: '追番', level: 1 },
          // { id: 'bangumi-collect', title: '看过', level: 3 },
          // { id: 'bangumi-doings', title: '在看', level: 3 },
          // { id: 'bangumi-wish', title: '想看', level: 3 },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: '首页', url: '/' },
              { name: pages.library.title, url: pages.library.slug },
            ]),
          ),
        }}
      />
      <div className="space-y-8 py-8 sm:space-y-12 sm:py-12">
        {/* Header */}
        <section className="space-y-3" id="title">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold sm:text-4xl">{pages.library.title}</h1>
            <RefreshButton />
          </div>
          <p className="text-text-secondary">{`${pages.library.description}。`}</p>
        </section>

        {/* 豆瓣个人资料 */}
        <DoubanProfile
          id="douban-profile"
          profile={{
            name: 'Viki',
            avatar: 'https://doubanio.viki.moe/icon/ul263298170-5.jpg',
            join_date: '2022-10-04',
            join_date_at: dayjs('2022-10-04').tz(TZ_SHANGHAI).valueOf(),
            books: { collect: 0, wish: 0, doings: 0, person: 0 },
            movies: { collect: 0, wish: 0, doings: 0, person: 0 },
          }}
          books={booksData}
          movies={moviesData}
        />

        {/* 影视 - 豆瓣 API 数据 */}
        <Movies id="movies" data={moviesData} />

        {/* 书籍 - 豆瓣 API 数据 */}
        <Books id="books" data={booksData} />

        {/* 追番 - API 数据 */}
        {/* <Bangumi id="bangumi" bangumi={bangumi} /> */}
      </div>
    </>
  )
}
