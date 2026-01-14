'use client'

import Link from 'next/link'
import Image from 'next/image'
import { dayjs } from '@/lib/dayjs'
import { useState } from 'react'

import type { DoubanItem, DoubanResponse } from '@/lib/douban'

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

      {/* 在读 */}
      {data.doings.length > 0 && (
        <BookSection id="books-doings" title="在读" books={data.doings} badgeColor="bg-blue-500" />
      )}

      {/* 想读 */}
      {data.wish.length > 0 && (
        <BookSection id="books-wish" title="想读" books={data.wish} badgeColor="bg-yellow-500" />
      )}

      {/* 读过 */}
      {data.collect.length > 0 && (
        <BookSection
          id="books-collect"
          title="读过"
          books={data.collect}
          badgeColor="bg-green-500"
        />
      )}
    </section>
  )
}

interface BookSectionProps {
  id: string
  title: string
  books: DoubanItem[]
  badgeColor: string
}

function BookSection({ id, title, books, badgeColor }: BookSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const initialDisplayCount = 8 // 默认显示 8 个（约 2 排）
  const displayedBooks = showAll ? books : books.slice(0, initialDisplayCount)
  const hasMore = books.length > initialDisplayCount

  return (
    <div className="space-y-3" id={id}>
      <div className="flex items-center gap-2">
        <h3 className="text-text-secondary text-xs font-medium">{title}</h3>
        <span className="text-text-tertiary text-xs">({books.length})</span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {displayedBooks.map((book) => (
          <div
            key={book.id}
            className="border-border group flex flex-col overflow-hidden rounded-lg border sm:hover:border-neutral-400 dark:sm:hover:border-neutral-600"
          >
            {/* 书籍封面 */}
            <div className="bg-bg-secondary relative aspect-3/4 w-full overflow-hidden">
              <Image
                src={book.cover}
                alt={book.title}
                width={240}
                height={320}
                data-zoomable
                className="h-full w-full object-cover transition-all duration-300 sm:group-hover:scale-105"
              />
              {/* 状态角标 */}
              <div
                className={`absolute top-2 right-2 ${badgeColor} rounded px-1 py-0.5 text-xs font-medium text-white`}
              >
                {title}
              </div>
            </div>

            {/* 书籍信息 */}
            <div className="flex flex-col gap-2 p-3">
              <Link
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary text-text-secondary truncate text-sm font-medium text-nowrap"
              >
                {book.title}
              </Link>

              {book.date && (
                <p className="text-text-tertiary text-xs">
                  {dayjs(book.date).format('YYYY 年 M 月 D 日标记')}
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
            {showAll ? '收起' : `展示更多 (${books.length - initialDisplayCount})`}
          </button>
        </div>
      )}
    </div>
  )
}
