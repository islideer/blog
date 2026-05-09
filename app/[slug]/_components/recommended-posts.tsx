import { PostListItem } from '@/components/post-list-item'

import type { PostMetadata } from '@/lib/posts'

interface RecommendedPostsProps {
  posts: PostMetadata[]
}

export function RecommendedPosts({ posts }: RecommendedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="border-border mt-8 space-y-4 border-t pt-8 sm:space-y-6 sm:pt-16">
      <h2 className="text-text-secondary text-base font-medium sm:text-lg">也可以看看</h2>
      <div className="border-border-tertiary space-y-1 border-l-2 pl-4 sm:pl-6">
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} gap="6rem" dateFormat="full-mono" />
        ))}
      </div>
    </section>
  )
}
