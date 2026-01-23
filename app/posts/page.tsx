import { dayjs } from '@/lib/dayjs'
import { pages } from '@/lib/data'
import { siteConfig } from '@/lib/config'
import { countWords } from '@/lib/word-count'
import { PostListItem } from '@/components/post/post-list-item'
import { generateCanonicalUrl } from '@/lib/seo'
import { getAllPosts, getAllPostsWithContent } from '@/lib/posts'

import type { Metadata } from 'next'

const YEAR_DESC_MAP = new Map<number, string>([
  [2001, '破壳年'],
  [2002, '1 岁，幼年期'],
  [2003, '2 岁，幼年期'],
  [2004, '3 岁，幼年期'],
  [2005, '4 岁，童年期'],
  [2006, '5 岁，童年期'],
  [2007, '6 岁，小学一年级'],
  [2008, '7 岁，小学二年级'],
  [2009, '8 岁，小学三年级'],
  [2010, '9 岁，小学四年级'],
  [2011, '10 岁，小学五年级'],
  [2012, '11 岁，小学六年级'],
  [2013, '12 岁，初一'],
  [2014, '13 岁，初二'],
  [2015, '14 岁，初三'],
  [2016, '15 岁，高一'],
  [2017, '16 岁，高二'],
  [2018, '17 岁，高三'],
  [2019, '18 岁，大一'],
  [2020, '19 岁，大二'],
  [2021, '20 岁，大三'],
  [2022, '21 岁，大四'],
  [2023, '22 岁'],
  [2024, '23 岁'],
  [2025, '24 岁'],
  [2026, '25 岁'],
])

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pages.posts.title,
    description: pages.posts.description,
    alternates: {
      canonical: generateCanonicalUrl(pages.posts.slug),
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url: generateCanonicalUrl(pages.posts.slug),
      title: `${pages.posts.title} | ${siteConfig.name}`,
      description: pages.posts.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${pages.posts.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: pages.posts.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pages.posts.title} | ${siteConfig.name}`,
      description: pages.posts.description,
      images: [`${pages.posts.slug}/opengraph-image`],
    },
  }
}

export default async function PostsPage() {
  const allPosts = await getAllPosts()
  const allPostsWithContent = await getAllPostsWithContent()
  const pinnedPosts = allPosts.filter((post) => post.top)
  const posts = allPosts.filter((post) => !post.top)

  // 计算总字数
  const totalWords = allPostsWithContent.reduce((sum, post) => {
    return sum + countWords(post.content)
  }, 0)

  // 按年份分组
  const postsByYear = Object.groupBy(posts, (post) => dayjs(post.date).year())

  // 生成从最早文章到当前年份的完整年份列表
  const currentYear = dayjs().year()
  const earliestYear =
    posts.length > 0 ? Math.min(...posts.map((p) => dayjs(p.date).year())) : currentYear
  const allYears = Array.from({ length: currentYear - earliestYear + 1 }, (_, i) => currentYear - i)

  // 空年份提示语
  const emptyYearMessages = [
    '这一年专注于其他事情，暂未更新博客',
    '这一年在积累经验，等待下次输出',
    '这一年忙于工作与生活，博客暂停更新',
    '这一年的想法还在酝酿中',
    '这一年选择了沉淀与思考',
    '这一年暂时放下了写作',
  ]

  const getEmptyYearMessage = (year: number) => {
    // 根据年份确定性地选择一条提示语
    const index = year % emptyYearMessages.length
    return emptyYearMessages[index]
  }

  return (
    <div className="space-y-12 py-8 sm:py-12">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">{pages.posts.title}</h1>
        <p className="text-text-secondary">
          {`${pages.posts.description}，共 ${allPosts.length.toLocaleString('zh-Hans-CN')} 篇，累计 ${totalWords.toLocaleString('zh-Hans-CN')} 字，按年份分组展示。`}
        </p>
      </section>

      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-text-primary text-xl font-bold sm:text-2xl">
            置顶{' '}
            <span className="text-text-tertiary text-base font-normal sm:text-lg">
              ({pinnedPosts.length.toLocaleString('zh-Hans-CN')})
            </span>
          </h2>
          <div
            className="space-y-1 border-l-2 pl-4 sm:pl-6"
            style={{ borderColor: 'rgba(128, 128, 128, 0.2)' }}
          >
            {pinnedPosts.map((post) => (
              <PostListItem key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Posts by Year */}
      <section className="space-y-12">
        {allYears.map((year) => {
          const yearPosts = postsByYear[year] || []
          const hasNoPosts = yearPosts.length === 0

          return (
            <div key={year} className="space-y-4 sm:space-y-6">
              {/* 年份标题 */}
              <h2 className="text-text-primary text-xl font-bold sm:text-2xl">
                <span>{year}</span>
                <span className="text-text-tertiary/60 mx-1">/</span>
                <span className="text-text-tertiary">{YEAR_DESC_MAP.get(year)}</span>
                <span className="text-text-tertiary mx-1 text-base font-normal sm:text-lg">
                  ({yearPosts.length.toLocaleString('zh-Hans-CN')})
                </span>
              </h2>
              <div
                className="space-y-1 border-l-2 pl-4 sm:pl-6"
                style={{ borderColor: 'rgba(128, 128, 128, 0.2)' }}
              >
                {hasNoPosts ? (
                  <p className="text-text-tertiary text-xs italic opacity-60 sm:text-sm">
                    {getEmptyYearMessage(year)}
                  </p>
                ) : (
                  yearPosts.map((post) => <PostListItem key={post.slug} post={post} />)
                )}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
