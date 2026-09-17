import Link from 'next/link'
import { pages } from '@/lib/data'
import { PinIcon } from '@/components/pin-icon'
import { PostDate } from '@/components/post-date'
import { DraftBadge } from '@/components/draft-badge'
import { ReadingTime } from '@/components/reading-time'
import { ViewTransition } from 'react'

import type { PostMetadata } from '@/lib/posts'

interface RecentPostsProps {
  posts: PostMetadata[]
  totalCount: number
  showMoreThreshold: number
}

/**
 * 最近文章组件（服务端组件）
 * 展示首页的文章列表
 */
export async function RecentPosts({ posts, totalCount, showMoreThreshold }: RecentPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="space-y-4 sm:space-y-6">
      <h2 className="text-xl font-semibold">最近文章</h2>
      <div className="space-y-6">
        <div className="divide-border space-y-6">
          {posts.map((post) => (
            <article className="space-y-2" key={post.slug}>
              <div className="flex flex-col gap-1 sm:items-baseline sm:justify-between sm:gap-1.5">
                <div className="flex min-w-0 flex-1 items-start gap-2">
                  {(post.top || post.draft) && (
                    <div className="flex shrink-0 items-center gap-2 pt-0.5">
                      {post.top && <PinIcon />}
                      {post.draft && <DraftBadge />}
                    </div>
                  )}
                  <ViewTransition name={`post-title-${post.slug}`} default="transform">
                    <Link
                      href={`/${post.slug}`}
                      className="link text-text-primary flex-1 text-sm leading-snug sm:text-base"
                    >
                      {post.title}
                    </Link>
                  </ViewTransition>
                </div>
                {post.excerpt && (
                  <p className="text-text-primary line-clamp-2 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                <div className="text-text-secondary flex shrink-0 items-center gap-1.5 text-xs">
                  <PostDate date={post.date} />
                  <span className="shrink-0">·</span>
                  <span className="shrink-0">
                    约需 <ReadingTime minutes={post.readingTime} />
                  </span>
                  <span className="shrink-0">·</span>
                  <span className="shrink-0">{post.wordCount.toLocaleString('zh-Hans-CN')} 字</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 查看全部链接 */}
        {totalCount > showMoreThreshold && (
          <Link href={pages.posts.slug} className="link">
            探索更多（{totalCount}）
          </Link>
        )}
      </div>
    </section>
  )
}
