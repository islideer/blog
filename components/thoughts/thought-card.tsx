import { cn } from '@/lib/cn'
import { LazyImage } from '../lazy-image'
import { MarkdownLite } from '../markdown-lite'
import { RelativeTime } from '../relative-time'
import { InteractionButton } from '../interaction-button'

export interface ThoughtItem {
  id: string
  date: string
  content?: string
  images?: string[]
}

interface ThoughtCardProps {
  thought: ThoughtItem
  initialCount?: number
  index: number
  total: number
  /** 是否使用 Mio 粉色主题 */
  mioTheme?: boolean
  /** 内容描述前缀（用于图片 alt） */
  contentPrefix?: string
}

/**
 * 碎碎念/Mio 说卡片组件（服务端组件）
 * 使用 CSS content-visibility 优化渲染性能
 * 服务端全量渲染确保 SEO 友好和锚点链接可用
 */
export async function ThoughtCard({
  thought,
  initialCount,
  index,
  total,
  mioTheme = false,
  contentPrefix = '碎碎念',
}: ThoughtCardProps) {
  // 前 3 条内容的第一张图片优先加载
  const shouldPriority = index < 3

  return (
    <article
      id={thought.id}
      className="thought-card space-y-2 pb-4 sm:pb-6"
      style={{
        // CSS content-visibility 优化：视口外的内容跳过渲染
        // 保持 DOM 结构完整（SEO + 锚点），但跳过布局和绘制
        contentVisibility: index > 5 ? 'auto' : 'visible',
        containIntrinsicSize: index > 5 ? 'auto 250px' : undefined,
        borderBottom:
          index < total - 1
            ? mioTheme
              ? '1px solid var(--color-mio-border)'
              : '1px solid rgba(128, 128, 128, 0.1)'
            : 'none',
      }}
    >
      {/* 序号和日期时间 */}
      <div className="flex items-center gap-2 text-xs">
        <a
          href={`#${thought.id}`}
          className="cursor-pointer font-mono font-semibold no-underline hover:underline"
          style={mioTheme ? { color: 'var(--color-mio-pink)' } : undefined}
        >
          #{thought.id}
        </a>
        <span className="text-text-secondary">·</span>
        <RelativeTime date={thought.date} className="text-text-secondary" />
        <span className="text-text-secondary">·</span>
        <InteractionButton
          id={thought.id}
          type={mioTheme ? 'mio-says' : 'thoughts'}
          initialCount={initialCount}
          revalidatePagePath={`/${mioTheme ? 'mio-says' : 'thoughts'}`}
        />
      </div>

      {/* 文本内容 */}
      {thought.content && thought.content.trim() !== '' && (
        <MarkdownLite content={thought.content} />
      )}

      {/* 图片 */}
      {thought.images && thought.images.length > 0 && (
        <div
          className={cn(
            'grid grid-cols-1 gap-2 pt-1',
            thought.images.length > 1 ? 'sm:grid-cols-2' : 'sm:max-w-md',
          )}
        >
          {thought.images.map((image, imageIndex) => {
            const isFirstImage = imageIndex === 0

            return (
              <div
                key={imageIndex}
                className="border-border flex w-full items-center justify-center overflow-hidden rounded-md border"
                style={{ backgroundColor: 'var(--color-image-bg)' }}
              >
                <LazyImage
                  src={image}
                  alt={
                    thought.content && thought.content.trim() !== ''
                      ? `${thought.content.slice(0, 20)}... 的图片 ${imageIndex + 1}`
                      : `${contentPrefix}图片 ${imageIndex + 1}`
                  }
                  width={800}
                  height={450}
                  className="w-full"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  preload={shouldPriority && isFirstImage}
                />
              </div>
            )
          })}
        </div>
      )}
    </article>
  )
}
