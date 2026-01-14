/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import Image from 'next/image'
import { PlatformIcon } from './platform-icon'
import { useEffect, useState } from 'react'
import { ImageZoomProvider } from './image-zoom-provider'
import Link from 'next/link'

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
  level: number
  level_desc: string
  account_age_years: number
  account_age_years_desc: string
  games_owned: number
  games_played: number
  games_never_played: number
  games_total_playtime: number
  games_total_playtime_desc: string
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

async function getSteamGames(steamId: string): Promise<SteamGame[]> {
  try {
    // const response = await fetch(`https://api.viki.moe/steam/${steamId}/recently-played`)
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

async function getSteamProfile(steamId: string): Promise<SteamProfile | null> {
  try {
    // const response = await fetch(`https://api.viki.moe/steam/${steamId}/summary`)
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

export function SteamGames({ id, steamId, title }: { id: string; steamId: string; title: string }) {
  const [games, setGames] = useState<SteamGame[]>([])
  const [profile, setProfile] = useState<SteamProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    Promise.all([getSteamGames(steamId), getSteamProfile(steamId)]).then(
      ([gamesData, profileData]) => {
        setGames(gamesData)
        setProfile(profileData)
        setLoading(false)
      },
    )

    // 如果停留在页面，每 1 分钟刷新一次实时状态
    const interval = setInterval(async () => {
      setProfile(await getSteamProfile(steamId))
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [steamId])

  const handleRefresh = async () => {
    if (refreshing) return
    setRefreshing(true)
    try {
      const [gamesData, profileData] = await Promise.all([
        getSteamGames(steamId),
        getSteamProfile(steamId),
      ])
      setGames(gamesData)
      setProfile(profileData)
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <section className="space-y-4" id={id}>
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
          {title}
        </h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="text-text-secondary sm:hover:bg-bg-secondary sm:hover:text-text-primary active:bg-bg-secondary active:text-text-primary inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="刷新 Steam 信息"
        >
          <RefreshIcon className={refreshing ? 'animate-spin' : ''} />
          刷新状态
        </button>
      </div>

      <div className="divide-border space-y-4 divide-y">
        {profile && (
          <div className="flex items-center gap-2 pb-4">
            <Image
              src={profile.avatar.full}
              alt={profile.persona_name}
              width={64}
              height={64}
              data-zoomable
              className="border-border h-16 w-16 rounded border object-cover"
            />

            <div className="flex flex-1 flex-col gap-1 truncate">
              <div className="flex items-center gap-1.5">
                <span
                  className={`${profile.is_online ? (profile.game_info ? 'text-[#91C252] dark:text-[#E2FFB9]' : 'text-[#31b0e2] dark:text-[#6dcff6]') : 'text-text-secondary'} block text-base`}
                >
                  {profile.persona_name}
                </span>
              </div>
              <span className="text-text-tertiary inline-flex items-center gap-1.5 text-xs">
                <span className="bg-bg-quaternary inline-flex h-4 min-w-6 items-center justify-center rounded px-1 text-[10px] font-medium">
                  {profile.level_desc}
                </span>
                <span className="bg-bg-quaternary inline-flex h-4 min-w-6 items-center justify-center rounded px-1 text-[10px] font-medium">
                  {profile.account_age_years_desc}
                </span>
                <span className="bg-bg-quaternary inline-flex h-4 min-w-6 items-center justify-center rounded px-1 text-[10px] font-medium">
                  拥有 {profile.games_owned} 款游戏
                </span>
                <span className="bg-bg-quaternary inline-flex h-4 min-w-6 items-center justify-center rounded px-1 text-[10px] font-medium">
                  玩过 {profile.games_played} 款游戏
                </span>
              </span>
              <span
                className={`${profile.is_online ? (profile.game_info ? 'text-[#91C252] dark:text-[#91C252]' : 'text-[#4dbfec] dark:text-[#6dcff680]') : 'text-text-tertiary'} text-xs`}
              >
                {profile.online_status_desc}
              </span>
            </div>
          </div>
        )}

        <ImageZoomProvider deps={[games]}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {games
              .filter((e) => e.playtime.recent > 3)
              .map((game) => {
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
                      <Link
                        href={game.store_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-text-primary text-text-secondary block truncate text-sm"
                      >
                        {game.name}
                      </Link>
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
        </ImageZoomProvider>
      </div>
    </section>
  )
}

function RefreshIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`h-3.5 w-3.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  )
}
