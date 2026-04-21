import { formatDate, formatDateCN } from '@/lib/dayjs'

export interface PostDateProps {
  date: string
  format?: 'date' | 'full' | 'month-day' | 'detail'
  className?: string
}

export function PostDate({ date, format = 'date', className = '' }: PostDateProps) {
  const formatted = format === 'detail' ? formatDateCN(date) : formatDate(date, format)

  return (
    <time dateTime={date} className={className}>
      {formatted}
    </time>
  )
}
