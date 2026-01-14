'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import type { BangumiItem } from '@/lib/bangumi'

interface BangumiListProps {
  id?: string
  bangumi: BangumiItem[]
}

export function Bangumi({ id, bangumi }: BangumiListProps) {
  const [showAll, setShowAll] = useState(false)
  const initialDisplayCount = 8 // 默认显示 8 个（约 2 排）
  const displayedBangumi = showAll ? bangumi : bangumi.slice(0, initialDisplayCount)
  const hasMore = bangumi.length > initialDisplayCount

  if (bangumi.length === 0) {
    return (
      <section className="space-y-4" id={id}>
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">追番</h2>
        <p className="text-text-tertiary text-sm">暂无追番数据</p>
      </section>
    )
  }

  return (
    <section className="space-y-4" id={id}>
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
        追番{bangumi.length ? ` (${bangumi.length.toLocaleString()})` : ''}
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {displayedBangumi.map((item) => (
          <div
            key={item.season_id}
            className="border-border group sm:hover:border-text-tertiary flex flex-col overflow-hidden rounded-lg border"
          >
            {/* 番剧封面 */}
            <div className="bg-bg-secondary relative aspect-square w-full overflow-hidden">
              <Image
                src={item.square_cover || item.cover}
                alt={item.title}
                width={240}
                height={240}
                data-zoomable
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              {/* 徽章 */}
              {item.badge_info && (
                <div
                  className={`absolute top-2 right-2 rounded px-1 py-0.5 text-xs font-medium text-white`}
                  style={{ backgroundColor: item.badge_info.bg_color }}
                >
                  {item.badge_info.text}
                </div>
              )}
            </div>

            {/* 番剧信息 */}
            <div className="flex flex-col gap-2 p-3">
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary text-text-secondary truncate text-sm font-medium text-nowrap"
              >
                {item.title}
              </Link>

              {item.subtitle && (
                <p className="text-text-tertiary truncate text-xs text-nowrap">{item.subtitle}</p>
              )}

              <div className="text-text-secondary flex flex-wrap items-center gap-x-0.5 gap-y-1 text-xs">
                {item.areas && item.areas.length > 0 && (
                  <span>
                    {item.areas
                      .slice(0, 1)
                      .map((e) => e.name)
                      .join('·')}
                  </span>
                )}
                {item.rating && (
                  <>
                    {item.areas && item.areas.length && <span>·</span>}
                    <span>{item.rating.score}分</span>
                  </>
                )}
                {item.styles && item.styles.length ? (
                  <>
                    <span>·</span>
                    {item.styles.slice(0, 2).join('/')}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 展示更多按钮 */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="hover:bg-bg-secondary text-text-secondary hover:text-text-primary rounded-lg px-4 py-2 text-sm transition-colors"
          >
            {showAll ? '收起' : `展示更多 (${bangumi.length - initialDisplayCount})`}
          </button>
        </div>
      )}
    </section>
  )
}
