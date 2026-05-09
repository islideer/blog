import Link from 'next/link'
import { cn } from '@/lib/cn'
import { PostDate } from './post-date'
import { DraftBadge } from './draft-badge'
import { ReadingTime } from './reading-time'
import { ViewTransition } from 'react'

import type { PostMetadata } from '@/lib/posts'
import type { PostDateProps } from './post-date'

interface PostListItemProps {
  dateFormat?: PostDateProps['format']
  gap?: '5rem' | '6rem'
  post: PostMetadata
}

export function PostListItem({ post, gap = '5rem', dateFormat }: PostListItemProps) {
  return (
    <article
      key={post.slug}
      className={cn(
        'grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 py-2 sm:py-1.5',
        gap === '5rem' && 'sm:grid-cols-[5rem_1fr_auto]',
        gap === '6rem' && 'sm:grid-cols-[6rem_1fr_auto]',
      )}
    >
      <div className="text-text-tertiary flex shrink-0 items-center gap-2 font-mono text-xs sm:text-sm">
        <PostDate date={post.date} format={dateFormat ?? 'month-day'} />
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
      <div className="text-text-tertiary col-start-2 row-start-1 flex items-center gap-2 font-mono text-xs sm:col-start-3 sm:row-start-1 sm:text-xs">
        <span className="shrink-0 sm:hidden">·</span>
        <span className="shrink-0">{post.wordCount.toLocaleString('zh-Hans-CN')} 字，约</span>
        <span className="shrink-0">
          <ReadingTime minutes={post.readingTime} />
        </span>
        {post.draft && <DraftBadge className="inline sm:hidden" />}
      </div>
    </article>
  )
}
