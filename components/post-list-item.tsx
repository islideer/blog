import { ViewTransition } from 'react'

import Link from 'next/link'
import { PostDate } from './post-date'
import { DraftBadge } from './draft-badge'
import { ReadingTime } from './reading-time'

interface PostListItemProps {
  post: {
    slug: string
    date: string
    readingTime: number
    draft?: boolean
    title: string
  }
}

export function PostListItem({ post }: PostListItemProps) {
  return (
    <article
      key={post.slug}
      className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 py-2 sm:grid-cols-[6rem_1fr_auto] sm:gap-x-4 sm:py-1.5"
    >
      <div className="text-text-tertiary flex shrink-0 items-center gap-2 font-mono text-xs sm:text-sm">
        <PostDate date={post.date} format="month-day" />
      </div>
      <div className="text-text-tertiary flex items-center gap-2 font-mono text-xs sm:col-start-3 sm:row-start-1 sm:text-xs">
        <span className="shrink-0 sm:hidden">·</span>
        <ReadingTime minutes={post.readingTime} />
        {post.draft && (
          <>
            <span className="shrink-0 sm:hidden">·</span>
            {<DraftBadge className="inline sm:hidden" />}
          </>
        )}
      </div>
      <div className="col-span-2 flex items-start gap-2 sm:col-span-1 sm:col-start-2 sm:row-start-1">
        {post.draft && <DraftBadge className="mt-0.5 hidden sm:inline" />}
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
  )
}
