'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { BangumiItem } from '@/lib/bangumi'
import { ChevronDownIcon } from './icons/chevron-down'
import { ChevronUpIcon } from './icons/chevron-up'

interface BangumiListProps {
  id?: string
  bangumi: BangumiItem[]
}

export function Bangumi({ id, bangumi }: BangumiListProps) {
  if (!bangumi || bangumi.length === 0) {
    return (
      <section className="space-y-4" id={id}>
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">追番</h2>
        <p className="text-text-tertiary text-sm">暂无追番数据</p>
      </section>
    )
  }

  // 按 follow_status 分类
  const grouped: Record<'wish' | 'doings' | 'collect', BangumiItem[]> = {
    wish: bangumi.filter((b) => b.follow_status === 1),
    doings: bangumi.filter((b) => b.follow_status === 2),
    collect: bangumi.filter((b) => b.follow_status === 3),
  }

  return (
    <section className="space-y-6" id={id}>
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
        追番 ({bangumi.length.toLocaleString()})
      </h2>
      {grouped.collect.length > 0 && (
        <BangumiSection id="bangumi-collect" title="看过" items={grouped.collect} />
      )}

      {grouped.doings.length > 0 && (
        <BangumiSection id="bangumi-doings" title="在看" items={grouped.doings} />
      )}

      {grouped.wish.length > 0 && (
        <BangumiSection id="bangumi-wish" title="想看" items={grouped.wish} />
      )}
    </section>
  )
}

interface BangumiSectionProps {
  id: string
  title: string
  items: BangumiItem[]
}

export function BangumiSection({ id, title, items }: BangumiSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const initialDisplayCount = 4 // 默认显示 4 个（约 1 排）
  const displayedBangumi = showAll ? items : items.slice(0, initialDisplayCount)
  const hasMore = items.length > initialDisplayCount

  if (items.length === 0) return null

  return (
    <div className="space-y-3" id={id}>
      <div className="flex items-center gap-2">
        <h3 className="text-text-secondary text-xs font-medium">{title}</h3>
        <span className="text-text-tertiary text-xs">({items.length})</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
        {displayedBangumi.map((bangumi) => (
          <Link
            key={bangumi.season_id}
            href={bangumi.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-3/4 overflow-hidden rounded-lg"
          >
            {/* 番剧封面 */}
            <Image
              src={bangumi.cover}
              alt={bangumi.title}
              width={180}
              height={240}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-all! duration-300 group-hover:scale-110"
            />

            {/* 徽章和状态角标 */}
            <div className="absolute top-2 left-2 flex gap-2">
              {bangumi.badge_info?.text && (
                <div
                  className="rounded-sm px-1 py-0.5 text-xs font-medium text-white"
                  style={{ backgroundColor: `${bangumi.badge_info.bg_color}` }}
                >
                  {bangumi.badge_info.text}
                </div>
              )}
            </div>

            <div className="absolute top-2 right-2 flex gap-2">
              {/* {bangumi.badge_info?.text && (
                <div
                  className="rounded-sm px-1 py-0.5 text-xs font-medium text-white"
                  style={{ backgroundColor: `${bangumi.badge_info.bg_color}` }}
                >
                  {bangumi.badge_info.text}
                </div>
              )} */}
              <div
                className={`rounded-full border border-white/20 bg-black/48 px-2 py-0.5 text-[10px] text-white backdrop-blur-[2px]`}
              >
                {title}
              </div>
            </div>

            {/* 渐变遮罩 */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

            {/* 番剧信息 */}
            <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-1.5 p-3">
              <h3 className="line-clamp-2 text-sm font-medium text-white">{bangumi.title}</h3>
              <p className="line-clamp-1 text-xs text-white/70">
                {bangumi.subtitle || bangumi.evaluate || bangumi.summary || '暂无简介'}
              </p>
              <div className="flex flex-wrap items-center gap-x-0.5 gap-y-1 text-xs text-white/80">
                {bangumi.areas && bangumi.areas.length > 0 && (
                  <span>
                    {bangumi.areas
                      .slice(0, 1)
                      .map((e) => e.name)
                      .join('·')}
                  </span>
                )}
                {bangumi.rating && (
                  <>
                    {bangumi.areas && bangumi.areas.length && <span>·</span>}
                    <span>{bangumi.rating.score}分</span>
                  </>
                )}
                {bangumi.styles && bangumi.styles.length ? (
                  <>
                    <span>·</span>
                    {bangumi.styles.slice(0, 2).join('/')}
                  </>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="hover:bg-bg-secondary text-text-secondary hover:text-text-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors"
          >
            {showAll ? (
              <>
                <ChevronUpIcon className="h-4 w-4" />
                收起
              </>
            ) : (
              <>
                <ChevronDownIcon className="h-4 w-4" />
                展示更多 ({items.length - initialDisplayCount})
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
