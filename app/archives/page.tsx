import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import dayjs from 'dayjs'
import { generateCanonicalUrl } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: siteConfig.pages.archives.title,
  description: siteConfig.pages.archives.description,
  alternates: {
    canonical: generateCanonicalUrl('/archives'),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl('/archives'),
    title: siteConfig.pages.archives.title,
    description: siteConfig.pages.archives.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.pages.archives.title,
    description: siteConfig.pages.archives.description,
    creator: siteConfig.author.twitter,
  },
}

export default async function ArchivesPage() {
  const allPosts = await getAllPosts()
  const pinnedPosts = allPosts.filter((post) => post.top)
  const posts = allPosts.filter((post) => !post.top)

  // 按年份分组
  const archivesByYear = posts.reduce(
    (acc, post) => {
      const year = dayjs(post.date).year()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    },
    {} as Record<number, typeof posts>,
  )

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
    <div className="space-y-12">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">{siteConfig.pages.archives.title}</h1>
        <p className="text-text-secondary">
          共 {allPosts.length.toLocaleString('zh-CN')} 篇文章，按年份归档
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
                <time className="text-text-tertiary shrink-0 font-mono text-xs sm:w-24 sm:text-sm">
                  {dayjs(post.date).format('YYYY.MM.DD')}
                </time>
                <Link
                  href={`/${post.slug}`}
                  className="text-text-secondary hover:text-text-primary flex-1 text-sm sm:text-base"
                >
                  {post.title}
                </Link>
                {post.readingTime && (
                  <span className="text-text-tertiary shrink-0 text-xs">
                    {post.readingTime.toLocaleString('zh-CN')} 分钟
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Archives by Year */}
      <section className="space-y-12">
        {allYears.map((year) => {
          const yearPosts = archivesByYear[year] || []
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
                      <time className="text-text-tertiary shrink-0 font-mono text-xs sm:w-24 sm:text-sm">
                        {dayjs(post.date).format('MM.DD')}
                      </time>
                      <Link
                        href={`/${post.slug}`}
                        className="text-text-secondary hover:text-text-primary flex-1 text-sm sm:text-base"
                      >
                        {post.title}
                      </Link>
                      {post.readingTime && (
                        <span className="text-text-tertiary shrink-0 text-xs">
                          {post.readingTime.toLocaleString('zh-CN')} 分钟
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
