// 'use client'

import Image from 'next/image'
import Link from 'next/link'
// import { useEffect, useState } from 'react'
import { otherGames as games, type OtherGame } from '@/lib/data'

export function OtherGames({ id }: { id?: string }) {
  // const [loading, setLoading] = useState(true)
  // const [games, setGames] = useState<OtherGame[]>([])

  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     setLoading(false)
  //     setGames(otherGames)
  //   }, 360)
  //   return () => clearTimeout(id)
  // }, [])

  // if (loading) {
  //   return (
  //     <section className="space-y-4">
  //       <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase" id={id}>
  //         其他游戏（在玩的、爱玩的、怀念的）
  //       </h2>
  //       <div>
  //         <p className="text-text-secondary text-sm">正在加载其他游戏列表...</p>
  //       </div>
  //     </section>
  //   )
  // }

  return (
    <section className="space-y-4">
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase" id={id}>
        其他游戏（在玩的、爱玩的、怀念的）
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
        {games.map((game: OtherGame) => (
          <div
            key={game.id}
            className="border-border group flex flex-col overflow-hidden rounded-lg border sm:hover:border-neutral-400 dark:sm:hover:border-neutral-600"
          >
            {/* 游戏封面 + 标题和关键信息 */}
            <Link
              href={game.url || '#'}
              target={game.url ? '_blank' : undefined}
              rel={game.url ? 'noopener noreferrer' : undefined}
              className="bg-bg-secondary relative aspect-video w-full overflow-hidden"
            >
              <Image
                src={game.cover}
                alt={game.name}
                width={240}
                height={135}
                data-zoomable
                className="h-full w-full object-cover transition-all! duration-300 group-hover:scale-110"
              />

              {/* 渐变遮罩 */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

              {/* 标题和关键信息 */}
              <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-1.5 p-3">
                <h3 className="line-clamp-1 text-sm font-medium text-white">{game.name}</h3>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-white/80">
                  <span>{game.platforms.join(' · ')}</span>
                  <span>·</span>
                  <span>{game.type}</span>
                  <span>·</span>
                  <span>{game.playtime}</span>
                </div>
              </div>
            </Link>

            {/* 描述和成就列表（图片下方） */}
            {(game.description || (game.achievements && game.achievements.length > 0)) && (
              <div className="bg-bg-secondary/50 flex flex-col gap-2 p-3 backdrop-blur-sm">
                {game.description && (
                  <p className="text-text-tertiary line-clamp-2 text-xs">{game.description}</p>
                )}

                {/* 成就列表 */}
                {game.achievements && game.achievements.length > 0 && (
                  <ul className="text-text-tertiary list-inside list-disc text-xs">
                    {game.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
