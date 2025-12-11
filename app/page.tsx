import { ViewTransition } from 'react'

import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxOptionsWithBreaks } from '@/lib/mdx'
import { generateBlogSchema, generateOrganizationSchema } from '@/lib/seo'
import { DraftBadge } from '@/components/draft-badge'
import { PinIcon } from '@/components/pin-icon'
import { PostDate } from '@/components/post-date'
import { ReadingTime } from '@/components/reading-time'

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
          <h2 className="text-3xl font-bold sm:text-4xl">{siteConfig.home.hero.title}</h2>
          <div className="prose text-text-secondary">
            <MDXRemote
              source={siteConfig.home.hero.paragraphs.join('\n')}
              options={mdxOptionsWithBreaks}
            />
          </div>
        </section>

        {displayPosts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-text-secondary mb-4 text-xl">暂无文章</p>
            <p className="text-text-tertiary">
              请在 <code>posts</code> 目录添加 Markdown 文件
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
                    className="group active:bg-bg-secondary -mx-4 block px-4 py-3 no-underline sm:mx-0 sm:px-0 sm:py-4 sm:active:bg-transparent"
                  >
                    <article className="space-y-2">
                      <div className="flex flex-col gap-2 sm:items-baseline sm:justify-between sm:gap-4">
                        <div className="flex min-w-0 flex-1 items-start gap-2">
                          {(post.top || post.draft) && (
                            <div className="flex shrink-0 items-center gap-2 pt-0.5">
                              {post.top && <PinIcon />}
                              {post.draft && <DraftBadge />}
                            </div>
                          )}
                          <ViewTransition name={`post-title-${post.slug}`} default="transform">
                            <h2 className="text-text-primary flex-1 text-base leading-snug font-medium group-hover:underline sm:text-lg md:text-xl">
                              {post.title}
                            </h2>
                          </ViewTransition>
                        </div>
                        <div className="text-text-tertiary flex shrink-0 items-baseline gap-1.5 text-sm">
                          <ViewTransition name={`post-date-${post.slug}`} default="transform">
                            <PostDate date={post.date} format="short" />
                          </ViewTransition>
                          <span>·</span>
                          <ViewTransition
                            name={`post-reading-time-${post.slug}`}
                            default="transform"
                          >
                            <ReadingTime minutes={post.readingTime} />
                          </ViewTransition>
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
