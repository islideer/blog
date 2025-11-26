import Link from 'next/link'
import { dayjs } from '@/lib/dayjs'
import { PostDate } from '@/components/post-date'
import { siteConfig } from '@/lib/config'
import { DraftBadge } from '@/components/draft-badge'
import { ReadingTime } from '@/components/reading-time'
import { getAllPosts } from '@/lib/posts'
import { pagesData } from '@/lib/config'
import { generateCanonicalUrl } from '@/lib/seo'

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pagesData.posts.title,
    description: pagesData.posts.description,
    alternates: {
      canonical: generateCanonicalUrl('/posts'),
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url: generateCanonicalUrl('/posts'),
      title: `${pagesData.posts.title} | ${siteConfig.name}`,
      description: pagesData.posts.description,
      siteName: siteConfig.name,
      images: [
        {
          url: '/posts/opengraph-image',
          width: 1200,
          height: 630,
          alt: pagesData.posts.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pagesData.posts.title} | ${siteConfig.name}`,
      description: pagesData.posts.description,
      images: ['/posts/opengraph-image'],
    },
  }
}

export default async function PostsPage() {
  const allPosts = await getAllPosts()
  const pinnedPosts = allPosts.filter((post) => post.top)
  const posts = allPosts.filter((post) => !post.top)

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
        <h1 className="text-3xl font-bold">{pagesData.posts.title}</h1>
        <p className="text-text-secondary">
          共 {allPosts.length.toLocaleString('zh-CN')} 篇文章，按年份分组展示。
        </p>
      </section>

      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-text-primary text-xl font-bold sm:text-2xl">
            置顶{' '}
            <span className="text-text-tertiary text-base font-normal sm:text-lg">
              ({pinnedPosts.length.toLocaleString('zh-CN')})
            </span>
          </h2>
          <div
            className="space-y-1 border-l-2 pl-4 sm:pl-6"
            style={{ borderColor: 'rgba(128, 128, 128, 0.2)' }}
          >
            {pinnedPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col gap-1 py-2 sm:flex-row sm:items-baseline sm:gap-4 sm:py-1.5"
              >
                <div className="text-text-tertiary flex shrink-0 items-baseline gap-2 font-mono text-xs sm:w-24 sm:text-sm">
                  <PostDate date={post.date} format="full" />
                  {post.readingTime && (
                    <>
                      <span className="shrink-0 sm:hidden">·</span>
                      <span className="sm:hidden">
                        <ReadingTime minutes={post.readingTime} />
                      </span>
                    </>
                  )}
                </div>
                <div className="flex flex-1 items-start gap-2">
                  {post.draft && <DraftBadge className="mt-0.5" />}
                  <Link
                    href={`/${post.slug}`}
                    className="text-text-secondary hover:text-text-primary flex-1 text-sm leading-snug sm:text-base"
                  >
                    {post.title}
                  </Link>
                </div>
                {post.readingTime && (
                  <span className="text-text-tertiary hidden shrink-0 text-xs sm:inline">
                    <ReadingTime minutes={post.readingTime} />
                  </span>
                )}
              </article>
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
              <h2 className="text-text-primary text-xl font-bold sm:text-2xl">
                {year}{' '}
                <span className="text-text-tertiary text-base font-normal sm:text-lg">
                  ({yearPosts.length.toLocaleString('zh-CN')})
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
                  yearPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="flex flex-col gap-1 py-2 sm:flex-row sm:items-baseline sm:gap-4 sm:py-1.5"
                    >
                      <div className="text-text-tertiary flex shrink-0 items-baseline gap-2 font-mono text-xs sm:w-24 sm:text-sm">
                        <PostDate date={post.date} format="month-day" />
                        {post.readingTime && (
                          <>
                            <span className="shrink-0 sm:hidden">·</span>
                            <span className="sm:hidden">
                              <ReadingTime minutes={post.readingTime} />
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex flex-1 items-start gap-2">
                        {post.draft && <DraftBadge className="mt-0.5" />}
                        <Link
                          href={`/${post.slug}`}
                          className="text-text-secondary hover:text-text-primary flex-1 text-sm leading-snug sm:text-base"
                        >
                          {post.title}
                        </Link>
                      </div>
                      {post.readingTime && (
                        <span className="text-text-tertiary hidden shrink-0 text-xs sm:inline">
                          <ReadingTime minutes={post.readingTime} />
                        </span>
                      )}
                    </article>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
