import { dayjs } from '@/lib/dayjs'

interface PostDateProps {
  date: string
  format?: 'short' | 'full' | 'month-day'
  className?: string
}

/**
 * 文章日期组件
 * - short: 智能格式（当年显示 M.D，其他年份显示 YYYY.M.D）
 * - full: 完整格式（YYYY.MM.DD）
 * - month-day: 月日格式（MM.DD）
 */
export function PostDate({ date, format = 'short', className = '' }: PostDateProps) {
  const formatDate = () => {
    switch (format) {
      case 'short':
        return dayjs(date).year() === dayjs().year()
          ? dayjs(date).format('M.D')
          : dayjs(date).format('YYYY.M.D')
      case 'full':
        return dayjs(date).format('YYYY.MM.DD')
      case 'month-day':
        return dayjs(date).format('MM.DD')
      default:
        return dayjs(date).format('YYYY.M.D')
    }
  }

  return (
    <time dateTime={date} className={className}>
      {formatDate()}
    </time>
  )
}
