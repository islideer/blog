import Link from 'next/link'
import { cn } from '@/lib/cn'
import { dayjs } from '@/lib/dayjs'
import { Noto_Serif_SC } from 'next/font/google'
import { getTodayReading, generateMonthDates, formatDate } from '@/lib/reading'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '每日阅读',
  description: '每天一篇文学作品，与文字相遇',
}

const notoSerifSC = Noto_Serif_SC({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

function getChineseYearMonth(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  const chineseYears = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const chineseMonths = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']

  return `${String(year)
    .split('')
    .map((digit) => chineseYears[Number(digit)])
    .join('')}年 ${chineseMonths[month - 1]}月`
}

export default async function ReadingPage() {
  const reading = await getTodayReading()

  // 生成当月日历
  const today = new Date()
  const monthDates = generateMonthDates(today.getFullYear(), today.getMonth() + 1)
  const todayDateStr = formatDate(today)

  // 计算今天是本月第几天（用于高亮）
  const todayDay = today.getDate()

  return (
    <div className={cn(`mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8`, notoSerifSC.className)}>
      {/* 今日阅读卡片 */}
      <section className="mb-16">
        {/* 正文预览 */}
        <div className="border-border bg-bg-secondary block rounded-2xl border p-8 transition-all sm:p-12">
          {/* 提示语和日期 - 重点展示 */}

          <Link
            href={`/reading/${todayDateStr}`}
            className="mb-6 block text-2xl font-medium tracking-wide uppercase no-underline sm:text-3xl"
          >
            {dayjs(reading.date).format('YYYY 年 M 月 D 日')} / {reading.tip}
          </Link>

          <Link
            href={`/reading/${todayDateStr}`}
            className="line-clamp-3 text-lg leading-relaxed no-underline opacity-90"
          >
            {reading.content}
          </Link>

          {/* 作品信息 - 低调展示 */}
          <div className="border-border mt-8 flex items-center justify-between border-t pt-6">
            <div className="flex gap-6 text-sm opacity-60">
              <span>{reading.like_count} 喜欢</span>
              <span>{reading.comment_count} 评论</span>
            </div>
            <Link href={`/reading/${todayDateStr}`} className="text-sm font-medium opacity-75">
              阅读全文 →
            </Link>
          </div>
        </div>
      </section>

      {/* 本月日历 */}
      <section>
        <h2 className="mb-6 text-center text-xl font-medium opacity-75">
          {getChineseYearMonth(today)}
        </h2>

        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {/* 星期标题 */}
          {['日', '一', '二', '三', '四', '五', '六'].map((day, i) => (
            <div key={i} className="flex h-8 items-center justify-center font-medium opacity-50">
              {day}
            </div>
          ))}

          {/* 占位（月初空白） */}
          {Array.from({ length: monthDates[0].getDay() }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* 日期格子 */}
          {monthDates.map((date) => {
            const dateStr = formatDate(date)
            const day = date.getDate()
            const isToday = day === todayDay
            const isPast = date < today && !isToday

            if (!isToday && !isPast) {
              // 未来日期不可点击
              return (
                <div
                  key={dateStr}
                  className="flex h-12 items-center justify-center rounded-lg font-medium opacity-30 sm:h-14"
                  aria-label={`${day} 日`}
                >
                  {day}
                </div>
              )
            }

            return (
              <Link
                key={dateStr}
                href={`/reading/${dateStr}`}
                className={cn(
                  'flex h-12 items-center justify-center rounded-lg text-sm font-medium transition-all sm:h-14 sm:text-base',
                  isToday && 'bg-(--color-text) font-bold text-(--color-bg)',
                  !isToday && isPast && 'opacity-50 hover:opacity-100',
                  !isToday && !isPast && 'opacity-30',
                )}
                aria-label={isToday ? `今天 ${day} 日` : `${day} 日`}
              >
                {day}
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
