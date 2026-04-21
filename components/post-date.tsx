import { dayjs } from '@/lib/dayjs'

export interface PostDateProps {
  date: string
  format?: 'short' | 'full' | 'month-day' | 'detail'
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
      case 'detail': {
        return dayjs(date).year() === dayjs().year()
          ? dayjs(date).format('M 月 D 日')
          : dayjs(date).format('YYYY 年 M 月 D 日')
      }
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
