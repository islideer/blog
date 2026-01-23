'use client'

import { InteractionButton } from '../interaction-button'

interface PostLikeProps {
  slug: string
}

export function PostLike({ slug }: PostLikeProps) {
  return (
    <>
      {/* PC 端 - 固定在左侧，与目录对称 */}
      <div className="fixed top-1/2 left-4 z-10 hidden w-60 -translate-y-1/2 text-right opacity-48 hover:opacity-100 xl:block">
        <InteractionButton id={slug} type="posts" className="gap-2 text-xl sm:text-2xl" />
      </div>

      {/* 移动端 - 文章底部居中 */}
      <div className="flex items-center justify-center xl:hidden">
        <InteractionButton id={slug} type="posts" className="gap-2 text-xl sm:text-2xl" />
      </div>
    </>
  )
}
