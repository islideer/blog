import Image from 'next/image'
import { siteConfig } from '@/lib/config'
import { ClientCounterUp } from '../client-counter-up'

import type { DoubanProfile as DoubanProfileType, DoubanResponse } from '@/lib/douban'

interface DoubanProfileProps {
  id?: string
  profile: DoubanProfileType | null
  books: DoubanResponse
  movies: DoubanResponse
}

const now = Date.now()

/**
 * 豆瓣个人资料组件（纯服务端组件）
 * 参考 Steam Profile 的设计风格
 */
export function DoubanProfile({ id, profile, books, movies }: DoubanProfileProps) {
  // 如果没有数据，显示降级状态
  if (!profile) {
    return (
      <section className="space-y-4">
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase" id={id}>
          豆瓣个人资料
        </h2>
        <p className="text-text-secondary text-sm">
          暂时无法加载 {siteConfig.author.name} 的豆瓣个人资料
        </p>
      </section>
    )
  }

  profile.books.collect ||= books.collect.length
  profile.books.wish ||= books.wish.length
  profile.books.doings ||= books.doings.length

  profile.movies.collect ||= movies.collect.length
  profile.movies.wish ||= movies.wish.length
  profile.movies.doings ||= movies.doings.length

  // 计算账户年龄
  const accountAgeYears = Math.floor((now - profile.join_date_at) / (365.25 * 24 * 60 * 60 * 1000))

  return (
    <section className="space-y-4">
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase" id={id}>
        豆瓣个人资料
      </h2>

      <div className="border-border divide-border flex flex-col divide-y rounded-lg border">
        {/* 个人资料卡片 */}
        <div className="flex items-center gap-3 p-4">
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={80}
              height={80}
              className="border-border h-20 w-20 shrink-0 rounded border object-cover"
            />
          ) : (
            <div className="bg-bg-secondary flex h-20 w-20 items-center justify-center rounded border">
              <span className="text-text-secondary text-sm capitalize">
                {profile.name.charAt(0)}
              </span>
            </div>
          )}

          <div className="flex flex-1 flex-col gap-2 truncate">
            <div className="flex items-center gap-2">
              <span className="text-text-primary block text-lg font-medium">{profile.name}</span>
            </div>
            <div className="text-text-tertiary flex flex-wrap items-center gap-1.5 text-xs">
              <span className="bg-bg-tertiary inline-flex h-5 min-w-6 items-center justify-center rounded px-1.5 text-xs font-medium">
                加入 {accountAgeYears} 年
              </span>
              {profile.movies.collect > 0 && (
                <span className="bg-bg-tertiary inline-flex h-5 min-w-6 items-center justify-center rounded px-1.5 text-xs font-medium">
                  看过 {profile.movies.collect} 部
                </span>
              )}
              {profile.movies.wish > 0 && (
                <span className="bg-bg-tertiary hidden h-5 min-w-6 items-center justify-center rounded px-1.5 text-xs font-medium sm:inline-flex">
                  想看 {profile.movies.wish} 部
                </span>
              )}
              {profile.books.collect > 0 && (
                <span className="bg-bg-tertiary inline-flex h-5 min-w-6 items-center justify-center rounded px-1.5 text-xs font-medium">
                  读过 {profile.books.collect} 本
                </span>
              )}
              {profile.books.wish > 0 && (
                <span className="bg-bg-tertiary hidden h-5 min-w-6 items-center justify-center rounded px-1.5 text-xs font-medium sm:inline-flex">
                  想读 {profile.books.wish} 本
                </span>
              )}
            </div>
            <span className="text-text-tertiary text-xs">加入于 {profile.join_date}</span>
          </div>
        </div>

        {/* 统计数据 - Steam 风格 */}
        {(profile.movies.collect > 0 || profile.books.collect > 0) && (
          <div className="grid gap-4 p-4 grid-cols-2">
            <div className="space-y-1">
              <p className="text-text-tertiary text-xs">看过 / 在看 / 想看</p>
              <p className="text-text-primary text-lg font-semibold">
                <ClientCounterUp end={profile.movies.collect} />
                <span className="text-text-tertiary mx-1 opacity-60">/</span>
                <ClientCounterUp end={profile.movies.doings} />
                <span className="text-text-tertiary mx-1 opacity-60">/</span>
                <ClientCounterUp end={profile.movies.wish} />
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-text-tertiary text-xs">读过 / 在读 / 想读</p>
              <p className="text-text-primary text-lg font-semibold">
                <ClientCounterUp end={profile.books.collect} />
                <span className="text-text-tertiary mx-1 opacity-60">/</span>
                <ClientCounterUp end={profile.books.doings} />
                <span className="text-text-tertiary mx-1 opacity-60">/</span>
                <ClientCounterUp end={profile.books.wish} />
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
