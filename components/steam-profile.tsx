'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { SteamProfile as SteamProfileType } from '@/lib/steam'
import { fetchSteamProfile } from '@/lib/steam'

interface SteamProfileProps {
  steamId: string
  id?: string
  initialData?: SteamProfileType | null
}

export function SteamProfile({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  steamId,
  id,
  initialData = null,
}: SteamProfileProps) {
  const [profile, setProfile] = useState<SteamProfileType | null>(initialData)
  const [refreshing, setRefreshing] = useState(false)

  // 如果没有初始数据，显示 loading 状态（降级方案）
  if (!profile) {
    return (
      <section className="space-y-4" id={id}>
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
          个人资料
        </h2>
        <p className="text-text-secondary text-sm">正在视奸中...</p>
      </section>
    )
  }

  const handleRefresh = async () => {
    if (refreshing) return
    setRefreshing(true)
    try {
      const profileData = await fetchSteamProfile()
      if (profileData) {
        setProfile(profileData)
      }
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <section className="space-y-4" id={id}>
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
          Steam 个人资料
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

      <div className="border-border divide-border flex flex-col divide-y rounded-lg border">
        {/* 个人资料卡片 */}
        <div className="flex items-center gap-3 p-4">
          <Image
            src={profile.avatar.full}
            alt={profile.persona_name}
            width={80}
            height={80}
            className="border-border h-20 w-20 shrink-0 rounded border object-cover"
          />

          <div className="flex flex-1 flex-col gap-2 truncate">
            <div className="flex items-center gap-2">
              <span
                className={`${profile.is_online ? (profile.game_info ? 'text-[#91C252] dark:text-[#E2FFB9]' : 'text-[#31b0e2] dark:text-[#6dcff6]') : 'text-text-secondary'} block text-lg font-medium`}
              >
                {profile.persona_name}
              </span>
            </div>
            <div className="text-text-tertiary flex flex-wrap items-center gap-1.5 text-xs">
              <span className="bg-bg-quaternary inline-flex h-5 min-w-6 items-center justify-center rounded px-1.5 text-xs font-medium">
                {profile.level_desc}
              </span>
              <span className="bg-bg-quaternary inline-flex h-5 min-w-6 items-center justify-center rounded px-1.5 text-xs font-medium">
                {profile.account_age_years_desc}
              </span>
              <span className="bg-bg-quaternary inline-flex h-5 min-w-6 items-center justify-center rounded px-1.5 text-xs font-medium">
                拥有 {profile.games_owned} 款游戏
              </span>
              <span className="bg-bg-quaternary hidden h-5 min-w-6 items-center justify-center rounded px-1.5 text-xs font-medium sm:inline-flex">
                玩过 {profile.games_played} 款游戏
              </span>
            </div>
            <span
              className={`${profile.is_online ? (profile.game_info ? 'text-[#91C252] dark:text-[#91C252]' : 'text-[#4dbfec] dark:text-[#6dcff680]') : 'text-text-tertiary'} text-xs`}
            >
              {profile.online_status_desc}
            </span>
          </div>
        </div>

        {/* 游戏统计 */}
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4">
          <div className="space-y-1">
            <p className="text-text-tertiary text-xs">总游玩时长</p>
            <p className="text-text-primary text-lg font-semibold">
              {profile.games_total_playtime_desc}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-text-tertiary text-xs">拥有 / 玩过 / 从未玩过</p>
            <p className="text-text-primary text-lg font-semibold">
              {profile.games_owned} / {profile.games_played} / {profile.games_never_played}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-text-tertiary text-xs">账户等级</p>
            <p className="text-text-primary text-lg font-semibold">{profile.level_desc}</p>
          </div>
          <div className="space-y-1">
            <p className="text-text-tertiary text-xs">账户年资</p>
            <p className="text-text-primary text-lg font-semibold">
              {profile.account_age_years_desc}
            </p>
          </div>
        </div>
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
