import { PostListItem } from './post-list-item'

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
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
