import { ThoughtCard, ThoughtItem } from '@/components/thoughts/thought-card'

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
}

/**
 * 碎碎念/Mio 说列表组件（服务端组件）
 * 服务端全量渲染确保 SEO 友好和锚点链接可用
 * 使用 CSS content-visibility 优化渲染性能
 */
export async function ThoughtsList({
  thoughts,
  counts,
  mioTheme = false,
  contentPrefix = '碎碎念',
  emptyMessage = '还没有内容，快来记录吧',
}: ThoughtsListProps) {
  if (thoughts.length === 0) {
    return <p className="text-text-tertiary text-sm italic opacity-60">{emptyMessage}</p>
  }

  return (
    <div className="space-y-8">
      {thoughts.map((thought, index) => (
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
    </div>
  )
}
