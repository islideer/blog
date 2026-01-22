'use client'

import { InteractionButton } from './interaction-button'

interface PostLikeProps {
  slug: string
}

export function PostLike({ slug }: PostLikeProps) {
  return (
    <div className="flex items-center justify-center">
      <InteractionButton id={slug} type="posts" className="gap-2 text-xl sm:text-2xl" />
    </div>
  )
}
