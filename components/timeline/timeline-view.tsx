import { dayjs } from '@/lib/dayjs'
import { YEAR_DESC_MAP } from '@/lib/year-desc'
import { MarkdownLite } from '../markdown-lite'

import type { TimelineItem } from '@/lib/data'

interface TimelineViewProps {
  items: TimelineItem[]
}

export async function TimelineView({ items }: TimelineViewProps) {
  // 按年份分组（使用现代化的 Object.groupBy）
  const timelineByYear = Object.groupBy(items, (item) => {
    const date = dayjs(item.date)
    return date.isValid() ? String(date.year()) : '0'
  })

  // 按年份降序排列（最新的年份在前）
  const sortedYears = Object.keys(timelineByYear)
    .map(Number)
    .toSorted((a, b) => b - a)

  return (
    <div className="space-y-12">
      {sortedYears.map((year, idx) => {
        const yearItems = timelineByYear[year] ?? []

        // 按日期降序排列（同一年内最新的在前）
        const sortedItems = yearItems.toSorted((a, b) => {
          const dateA = dayjs(a.date)
          const dateB = dayjs(b.date)
          return dateB.valueOf() - dateA.valueOf()
        })

        const startIdxOfAll = sortedYears
          .slice(0, idx)
          .reduce((sum, y) => sum + (timelineByYear[y]?.length ?? 0), 0)

        return (
          <div key={year} className="space-y-4">
            {/* 年份标题 */}
            <h2 className="text-text-primary text-xl font-bold sm:text-2xl" id={`year-${year}`}>
              <span>{year}</span>
              <span className="text-text-tertiary/60 mx-1">/</span>
              <span className="text-text-tertiary">{YEAR_DESC_MAP.get(year)}</span>
              <span className="text-text-tertiary mx-1 text-base font-normal sm:text-lg">
                ({yearItems.length.toLocaleString('zh-Hans-CN')})
              </span>
            </h2>

            {/* 时间轴内容 */}
            <div className="divide-text-tertiary/60 border-border-tertiary divide-y divide-dashed border-l-2 pl-2 sm:pl-4">
              {sortedItems.map((item, index) => {
                // 支持模糊时间格式
                const date = dayjs(item.date)
                let formattedDate = item.date

                if (date.isValid()) {
                  // 判断是否是完整日期（YYYY/MM/DD 或 YYYY-MM-DD）
                  const hasDay = /\d{4}[-/]\d{2}[-/]\d{2}/.test(item.date)
                  // 判断是否包含月份（YYYY/MM 或 YYYY-MM）
                  const hasMonth = /\d{4}[-/]\d{2}/.test(item.date)

                  if (hasDay) {
                    // 完整日期：显示 MM.DD
                    formattedDate = date.format('M 月 D 日')
                  } else if (hasMonth) {
                    // 只有年月：显示 MM 月
                    formattedDate = date.format('M 月')
                  } else {
                    // 只有年份：不显示（年份已在标题中）
                    formattedDate = ''
                  }
                }

                return (
                  <article
                    id={String(items.length - (startIdxOfAll + index))} // 反向 ID，最新的在前
                    key={index}
                    className="flex flex-col gap-1 px-1 py-3 sm:flex-row sm:items-baseline sm:gap-2 sm:px-2 sm:py-4"
                  >
                    {formattedDate && (
                      <time className="text-text-tertiary shrink-0 text-xs sm:w-12 sm:text-sm">
                        {formattedDate}
                      </time>
                    )}
                    <MarkdownLite
                      size="md"
                      className="text-text-secondary! text-xs leading-5 sm:text-sm sm:leading-6"
                      content={item.description}
                    />
                  </article>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
