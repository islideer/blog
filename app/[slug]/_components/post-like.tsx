'use client'

import { InteractionButton } from '@/components/interaction-button'

interface PostLikeProps {
  slug: string
  initialCount?: number
}

export function PostLike({ slug, initialCount }: PostLikeProps) {
  const icon = (
    <InteractionButton
      id={slug}
      type="posts"
      initialCount={initialCount}
      className="flex-col justify-start! gap-1 text-lg opacity-60 hover:opacity-80 sm:text-xl"
      iconClassName="text-2xl sm:text-3xl"
      revalidatePagePath={`/${slug}`}
    />
  )

  return <div className="flex items-center justify-center">{icon}</div>

  return (
    <>
      {/* PC 端 - 固定在左侧，与目录对称 */}
      <div className="fixed top-1/2 left-4 z-10 hidden w-60 -translate-y-1/2 text-right xl:block">
        {icon}
      </div>

      {/* 移动端 - 文章底部居中 */}
      <div className="flex items-center justify-center xl:hidden">{icon}</div>
    </>
  )
}
