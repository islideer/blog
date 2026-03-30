'use client'

import { useState } from 'react'
import { ThoughtCard, ThoughtItem } from '@/components/thoughts/thought-card'
import { ChevronDownIcon } from '@/icons/chevron-down'

interface ThoughtsListProps {
  thoughts: ThoughtItem[]
  /** 互动计数数据（ID 到计数的映射） */
  counts: Record<string, number>
  /** 是否使用 Mio 粉色主题 */
  mioTheme?: boolean
  /** 内容描述前缀（用于图片 alt） */
  contentPrefix?: string
  /** 空状态提示 */
  emptyMessage?: string
  /** 初始及每次加载的条数，默认 20 */
  pageSize?: number
}

/**
 * 碎碎念/Mio 说列表组件（客户端组件）
 * 分页加载：每次展示 pageSize 条，点击「加载更多」追加下一批
 */
export function ThoughtsList({
  thoughts,
  counts,
  mioTheme = false,
  contentPrefix = '碎碎念',
  emptyMessage = '还没有内容，快来记录吧',
  pageSize = 20,
}: ThoughtsListProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize)

  if (thoughts.length === 0) {
    return <p className="text-text-tertiary text-sm italic opacity-60">{emptyMessage}</p>
  }

  const visibleThoughts = thoughts.slice(0, visibleCount)
  const hasMore = visibleCount < thoughts.length

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + pageSize, thoughts.length))
  }

  return (
    <div className="space-y-8">
      {visibleThoughts.map((thought, index) => (
        <ThoughtCard
          key={thought.id}
          thought={thought}
          initialCount={counts[thought.id]}
          index={index}
          total={thoughts.length}
          mioTheme={mioTheme}
          contentPrefix={contentPrefix}
        />
      ))}

      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={loadMore}
            className="group/btn text-text-secondary sm:hover:bg-bg-secondary sm:hover:text-text-primary active:bg-bg-secondary active:text-text-primary inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs transition-colors"
          >
            <span className="inline-flex items-center gap-1.5">
              <ChevronDownIcon className="h-3.5 w-3.5 transition-transform group-active/btn:translate-y-0.5" />
              加载更多（还剩 {thoughts.length - visibleCount} 条）
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
