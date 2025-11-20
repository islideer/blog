import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import dayjs from 'dayjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: siteConfig.pages.archives.title,
  description: siteConfig.pages.archives.description,
}

export default function ArchivesPage() {
  const posts = getAllPosts()

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
        <p className="text-text-secondary">共 {posts.length} 篇文章，按年份归档</p>
      </section>

      {/* Archives by Year */}
      <section className="space-y-12">
        {allYears.map((year) => {
          const yearPosts = archivesByYear[year] || []
          const hasNoPosts = yearPosts.length === 0

          return (
            <div key={year} className="space-y-6">
              <h2 className="text-text-primary text-2xl font-bold">
                {year}{' '}
                <span className="text-text-tertiary text-lg font-normal">
                  ({yearPosts.length})
                </span>
              </h2>
              <div className="border-border space-y-1 border-l-2 pl-6">
                {hasNoPosts ? (
                  <p className="text-text-tertiary text-sm italic opacity-60">{getEmptyYearMessage(year)}</p>
                ) : (
                  yearPosts.map((post) => (
                    <article key={post.slug}>
                      <Link href={`/${post.slug}`} className="block hover:bg-bg-secondary py-1.5 px-2 -mx-2 rounded-xs">
                        <div className="flex items-baseline gap-4">
                          <time className="text-text-tertiary w-20 shrink-0 text-sm">
                            {dayjs(post.date).format('MM-DD')}
                          </time>
                          <h3 className="text-text-primary text-base font-medium">
                            {post.title}
                          </h3>
                        </div>
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
