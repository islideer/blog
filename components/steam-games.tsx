import Image from 'next/image'
import { about } from '@/lib/data'
import { PlatformIcon } from './platform-icon'

interface PlatformPlaytime {
  platform: string
  total_minutes: number
  total_desc: string
}

interface SteamGame {
  appid: number
  name: string
  playtime_2weeks: number
  playtime_2weeks_desc: string
  playtime_total?: number
  playtime_total_desc?: string
  store_url: string
  image: {
    icon: string
    header: string
    hero: string
    capsule_231_87: string
    capsule_616_353: string
  }
  platforms: PlatformPlaytime[]
}

async function getSteamGames(): Promise<SteamGame[]> {
  try {
    const response = await fetch(`https://api.viki.moe/steam/${about.steamId64}/recently-played`)

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
      <h2 className="text-text-primary text-xs font-semibold tracking-wider uppercase">
        最近在玩 / Recently Played
      </h2>
      <div className="grid grid-cols-1 gap-2.5">
        {games.map((game) => {
          const totalTime = game.playtime_total ? game.playtime_total_desc : null

          return (
            <div key={game.appid} className="flex items-start gap-2.5">
              {/* 游戏封面 */}
              <Image
                src={game.image.header}
                alt={game.name}
                width={107}
                height={50}
                className="border-border aspect-107/50 h-16 shrink-0 rounded border object-cover"
              />

              {/* 游戏信息 */}
              <div className="min-w-0 flex-1 space-y-1">
                <a
                  href={game.store_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-primary text-text-primary block truncate text-sm"
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
