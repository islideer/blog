'use client'

import Image from 'next/image'
import { about } from '@/lib/data'
import { PlatformIcon } from './platform-icon'
import { useEffect, useState } from 'react'
import { ArticleZoomProvider } from './article-zoom-provider'

interface PlatformPlaytime {
  platform: string
  total_minutes: number
  total_desc: string
}

interface SteamGame {
  appid: number
  name: string
  store_url: string
  playtime: {
    recent: number
    recent_desc: string
    total?: number
    total_desc?: string
    platforms?: PlatformPlaytime[]
  }
  image: {
    icon: string
    header: string
    hero: string
    capsule_231_87: string
    capsule_616_353: string
  }
}

// async function getSteamGamesByConfigId(): Promise<SteamGame[]> {
//   try {
//     const response = await fetch(`https://api.viki.moe/steam/${about.steamId64}/recently-played`)
//     if (!response.ok) {
//       console.error('Failed to fetch Steam games:', response.statusText)
//       return []
//     }
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error('Error fetching Steam games:', error)
//     return []
//   }
// }

async function getSteamGames(): Promise<SteamGame[]> {
  try {
    const response = await fetch(`https://api.viki.moe/steam/recently-played`)
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

export function SteamGames() {
  const [games, setGames] = useState<SteamGame[]>([])
  const [loading, setLoading] = useState(!!about.steamId64)

  useEffect(() => {
    if (!about.steamId64) return

    getSteamGames().then((data) => {
      // 只显示最近两周玩了超过 10 分钟的游戏
      // setGames(data.filter((game) => game.playtime.recent >= 10))
      setGames(data)
      setLoading(false)
    })
  }, [])

  if (!about.steamId64) {
    return null
  }

  return (
    <section className="space-y-4">
      <h2 className="text-text-primary text-xs font-semibold tracking-wider uppercase">
        最近在玩 / Recently Played
      </h2>
      <ArticleZoomProvider deps={[games]}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {games.map((game) => {
            const totalTime = game.playtime.total ? game.playtime.total_desc : null

            return (
              <div key={game.appid} className="flex items-center gap-2.5">
                {/* 游戏封面 */}
                <Image
                  src={game.image.header}
                  alt={game.name}
                  width={107}
                  height={50}
                  data-zoomable
                  className="border-border aspect-107/50 h-16 shrink-0 rounded border object-cover"
                />

                {/* 游戏信息 */}
                <div className="min-w-0 flex-1 space-y-2">
                  <a
                    href={game.store_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-text-primary text-text-primary block truncate text-sm"
                  >
                    {game.name}
                  </a>
                  <div className="text-text-secondary flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
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

                    <span className="text-text-tertiary">最近 {game.playtime.recent_desc}</span>

                    {totalTime && (
                      <>
                        <span className="text-text-tertiary">·</span>
                        <span className="text-text-tertiary">共 {totalTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          {games.length === 0 && (
            <p className="text-text-secondary text-sm">
              {loading ? '正在视奸中，请稍后...' : 'Viki 近两周没有玩游戏。'}
            </p>
          )}
        </div>
      </ArticleZoomProvider>
    </section>
  )
}
