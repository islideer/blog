'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { dayjs } from '@/lib/dayjs'

import type { DoubanItem, DoubanResponse } from '@/lib/douban'

interface MoviesProps {
  id?: string
  data: DoubanResponse
}

export function Movies({ id, data }: MoviesProps) {
  const totalCount = data.collect.length + data.wish.length + data.doings.length

  if (totalCount === 0) {
    return (
      <section className="space-y-4" id={id}>
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">影视</h2>
        <p className="text-text-tertiary text-sm">暂无影视数据</p>
      </section>
    )
  }

  return (
    <section className="space-y-6" id={id}>
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
        影视 ({totalCount.toLocaleString()})
      </h2>

      {/* 在看 */}
      {data.doings.length > 0 && (
        <MovieSection
          id="movies-doings"
          title="在看"
          movies={data.doings}
          badgeColor="bg-blue-500"
        />
      )}

      {/* 想看 */}
      {data.wish.length > 0 && (
        <MovieSection id="movies-wish" title="想看" movies={data.wish} badgeColor="bg-yellow-500" />
      )}

      {/* 看过 */}
      {data.collect.length > 0 && (
        <MovieSection
          id="movies-collect"
          title="看过"
          movies={data.collect}
          badgeColor="bg-green-500"
        />
      )}
    </section>
  )
}

interface MovieSectionProps {
  id: string
  title: string
  movies: DoubanItem[]
  badgeColor: string
}

function MovieSection({ id, title, movies, badgeColor }: MovieSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const initialDisplayCount = 8 // 默认显示 8 个（约 2 排）
  const displayedMovies = showAll ? movies : movies.slice(0, initialDisplayCount)
  const hasMore = movies.length > initialDisplayCount

  return (
    <div className="space-y-3" id={id}>
      <div className="flex items-center gap-2">
        <h3 className="text-text-secondary text-xs font-medium">{title}</h3>
        <span className="text-text-tertiary text-xs">({movies.length})</span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {displayedMovies.map((movie) => (
          <div
            key={movie.id}
            className="border-border group sm:hover:border-text-tertiary flex flex-col overflow-hidden rounded-lg border"
          >
            {/* 影视封面 */}
            <div className="bg-bg-secondary relative aspect-3/4 w-full overflow-hidden">
              <Image
                src={movie.cover}
                alt={movie.title}
                width={240}
                height={320}
                data-zoomable
                className="h-full w-full object-cover"
              />
              {/* 状态角标 */}
              <div
                className={`absolute top-2 right-2 ${badgeColor} rounded px-1 py-0.5 text-xs font-medium text-white`}
              >
                {title}
              </div>
            </div>

            {/* 影视信息 */}
            <div className="flex flex-col gap-2 p-3">
              <Link
                href={movie.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary text-text-secondary truncate text-sm font-medium text-nowrap"
              >
                {movie.title}
              </Link>

              {movie.date && (
                <p className="text-text-tertiary text-xs">
                  {dayjs(movie.date).format('YYYY 年 M 月 D 日标记')}
                </p>
              )}
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
            {showAll ? '收起' : `展示更多 (${movies.length - initialDisplayCount})`}
          </button>
        </div>
      )}
    </div>
  )
}
