import Link from 'next/link'
import { TextIcon } from '@/components/text-icon'
import { ImageIcon } from '@/components/image-icon'
import { RelativeTime } from '@/components/relative-time'
import { cleanMarkdownContent } from '@/lib/markdown'
import { pages, type ShortPost } from '@/lib/data'

interface RecentActivitiesProps {
  title?: string
  shortPosts: ShortPost[]
  totalCount: number
  showMoreThreshold: number
}

/**
 * 最近动态组件（服务端组件）
 * 展示最新的碎碎念，随性卡片式风格
 */
export async function RecentActivities({
  title,
  shortPosts,
  totalCount,
  showMoreThreshold,
}: RecentActivitiesProps) {
  if (shortPosts.length === 0) {
    return null
  }

  const isMioSay = title?.includes('mio') || title?.includes('Mio')

  return (
    <section className="space-y-4 sm:space-y-6">
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="space-y-4">
        <div className="divide-border space-y-4">
          {shortPosts.map((thought) => {
            const hasImages = thought.images && thought.images.length > 0

            return (
              <article key={thought.id} className="relative space-y-1 truncate">
                {/* 头部信息 */}
                <div className="flex items-center gap-1.5">
                  <Link
                    href={
                      isMioSay
                        ? `${pages.mioSays.slug}/${thought.id}`
                        : `${pages.thoughts.slug}/${thought.id}`
                    }
                    className="link font-mono text-sm"
                  >
                    #{thought.id}
                  </Link>
                  <span className="text-text-secondary">·</span>
                  <RelativeTime date={thought.date} className="text-text-secondary text-sm" />
                </div>

                {/* 内容预览 */}
                {thought.content && thought.content.trim() !== '' && (
                  <div className="flex items-center gap-2 truncate">
                    {hasImages ? <ImageIcon /> : <TextIcon />}
                    <p className="truncate text-sm leading-relaxed">
                      {cleanMarkdownContent(thought.content)}
                    </p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
        {/* 查看全部链接 */}
        {totalCount > showMoreThreshold && (
          <Link href={isMioSay ? pages.mioSays.slug : pages.thoughts.slug} className="link">
            探索更多（{totalCount}）
          </Link>
        )}
      </div>
    </section>
  )
}
