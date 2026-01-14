'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PlatformIcon } from './platform-icon'
import { ImageZoomProvider } from './image-zoom-provider'

interface PlatformPlaytime {
  platform: string
  total_minutes: number
  total_desc: string
}

interface GameImage {
  icon: string
  logo: string
  header: string
  hero: string
  background: string
  library_hero: string
  library_hero_2x: string
  capsule_sm_120: string
  capsule_184x69: string
  capsule_231x87: string
  capsule_616x353: string
  library_600x900: string
  library_600x900_2x: string
}

interface LibraryGame {
  appid: number
  name: string
  store_url: string
  playtime: {
    total_minutes: number
    total_desc: string
    recent_minutes: number | null
    recent_desc: string | null
    platforms?: PlatformPlaytime[]
  }
  image: GameImage
  has_community_visible_stats: boolean | null
  content_descriptors: string[]
}

interface RecentGame {
  appid: number
  name: string
  store_url: string
  playtime: {
    recent_minutes: number
    recent_desc: string
    total_minutes?: number
    total_desc?: string
    platforms?: PlatformPlaytime[]
  }
  image: GameImage
}

async function getLibraryGames(): Promise<LibraryGame[]> {
  try {
    const response = await fetch('https://api.viki.moe/steam/games')
    if (!response.ok) {
      console.error('Failed to fetch Steam games:', response.statusText)
      return []
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching Steam games:', error)
    return []
  }
}

async function getRecentlyPlayed(): Promise<RecentGame[]> {
  try {
    const response = await fetch('https://api.viki.moe/steam/recently-played')
    if (!response.ok) {
      console.error('Failed to fetch recently played games:', response.statusText)
      return []
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching recently played games:', error)
    return []
  }
}

export function SteamGameLibrary({ steamId }: { steamId: string }) {
  const [libraryGames, setLibraryGames] = useState<LibraryGame[]>([])
  const [recentGames, setRecentGames] = useState<RecentGame[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'recent' | 'library'>('recent')

  useEffect(() => {
    Promise.all([getRecentlyPlayed(), getLibraryGames()]).then(([recent, library]) => {
      setRecentGames(recent.filter((game) => game.playtime.recent_minutes > 3))
      setLibraryGames(library)
      setLoading(false)
    })
  }, [steamId])

  if (loading) {
    return (
      <section className="space-y-4">
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">游戏库</h2>
        <p className="text-text-secondary text-sm">正在加载游戏库...</p>
      </section>
    )
  }

  // 按总游玩时长排序游戏库
  const sortedLibraryGames = [...libraryGames].sort(
    (a, b) => b.playtime.total_minutes - a.playtime.total_minutes,
  )

  return (
    <section className="space-y-4">
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
        <GamesList games={sortedLibraryGames} />
      )}
    </section>
  )
}

function GamesList({
  games,
  showRecently,
}: {
  games: (LibraryGame | RecentGame)[]
  showRecently?: boolean
}) {
  return (
    <ImageZoomProvider deps={[games]}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
                className="hover:text-text-primary text-text-secondary line-clamp-1 truncate text-sm font-medium"
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
                    ? `共 ${game.playtime.total_desc}`
                    : '还没有玩过，库里吃灰呢'}
                </span>
              </div>
              {game.playtime.recent_desc && showRecently && (
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
