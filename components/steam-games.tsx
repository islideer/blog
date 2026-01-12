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
  image: GameImage
}

interface GameImage {
  icon: string
  header: string
  hero: string
  capsule_231x87: string
  capsule_616x353: string
}

interface GameInfo {
  appid: number
  name: string
  store_url: string
  image: GameImage
  server_ip: string | null
}

interface SteamProfile {
  steam_id: string
  persona_name: string
  avatar: {
    small: string
    medium: string
    full: string
  }
  profile_url: string
  profile_state: number
  visibility: number
  visibility_desc: string
  is_online: boolean
  online_status_desc: string
  last_logoff: number | null
  last_logoff_at: number | null
  last_logoff_desc: string | null
  comment_permission: number | null
  real_name: string | null
  primary_clan_id: string | null
  time_created: number | null
  time_created_at: number | null
  time_created_desc: string | null
  country_code: string | null
  location: string | null
  persona_state: number
  persona_state_desc: string
  game_info: GameInfo | null
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

async function getSteamProfile(): Promise<SteamProfile | null> {
  try {
    const response = await fetch(`https://api.viki.moe/steam/summary`)
    if (!response.ok) {
      console.error('Failed to fetch Steam profile:', response.statusText)
      return null
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching Steam profile:', error)
    return null
  }
}

export function SteamGames() {
  const [games, setGames] = useState<SteamGame[]>([])
  const [profile, setProfile] = useState<SteamProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getSteamGames(), getSteamProfile()]).then(([gamesData, profileData]) => {
      setGames(gamesData)
      setProfile(profileData)
      setLoading(false)
    })
  }, [])

  if (!about.steamId64) {
    return null
  }

  return (
    <section className="space-y-4">
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
        最近在玩 / Recently Played
      </h2>

      {/* Steam 个人资料 - 袖珍扁平化 */}
      {profile && (
        <div className="border-border flex items-center gap-2 border-b py-2">
          <Image
            src={profile.avatar.full}
            alt={profile.persona_name}
            width={36}
            height={36}
            data-zoomable
            className="h-9 w-9 rounded-xs"
          />

          <div className="flex flex-1 flex-col gap-0.5 truncate">
            <span
              className={`${profile.is_online ? 'text-[#6dcff6]' : 'text-text-primary'} block text-sm`}
            >
              {profile.persona_name}
            </span>
            <span
              className={`${profile.game_info ? 'text-[#6dcff680]' : 'text-text-secondary'} text-xs`}
            >
              {profile.online_status_desc}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-2">
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
                      className="hover:text-text-primary text-text-secondary block truncate text-sm"
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
      </div>
    </section>
  )
}
