import Link from 'next/link'
import { cn } from '@/lib/cn'
import { dayjs } from '@/lib/dayjs'
import { Noto_Serif_SC } from 'next/font/google'
import { getTodayReading, generateMonthDates, formatDate, getLunarInfo } from '@/lib/reading'

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

  // 获取农历信息
  const readingDate = new Date(reading.date)
  const lunar = getLunarInfo(readingDate)
  const day = dayjs(reading.date).format('D')
  const yearMonth = dayjs(reading.date).format('YYYY 年 M 月')

  return (
    <div className={cn(`mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8`, notoSerifSC.className)}>
      {/* 今日阅读卡片 */}
      <section className="mb-16">
        {/* 正文预览 */}
        <Link
          href={`/reading/${todayDateStr}`}
          className="border-border bg-bg-secondary group hover:border-text/20 block rounded-2xl border p-8 no-underline sm:p-12"
        >
          <div className="flex items-start gap-8">
            {/* 左侧：日期和内容 */}
            <div className="flex-1">
              {/* 日期展示 - 参考详情页但更紧凑 */}
              <div className="mb-6 flex items-end gap-4">
                {/* 大数字 */}
                <div className="text-5xl leading-none font-bold tracking-widest sm:text-6xl">
                  {day}
                </div>

                {/* 右侧：阳历和农历 */}
                <div className="mb-1 flex flex-col space-y-1">
                  {/* 农历 */}
                  <div className="text-xs opacity-50">
                    农历 {lunar.month}月{lunar.day}
                  </div>

                  {/* 节日 */}
                  {lunar.festival && (
                    <div className="text-xs font-medium text-red-600/80">{lunar.festival}</div>
                  )}

                  {/* 阳历 */}
                  <div className="text-base opacity-75 sm:text-lg">{yearMonth}</div>
                </div>
              </div>

              {/* 内容预览 */}
              <div className="line-clamp-3 text-lg leading-relaxed opacity-90">
                {reading.content}
              </div>

              {/* 作品信息 - 低调展示 */}
              <div className="border-border mt-8 flex items-center justify-between border-t pt-6">
                <div className="flex gap-6 text-sm opacity-60">
                  <span>{reading.like_count} 喜欢</span>
                  <span>{reading.comment_count} 评论</span>
                </div>
                <span className="decoration-text-tertiary group-hover:decoration-text-primary text-sm font-medium underline decoration-dashed underline-offset-4 opacity-75 group-hover:decoration-solid">
                  阅读全文 →
                </span>
              </div>
            </div>

            {/* 右侧：竖向 tip - 与整体垂直居中 */}
            <div className="hidden sm:flex">
              <div className="text-lg font-medium tracking-widest [writing-mode:vertical-rl]">
                {reading.tip}
              </div>
            </div>
          </div>

          {/* 移动端 tip 显示 */}
          <div className="mt-4 text-center text-sm opacity-50 sm:hidden">{reading.tip}</div>
        </Link>
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
                  'flex h-12 items-center justify-center rounded-lg text-sm font-medium no-underline sm:h-14 sm:text-base',
                  isToday && 'bg-bg-quaternary text-text-primary font-bold',
                  !isToday && isPast && 'hover:bg-bg-tertiary opacity-50 hover:opacity-100',
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
