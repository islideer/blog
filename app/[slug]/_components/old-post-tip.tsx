import { cn } from '@/lib/cn'
import { dayjs } from '@/lib/dayjs'

interface OldPostBannerProps {
  date: string
  className?: string
  separator?: boolean
  short?: boolean
}

export function OldPostTip({
  date,
  className,
  short = false,
  separator = true,
}: OldPostBannerProps) {
  const publishDate = dayjs(date)
  const now = dayjs()
  const yearsAgo = now.diff(publishDate, 'year')
  const daysAgo = now.diff(publishDate, 'day')

  // 只在文章发布超过 1 年时显示
  if (yearsAgo <= 1) {
    return null
  }

  return (
    <>
      {separator && <span className="shrink-0">·</span>}
      <span className={cn('text-text-tertiary shrink-0', className)}>
        {short ? '请注意时效性' : `已发布 ${daysAgo.toLocaleString('zh-Hans-CN')} 天，请注意时效性`}
      </span>
    </>
  )
}
