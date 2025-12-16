import Link from 'next/link'
import { ViewTransition } from 'react'
import { DraftBadge } from './draft-badge'
import { PostDate } from './post-date'
import { ReadingTime } from './reading-time'

import type { PostMetadata } from '@/lib/posts'

interface RecommendedPostsProps {
  posts: PostMetadata[]
}

export function RecommendedPosts({ posts }: RecommendedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="border-border mt-12 space-y-4 border-t pt-8 sm:mt-16 sm:space-y-6 sm:pt-12">
      <h2 className="text-text-secondary text-base font-medium sm:text-lg">也可以看看</h2>
      <div
        className="space-y-1 border-l-2 pl-4 sm:pl-6"
        style={{ borderColor: 'rgba(128, 128, 128, 0.2)' }}
      >
        {posts.map((post) => (
          <article
            key={post.slug}
            className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 py-2 sm:grid-cols-[6rem_1fr_auto] sm:gap-x-4 sm:py-1.5"
          >
            <div className="text-text-tertiary flex shrink-0 items-baseline gap-2 font-mono text-xs sm:text-sm">
              <ViewTransition name={`post-date-${post.slug}`} default="transform">
                <PostDate date={post.date} format="full" />
              </ViewTransition>
            </div>
            <div className="text-text-tertiary flex items-baseline gap-2 font-mono text-xs sm:col-start-3 sm:row-start-1 sm:text-xs">
              <span className="shrink-0 sm:hidden">·</span>
              <ViewTransition name={`post-reading-time-${post.slug}`} default="transform">
                <ReadingTime minutes={post.readingTime} />
              </ViewTransition>
            </div>
            <div className="col-span-2 flex items-start gap-2 sm:col-span-1 sm:col-start-2 sm:row-start-1">
              {post.draft && <DraftBadge className="mt-0.5" />}
              <ViewTransition name={`post-title-${post.slug}`} default="transform">
                <Link
                  href={`/${post.slug}`}
                  className="text-text-secondary hover:text-text-primary flex-1 text-sm leading-snug sm:text-base"
                >
                  {post.title}
                </Link>
              </ViewTransition>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
