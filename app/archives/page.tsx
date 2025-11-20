import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import dayjs from 'dayjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: siteConfig.pages.archives.title,
  description: siteConfig.pages.archives.description,
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
  const earliestYear = posts.length > 0 ? Math.min(...posts.map((p) => dayjs(p.date).year())) : currentYear
  const allYears = Array.from({ length: currentYear - earliestYear + 1 }, (_, i) => currentYear - i)

  // 戏谑的空年份提示语
  const emptyYearMessages = [
    '这一年 Viki 太忙了，光顾着打游戏了 🎮',
    '这一年 Viki 啥也没写，可能在思考人生 🤔',
    '这一年 Viki 的产出为零，摸鱼冠军就是我 🐟',
    '这一年 Viki 太菜了，一个字都憋不出来 😅',
    '这一年 Viki 在休眠期，冬眠中... 💤',
    '这一年 Viki 灵感枯竭，创作力归零 🌵',
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
          共 {allPosts.length} 篇文章，按年份归档
        </p>
      </section>

      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-text-primary text-xl sm:text-2xl font-bold">
            置顶{' '}
            <span className="text-text-tertiary text-base sm:text-lg font-normal">
              ({pinnedPosts.length})
            </span>
          </h2>
          <div
            className="space-y-1 border-l-2 pl-4 sm:pl-6"
            style={{ borderColor: 'rgba(128, 128, 128, 0.2)' }}
          >
            {pinnedPosts.map((post) => (
              <article key={post.slug} className="flex flex-col gap-1 py-2 sm:flex-row sm:items-baseline sm:gap-4 sm:py-1.5">
                <time className="text-text-tertiary sm:w-24 shrink-0 text-xs sm:text-sm font-mono">
                  {dayjs(post.date).format('YYYY-MM-DD')}
                </time>
                <Link
                  href={`/${post.slug}`}
                  className="text-text-secondary hover:text-text-primary text-sm sm:text-base flex-1"
                >
                  {post.title}
                </Link>
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
              <h2 className="text-text-primary text-xl sm:text-2xl font-bold">
                {year}{' '}
                <span className="text-text-tertiary text-base sm:text-lg font-normal">
                  ({yearPosts.length})
                </span>
              </h2>
              <div
                className="space-y-1 border-l-2 pl-4 sm:pl-6"
                style={{ borderColor: 'rgba(128, 128, 128, 0.2)' }}
              >
                {hasNoPosts ? (
                  <p className="text-text-tertiary text-xs sm:text-sm italic opacity-60">
                    {getEmptyYearMessage(year)}
                  </p>
                ) : (
                  yearPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="flex flex-col gap-1 py-2 sm:flex-row sm:items-baseline sm:gap-4 sm:py-1.5"
                    >
                      <time className="text-text-tertiary sm:w-24 shrink-0 text-xs sm:text-sm font-mono">
                        {dayjs(post.date).format('MM-DD')}
                      </time>
                      <Link
                        href={`/${post.slug}`}
                        className="text-text-secondary hover:text-text-primary text-sm sm:text-base flex-1"
                      >
                        {post.title}
                      </Link>
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
