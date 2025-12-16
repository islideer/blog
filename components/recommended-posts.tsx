import Link from 'next/link'
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
            className="flex flex-col gap-1 py-2 sm:flex-row sm:items-baseline sm:gap-4 sm:py-1.5"
          >
            <div className="text-text-tertiary flex shrink-0 items-baseline gap-2 font-mono text-xs sm:w-24 sm:text-sm">
              <PostDate date={post.date} format="full" />
              {post.readingTime && (
                <>
                  <span className="shrink-0 sm:hidden">·</span>
                  <span className="sm:hidden">
                    <ReadingTime minutes={post.readingTime} />
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-1 items-center gap-2">
              {post.draft && <DraftBadge />}
              <Link
                href={`/${post.slug}`}
                className="text-text-secondary hover:text-text-primary flex-1 text-sm sm:text-base"
              >
                {post.title}
              </Link>
            </div>
            {post.readingTime && (
              <span className="text-text-tertiary hidden shrink-0 text-xs sm:inline">
                <ReadingTime minutes={post.readingTime} />
              </span>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
