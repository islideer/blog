'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { LibraryGame, RecentGame } from '@/lib/steam'
import { PlatformIcon } from './platform-icon'
import { ImageZoomProvider } from './image-zoom-provider'

interface SteamGameLibraryProps {
  steamId: string
  id?: string
  initialLibraryGames?: LibraryGame[]
  initialRecentGames?: RecentGame[]
}

export function SteamGameLibrary({
  steamId,
  id,
  initialLibraryGames = [],
  initialRecentGames = [],
}: SteamGameLibraryProps) {
  // 使用服务端传入的初始数据
  const [libraryGames] = useState<LibraryGame[]>(initialLibraryGames)
  const [recentGames] = useState<RecentGame[]>(
    initialRecentGames.filter((game) => game.playtime.recent_minutes > 3),
  )
  const [view, setView] = useState<'recent' | 'library'>('recent')

  // 如果没有初始数据，显示 loading 状态（降级方案）
  if (libraryGames.length === 0 && recentGames.length === 0) {
    return (
      <section className="space-y-4" id={id}>
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
          Steam 游戏
        </h2>
        <p className="text-text-secondary text-sm">正在加载 Steam 游戏列表...</p>
      </section>
    )
  }

  // 按总游玩时长排序游戏库
  const sortedLibraryGames = libraryGames.toSorted(
    (a, b) => b.playtime.total_minutes - a.playtime.total_minutes,
  )

  return (
    <section className="space-y-4" id={id}>
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
          Steam 游戏
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('recent')}
            className={`text-xs font-medium ${view === 'recent' ? 'text-text-primary' : 'text-text-secondary sm:hover:text-text-primary'}`}
          >
            最近在玩 ({recentGames.length})
          </button>
          <span className="text-text-tertiary text-xs">·</span>
          <button
            onClick={() => setView('library')}
            className={`text-xs font-medium ${view === 'library' ? 'text-text-primary' : 'text-text-secondary sm:hover:text-text-primary'}`}
          >
            游戏库 ({libraryGames.length})
          </button>
        </div>
      </div>

      {view === 'recent' ? (
        recentGames.length === 0 ? (
          <p className="text-text-secondary text-sm">Viki 近两周没有玩游戏。</p>
        ) : (
          <GamesList games={recentGames} showRecently />
        )
      ) : sortedLibraryGames.length === 0 ? (
        <p className="text-text-secondary text-sm">游戏库为空。</p>
      ) : (
        <GamesList hideDetails games={sortedLibraryGames} />
      )}
    </section>
  )
}

function GamesList({
  games,
  hideDetails,
  showRecently,
}: {
  games: (LibraryGame | RecentGame)[]
  hideDetails?: boolean
  showRecently?: boolean
}) {
  return (
    <ImageZoomProvider deps={[games]}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {games.map((game) => (
          <div
            key={game.appid}
            className="border-border group sm:hover:border-text-tertiary flex flex-col overflow-hidden rounded-lg border"
          >
            {/* 游戏封面 */}
            <div className="relative aspect-166/78 w-full overflow-hidden">
              <Image
                src={game.image.header}
                alt={game.name}
                width={166}
                height={78}
                data-zoomable
                className="h-full w-full object-cover duration-300"
              />
            </div>

            {/* 游戏信息 */}
            <div className="flex flex-col gap-2 p-3">
              <Link
                href={game.store_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary text-text-secondary truncate text-sm font-medium text-nowrap"
              >
                {game.name}
              </Link>

              <div className="text-text-tertiary flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                {/* 平台图标 */}
                {game.playtime.platforms && game.playtime.platforms.length > 0 && (
                  <div className="flex items-center gap-1">
                    {game.playtime.platforms.map((platform) => (
                      <PlatformIcon
                        key={platform.platform}
                        className="text-text-tertiary h-3 w-3"
                        platform={platform.platform}
                      />
                    ))}
                  </div>
                )}

                <span className="text-text-tertiary">
                  {game.playtime.total_minutes
                    ? hideDetails
                      ? `曾经玩过`
                      : `总时长 ${game.playtime.total_desc}`
                    : '还没有玩过，库里吃灰呢'}
                </span>
              </div>
              {game.playtime.recent_desc && showRecently && !hideDetails && (
                <div className="text-text-secondary text-xs">
                  最近玩了 {game.playtime.recent_desc}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ImageZoomProvider>
  )
}
