import dayjs from 'dayjs'

interface OldPostBannerProps {
  date: string
}

export function OldPostBanner({ date }: OldPostBannerProps) {
  const publishDate = dayjs(date)
  const now = dayjs()
  const yearsAgo = now.diff(publishDate, 'year')
  const daysAgo = now.diff(publishDate, 'day')

  // 只在文章发布超过 1 年时显示
  if (yearsAgo < 1) {
    return null
  }

  return (
    <>
      <span className="shrink-0">·</span>
      <span className="text-text-tertiary shrink-0">
        已发布 {daysAgo.toLocaleString('zh-CN')} 天，请注意时效性
      </span>
    </>
  )
}
