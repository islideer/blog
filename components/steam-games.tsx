import Image from 'next/image'
import { about } from '@/lib/data'
import { PlatformIcon } from './platform-icon'

interface SteamGame {
  appid: number
  name: string
  playtime_2weeks: number
  playtime_2weeks_desc: string
  playtime_total: number
  playtime_total_desc: string
  icon_url: string
  store_url: string
  platforms: {
    platform: string
    total_minutes: number
    total_desc: string
  }[]
}

async function getSteamGames(): Promise<SteamGame[]> {
  try {
    const response = await fetch(`https://api.viki.moe/steam/${about.steamId64}/recently-played`, {
      next: { revalidate: 60_10 }, // 缓存 10 分钟
    })

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

export async function SteamGames() {
  if (!about.steamId64) {
    return null
  }

  const games = await getSteamGames()

  if (games.length === 0) {
    return null
  }

  return (
    <section className="space-y-4">
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
        最近在玩 / Recently Played
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {games.map((game) => {
          const totalTime = game.playtime_total ? game.playtime_total_desc : null

          return (
            <div key={game.appid} className="flex items-start gap-3">
              {/* 游戏图标 */}
              <Image
                src={game.icon_url}
                alt={game.name}
                width={40}
                height={40}
                className="border-border size-10 max-h-10 max-w-8 shrink-0 rounded border object-cover"
              />

              {/* 游戏信息 */}
              <div className="min-w-0 flex-1 space-y-0.5">
                <a
                  href={game.store_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-primary text-text-primary no-icon block truncate text-sm"
                >
                  {game.name}
                </a>
                <div className="text-text-secondary flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                  {game.platforms.length > 0 && (
                    <div className="flex items-center gap-1">
                      {game.platforms.map((platform) => (
                        <PlatformIcon
                          key={platform.platform}
                          className="text-text-tertiary h-3 w-3"
                          platform={platform.platform}
                        />
                      ))}
                    </div>
                  )}

                  <span className="text-text-tertiary">
                    最近 {game.playtime_2weeks_desc.replace(/[小钟]/g, '')}
                  </span>

                  {totalTime && (
                    <>
                      <span className="text-text-tertiary">·</span>
                      <span className="text-text-tertiary">
                        共 {totalTime.replace(/[小钟]/g, '')}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
