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
        <GamesList games={sortedLibraryGames} />
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
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
      {games.map((game) => (
        <Link
          key={game.appid}
          href={game.store_url}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border group relative aspect-166/78 overflow-hidden rounded-lg border sm:hover:border-neutral-400 dark:sm:hover:border-neutral-600"
        >
          {/* 游戏封面 */}
          <Image
            src={game.image.header}
            alt={game.name}
            width={166}
            height={78}
            className="h-full w-full object-cover transition-all! duration-300 group-hover:scale-110"
          />

          {/* 渐变遮罩 */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

          {/* 时长标签 - 右上角 */}
          {showRecently ? (
            // 最近游戏：显示最近时长，带圆点前缀
            game.playtime.recent_desc &&
            !hideDetails && (
              <div className="absolute top-1 right-1 flex items-center gap-1 rounded-full border border-white/20 bg-black/70 px-2 py-0.5 text-[10px] text-white backdrop-blur-[2px]">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <span>{game.playtime.recent_desc}</span>
                {/* 平台图标 */}
                {game.playtime.platforms && game.playtime.platforms.length > 0 && (
                  <>
                    {game.playtime.platforms.map((platform) => (
                      <PlatformIcon
                        key={platform.platform}
                        className="h-2.5 w-2.5 text-white/60"
                        platform={platform.platform}
                      />
                    ))}
                  </>
                )}
              </div>
            )
          ) : (
            // 游戏库：显示总时长
            <div className="absolute top-1 right-1 flex items-center gap-1 rounded-full border border-white/20 bg-black/70 px-2 py-0.5 text-[10px] text-white backdrop-blur-[2px]">
              <span>
                {game.playtime.total_minutes
                  ? hideDetails
                    ? `曾经玩过`
                    : `总计 ${game.playtime.total_desc}`
                  : '仓库吃灰中'}
              </span>
              {/* 平台图标 */}
              {game.playtime.platforms && game.playtime.platforms.length > 0 && (
                <>
                  {game.playtime.platforms.map((platform) => (
                    <PlatformIcon
                      key={platform.platform}
                      className="h-2 w-2 text-white/60"
                      platform={platform.platform}
                    />
                  ))}
                </>
              )}
            </div>
          )}

          {/* 游戏信息 - 左下角 */}
          <div className="absolute right-0 bottom-0 left-0 p-3">
            <h3 className="line-clamp-1 text-sm font-medium text-white">{game.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
