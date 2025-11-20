import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'
import dayjs from 'dayjs'

export default async function BlogPage() {
  const allPosts = await getAllPosts()
  const pinnedPosts = allPosts.filter((post) => post.top)
  const regularPosts = allPosts.filter((post) => !post.top)

  // 显示数量 = 所有置顶文章 + 配置的普通文章数量
  const displayPosts = [...pinnedPosts, ...regularPosts.slice(0, siteConfig.pages.home.postsToShow)]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold sm:text-4xl">{siteConfig.pages.home.hero.title}</h1>
        <p className="text-text-secondary text-base leading-relaxed sm:text-lg">
          {siteConfig.pages.home.hero.description}
        </p>
      </section>

      {displayPosts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-text-secondary mb-4 text-xl">暂无文章</p>
          <p className="text-text-tertiary">
            请在 <code className="bg-bg-tertiary rounded-xs px-2 py-1">content/posts</code> 目录添加
            Markdown 文件
          </p>
        </div>
      ) : (
        <>
          <div className="border-border border-t" />
          <section className="space-y-4">
            <h2 className="text-text-primary text-xl font-semibold">最近文章</h2>
            <div className="space-y-6">
              {displayPosts.map((post) => (
                <Link key={post.slug} href={`/${post.slug}`} className="group block no-underline">
                  <article className="space-y-2 py-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <h2 className="text-text-secondary group-hover:underline text-lg font-medium sm:text-xl truncate">
                          {post.title}
                        </h2>
                        {post.top && (
                          <span className="bg-bg-tertiary text-text-secondary shrink-0 px-2 py-0.5 text-xs rounded-xs font-medium">
                            置顶
                          </span>
                        )}
                      </div>
                      <time
                        dateTime={post.date}
                        className="text-text-tertiary shrink-0 text-xs sm:text-sm"
                      >
                        {dayjs(post.date).year() === dayjs().year()
                          ? dayjs(post.date).format('MM-DD')
                          : dayjs(post.date).format('YYYY-MM-DD')}
                      </time>
                    </div>
                    {post.excerpt && (
                      <p className="text-text-tertiary line-clamp-2 text-sm">
                        {post.excerpt}
                      </p>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Show more link if there are more posts than postsToShow */}
      {allPosts.length > siteConfig.pages.home.postsToShow && (
        <div className="flex justify-center pt-4">
          <Link
            href="/archives"
            className="text-text-secondary hover:text-text-primary text-link"
          >
            查看全部文章 ({allPosts.length}) →
          </Link>
        </div>
      )}
    </div>
  )
}
