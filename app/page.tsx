import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'
import { renderMarkdown } from '@/lib/markdown-utils'
import dayjs from 'dayjs'
import { generateBlogSchema, generateOrganizationSchema } from '@/lib/seo'

export default async function BlogPage() {
  const blogSchema = generateBlogSchema()
  const organizationSchema = generateOrganizationSchema()
  const allPosts = await getAllPosts()
  const pinnedPosts = allPosts.filter((post) => post.top)
  const regularPosts = allPosts.filter((post) => !post.top)

  // 显示数量 = 所有置顶文章 + 配置的普通文章数量
  const displayPosts = [...pinnedPosts, ...regularPosts.slice(0, siteConfig.home.postsToShow)]

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="space-y-8 py-8 sm:space-y-12 sm:py-12">
        {/* Hero Section */}
        <section className="space-y-2 sm:space-y-4">
          <h1 className="text-3xl font-bold sm:text-4xl">{siteConfig.home.hero.title}</h1>
          <div className="text-text-secondary text-base leading-relaxed sm:text-lg">
            {siteConfig.home.hero.paragraphs.map((paragraph: string, index: number) => (
              <p key={index}>{renderMarkdown(paragraph)}</p>
            ))}
          </div>
        </section>

        {displayPosts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-text-secondary mb-4 text-xl">暂无文章</p>
            <p className="text-text-tertiary">
              请在 <code className="bg-bg-tertiary rounded-xs px-2 py-1">content/posts</code>{' '}
              目录添加 Markdown 文件
            </p>
          </div>
        ) : (
          <>
            <div className="border-border border-t" />
            <section className="space-y-4">
              <h2 className="text-text-secondary text-xl font-semibold">最近文章</h2>
              <div className="space-y-4 sm:space-y-6">
                {displayPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${post.slug}`}
                    className="group active:bg-bg-secondary -mx-4 block px-4 py-3 no-underline transition-colors sm:mx-0 sm:px-0 sm:py-4 sm:active:bg-transparent"
                  >
                    <article className="space-y-2">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          {post.top && (
                            <svg
                              className="text-text-tertiary h-4 w-4 shrink-0"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-label="置顶"
                            >
                              <path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z" />
                            </svg>
                          )}
                          <h2 className="text-text-primary truncate text-base font-medium group-hover:underline sm:text-lg md:text-xl">
                            {post.title}
                          </h2>
                        </div>
                        <div className="text-text-tertiary flex shrink-0 items-baseline gap-1.5 text-xs">
                          <time dateTime={post.date}>
                            {dayjs(post.date).year() === dayjs().year()
                              ? dayjs(post.date).format('M.D')
                              : dayjs(post.date).format('YYYY.M.D')}
                          </time>
                          {post.readingTime && (
                            <>
                              <span>·</span>
                              <span>{post.readingTime.toLocaleString('zh-CN')} 分钟</span>
                            </>
                          )}
                        </div>
                      </div>
                      {post.excerpt && (
                        <p className="text-text-secondary line-clamp-2 text-sm leading-relaxed">
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
        {allPosts.length > siteConfig.home.postsToShow && (
          <div className="flex justify-center pt-4">
            <Link href="/posts" className="text-text-secondary hover:text-text-primary text-link">
              查看全部文章 ({allPosts.length.toLocaleString('zh-CN')}) →
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
