'use client'

import Link from 'next/link'
import Image from 'next/image'
import { dayjs } from '@/lib/dayjs'
import { useState } from 'react'

import type { DoubanItem, DoubanResponse } from '@/lib/douban'
import { ChevronDownIcon } from './icons/chevron-down'
import { ChevronUpIcon } from './icons/chevron-up'
import { useAutoSize } from './hooks/use-auto-size'

interface BooksProps {
  id?: string
  data: DoubanResponse
}

export function Books({ id, data }: BooksProps) {
  const totalCount = data.collect.length + data.wish.length + data.doings.length

  if (totalCount === 0) {
    return (
      <section className="space-y-4" id={id}>
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">书籍</h2>
        <p className="text-text-tertiary text-sm">暂无书籍数据</p>
      </section>
    )
  }

  return (
    <section className="space-y-6" id={id}>
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
        书籍 ({totalCount.toLocaleString()})
      </h2>

      {/* 读过 */}
      {data.collect.length > 0 && (
        <BookSection id="books-collect" title="读过" books={data.collect} />
      )}

      {/* 在读 */}
      {data.doings.length > 0 && <BookSection id="books-doings" title="在读" books={data.doings} />}

      {/* 想读 */}
      {data.wish.length > 0 && <BookSection id="books-wish" title="想读" books={data.wish} />}
    </section>
  )
}

interface BookSectionProps {
  id: string
  title: string
  books: DoubanItem[]
}

function BookSection({ id, title, books }: BookSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const initialDisplayCount = useAutoSize({ xs: 3, sm: 4 })
  const displayedBooks = showAll ? books : books.slice(0, initialDisplayCount)
  const hasMore = books.length > initialDisplayCount

  return (
    <div className="space-y-3" id={id}>
      <div className="flex items-center gap-2">
        <h3 className="text-text-secondary text-xs font-medium">{title}</h3>
        <span className="text-text-tertiary text-xs">({books.length})</span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4">
        {displayedBooks.map((book) => (
          <Link
            key={book.id}
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-3/4 overflow-hidden rounded-lg"
          >
            {/* 书籍封面 */}
            <Image
              src={book.cover}
              alt={book.title}
              width={240}
              height={320}
              className="h-full w-full object-cover transition-all! duration-300 group-hover:scale-110"
            />

            {/* 状态角标 */}
            <div
              className={`absolute top-1 right-1 rounded-full border border-white/20 bg-black/48 px-2 py-0.5 text-[10px] text-white backdrop-blur-[2px] sm:top-2 sm:right-2`}
            >
              {title}
            </div>

            {/* 渐变遮罩 */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

            {/* 书籍信息 */}
            <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-0.5 p-2 sm:gap-1.5">
              <h3 className="line-clamp-2 text-xs font-medium text-white sm:text-sm">
                {book.title}
              </h3>
              {book.date && (
                <p className="text-[10px] text-white/60 sm:text-xs">
                  {dayjs(book.date).format('标记于 YYYY-MM-DD')}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* 展示更多按钮 */}
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
                展示更多 ({books.length - initialDisplayCount})
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
