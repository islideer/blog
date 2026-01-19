import Image from 'next/image'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/config'
import { SteamRefreshButton } from './steam-refresh-button'

import type { SteamProfile as SteamProfileType } from '@/lib/steam'

interface SteamProfileProps {
  id?: string
  profile: SteamProfileType | null
}

/**
 * Steam 个人资料组件（纯服务端组件）
 * - 完全在服务端渲染
 * - 刷新按钮是独立的客户端组件
 */
export function SteamProfile({ id, profile }: SteamProfileProps) {
  // 如果没有数据，显示降级状态
  if (!profile) {
    return (
      <section className="space-y-4" id={id}>
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
          Steam 个人资料
        </h2>
        <p className="text-text-secondary text-sm">
          暂时无法加载 {siteConfig.author.name} 的 Steam 个人资料
        </p>
      </section>
    )
  }

  return (
    <section className="space-y-4" id={id}>
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
          Steam 个人资料
        </h2>
        {/* 独立的客户端组件处理刷新交互 */}
        <SteamRefreshButton />
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
                className={cn(
                  'block text-lg font-medium transition-colors duration-300',
                  profile.is_online
                    ? profile.game_info
                      ? 'text-[#91C252] dark:text-[#E2FFB9]'
                      : 'text-[#31b0e2] dark:text-[#6dcff6]'
                    : 'text-text-secondary',
                )}
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
              className={cn(
                'text-xs transition-colors duration-300',
                profile.is_online
                  ? profile.game_info
                    ? 'text-[#91C252] dark:text-[#91C252]'
                    : 'text-[#4dbfec] dark:text-[#6dcff680]'
                  : 'text-text-tertiary',
              )}
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
              {profile.games_owned}
              <span className="text-text-tertiary mx-1 opacity-60">/</span>
              {profile.games_played}
              <span className="text-text-tertiary mx-1 opacity-60">/</span>
              {profile.games_never_played}
            </p>
          </div>
          <div className="hidden space-y-1 sm:block">
            <p className="text-text-tertiary text-xs">账户等级</p>
            <p className="text-text-primary text-lg font-semibold">{profile.level_desc}</p>
          </div>
          <div className="hidden space-y-1 sm:block">
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
