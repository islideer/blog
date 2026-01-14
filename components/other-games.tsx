'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { otherGames, type OtherGame } from '@/lib/data'
import { ImageZoomProvider } from './image-zoom-provider'

export function OtherGames() {
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<OtherGame[]>([])

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(false)
      setGames(otherGames)
    }, 360)
    return () => clearTimeout(id)
  }, [])

  if (loading) {
    return (
      <section className="space-y-4">
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
          其他游戏（在玩的、爱玩的、怀念的）
        </h2>
        <div>
          <p className="text-text-secondary text-sm">正在加载其他游戏列表...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
        其他游戏（在玩的、爱玩的、怀念的）
      </h2>

      <ImageZoomProvider deps={[games]}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {games.map((game: OtherGame) => (
            <div
              key={game.id}
              className="border-border group sm:hover:border-text-tertiary flex flex-col overflow-hidden rounded-lg border"
            >
              {/* 游戏封面 */}
              <div className="bg-bg-secondary relative aspect-video w-full overflow-hidden">
                <Image
                  src={game.cover}
                  alt={game.name}
                  width={240}
                  height={135}
                  data-zoomable
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 游戏信息 */}
              <div className="flex flex-col gap-2 p-3">
                {game.url ? (
                  <Link
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-text-primary text-text-secondary truncate text-sm font-medium text-nowrap"
                  >
                    {game.name}
                  </Link>
                ) : (
                  <h3 className="text-text-secondary truncate text-sm font-medium text-nowrap">
                    {game.name}
                  </h3>
                )}

                {game.description && (
                  <p className="text-text-tertiary line-clamp-2 text-xs">{game.description}</p>
                )}

                <div className="text-text-secondary flex flex-wrap items-center gap-x-1 gap-y-1 text-xs">
                  <span>{game.platforms.join(' · ')}</span>
                  <span>·</span>
                  <span>{game.type}</span>
                  <span>·</span>
                  <span>{game.playtime}</span>
                </div>

                {/* 成就列表 */}
                {game.achievements && game.achievements.length > 0 && (
                  <ul className="text-text-tertiary list-inside list-disc text-xs">
                    {game.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </ImageZoomProvider>
    </section>
  )
}
