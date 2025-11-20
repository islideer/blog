import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'
import dayjs from 'dayjs'

export default function BlogPage() {
  const allPosts = getAllPosts()
  const posts = allPosts.slice(0, siteConfig.pages.home.postsToShow)

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold sm:text-4xl">{siteConfig.pages.home.hero.title}</h1>
        <p className="text-text-secondary text-base leading-relaxed sm:text-lg">
          {siteConfig.pages.home.hero.description}
        </p>
      </section>

      {posts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-text-secondary mb-4 text-xl">暂无文章</p>
          <p className="text-text-tertiary">
            请在 <code className="bg-bg-tertiary rounded-sm px-2 py-1">content/posts</code> 目录添加
            Markdown 文件
          </p>
        </div>
      ) : (
        <>
          <div className="border-border border-t" />
          <section className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/${post.slug}`} className="group block">
                <article className="group-hover:bg-bg-secondary space-y-2 py-4 px-2 -mx-2 rounded-sm">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-text-secondary group-hover:text-text-primary text-lg font-medium sm:text-xl">
                      {post.title}
                    </h2>
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
                    <p className="text-text-tertiary group-hover:text-text-secondary line-clamp-2 text-sm">
                      {post.excerpt}
                    </p>
                  )}
                </article>
              </Link>
            ))}
          </section>
        </>
      )}

      {/* Show more link if there are more posts than postsToShow */}
      {allPosts.length > siteConfig.pages.home.postsToShow && (
        <div className="flex justify-center pt-4">
          <Link
            href="/archives"
            className="text-text-secondary hover:text-text-primary text-sm font-medium"
          >
            查看全部文章 ({allPosts.length}) →
          </Link>
        </div>
      )}
    </div>
  )
}
