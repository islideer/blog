import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import dayjs from 'dayjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '博客',
  description: '所有博客文章列表',
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const posts = allPosts.slice(0, 3) // 只显示最新的 3 篇文章

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold sm:text-4xl">👋 你好，我是 Viki</h1>
        <p className="text-text-secondary text-base leading-relaxed sm:text-lg">
          我来自中国江西，是一个初来乍到的 Web 前端开发者 👨‍💻，也是 Node.js 和 TypeScript
          的狂热爱好者 🥰，经常活跃在 GitHub 开源社区。想用代码遇见更多有趣的人、做更多有趣的事
          🤗。
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

      {/* Show more link if there are more than 3 posts */}
      {allPosts.length > 3 && (
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
