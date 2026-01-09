import Link from 'next/link'
import { ImageIcon } from './image-icon'
import { RelativeTime } from './relative-time'
import type { Thought } from '@/lib/data'

interface RecentActivitiesProps {
  thoughts: Thought[]
  totalCount: number
  showMoreThreshold: number
}

/**
 * 截断文本内容
 * @param content Markdown 内容
 * @param maxLength 最大长度（字符数）
 */
function truncateContent(content: string, maxLength: number = 80): string {
  // 移除 Markdown 语法（简单处理）
  const plainText = content
    .replace(/[#*_`~]/g, '') // 移除常见的 Markdown 标记
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // 移除链接，保留文本
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // 移除图片
    .replace(/\n/g, ' ') // 换行符替换为空格
    .trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  // 截断并添加省略号
  return plainText.slice(0, maxLength) + '...'
}

/**
 * 最近动态组件（服务端组件）
 * 展示最新的碎碎念，随性卡片式风格
 */
export async function RecentActivities({
  thoughts,
  totalCount,
  showMoreThreshold,
}: RecentActivitiesProps) {
  if (thoughts.length === 0) {
    return null
  }

  return (
    <section className="space-y-3">
      <h2 className="text-text-secondary text-lg font-semibold">最近动态</h2>

      {/* 使用网格布局，响应式 */}
      <div className="grid gap-2 sm:grid-cols-1 sm:gap-2.5">
        {thoughts.map((thought) => {
          const hasImages = thought.images && thought.images.length > 0

          return (
            <article
              key={thought.id}
              className="relative space-y-1.5 border-l-2 border-zinc-300 bg-transparent py-1 pl-3 pr-1 dark:border-zinc-700"
            >
              {/* 头部信息 */}
              <div className="flex items-center gap-1.5">
                <span className="text-text-tertiary font-mono text-[11px] font-medium">
                  #{thought.id}
                </span>
                <span className="text-text-tertiary">·</span>
                <RelativeTime date={thought.date} className="text-text-tertiary text-[11px]" />
              </div>

              {/* 内容预览 */}
              {thought.content && thought.content.trim() !== '' && (
                <div className="flex items-center gap-2">
                  {hasImages && <ImageIcon />}
                  <p className="text-text-secondary line-clamp-1 text-xs leading-relaxed">
                    {truncateContent(thought.content, 60)}
                  </p>
                </div>
              )}
            </article>
          )
        })}
      </div>

      {/* 查看全部链接 */}
      {totalCount > showMoreThreshold && (
        <div className="pt-1">
          <Link
            href="/thoughts"
            className="text-text-tertiary hover:text-text-secondary text-[11px] transition-colors"
          >
            查看全部 ({totalCount.toLocaleString('zh-Hans-CN')}) →
          </Link>
        </div>
      )}
    </section>
  )
}
