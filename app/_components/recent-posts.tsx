import Link from 'next/link'
import { pages } from '@/lib/data'
import { PinIcon } from '@/components/pin-icon'
import { PostDate } from '@/components/post-date'
import { ImageIcon } from '@/components/image-icon'
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
    <section className="space-y-3">
      <h2 className="text-text-secondary text-lg font-semibold">最近文章</h2>
      <div className="divide-border divide-y">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="group active:bg-bg-secondary block py-3 no-underline sm:py-4 sm:active:bg-transparent"
          >
            <article className="space-y-2">
              <div className="flex flex-col gap-1 sm:items-baseline sm:justify-between sm:gap-2">
                <div className="flex min-w-0 flex-1 items-start gap-2">
                  {(post.top || post.draft) && (
                    <div className="flex shrink-0 items-center gap-2 pt-0.5">
                      {post.top && <PinIcon />}
                      {post.draft && <DraftBadge />}
                    </div>
                  )}
                  <ViewTransition name={`post-title-${post.slug}`} default="transform">
                    <h2 className="text-text-secondary group-hover:text-text-primary flex-1 text-sm leading-snug font-medium group-hover:underline sm:text-base">
                      {post.title}
                    </h2>
                  </ViewTransition>
                </div>
                {post.excerpt && (
                  <p className="text-text-tertiary group-hover:text-text-secondary line-clamp-2 text-xs leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                <div className="text-text-tertiary group-hover:text-text-secondary flex shrink-0 items-center gap-1.5 text-xs">
                  <PostDate date={post.date} />
                  <span className="shrink-0">·</span>
                  <span className="shrink-0">#{post.topic}</span>
                  <span className="shrink-0">·</span>
                  <span className="shrink-0">
                    约需 <ReadingTime minutes={post.readingTime} />
                  </span>
                  <span className="shrink-0">·</span>
                  <span className="shrink-0">{post.wordCount.toLocaleString('zh-Hans-CN')} 字</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* 查看全部链接 */}
      {totalCount > showMoreThreshold && (
        <div className="pt-1">
          <Link
            href={pages.posts.slug}
            className="text-text-secondary hover:text-text-primary text-[11px]"
          >
            查看全部（{totalCount.toLocaleString('zh-Hans-CN')}）→
          </Link>
        </div>
      )}
    </section>
  )
}
