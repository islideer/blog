'use client'

import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { PlatformIcon } from './platform-icon'
import { useState, useMemo } from 'react'

import type { LibraryGame, RecentGame } from '@/lib/steam'

interface SteamGameListClientProps {
  libraryGames: LibraryGame[]
  recentGames: RecentGame[]
}

/**
 * Steam 游戏列表客户端组件
 * - 处理视图切换交互（最近在玩 / 游戏库）
 * - 渲染游戏列表
 */
export function SteamGameListClient({ libraryGames, recentGames }: SteamGameListClientProps) {
  const [view, setView] = useState<'recent' | 'library'>('recent')

  // 过滤最近玩过的游戏（游玩时间 > 3 分钟）
  const filteredRecentGames = useMemo(
    () => recentGames.filter((game) => game.playtime.recent_minutes > 3),
    [recentGames],
  )

  // 按总游玩时长排序游戏库
  const sortedLibraryGames = useMemo(
    () => libraryGames.toSorted((a, b) => b.playtime.total_minutes - a.playtime.total_minutes),
    [libraryGames],
  )

  return (
    <>
      {/* 标题行和视图切换按钮 */}
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
          Steam 游戏
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('recent')}
            className={`text-xs font-medium ${view === 'recent' ? 'text-text-primary' : 'text-text-secondary sm:hover:text-text-primary'}`}
          >
            最近在玩 ({filteredRecentGames.length})
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

      {/* 游戏列表 */}
      {view === 'recent' ? (
        filteredRecentGames.length === 0 ? (
          <p className="text-text-secondary text-sm">{siteConfig.author.name} 近两周没有玩游戏。</p>
        ) : (
          <GamesList games={filteredRecentGames} showRecently />
        )
      ) : sortedLibraryGames.length === 0 ? (
        <p className="text-text-secondary text-sm">{siteConfig.author.name} 游戏库里空空的。</p>
      ) : (
        <GamesList hideDetails games={sortedLibraryGames} />
      )}
    </>
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
  )
}
