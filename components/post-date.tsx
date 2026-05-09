import { formatDate, formatDateCN, type DatePreset } from '@/lib/dayjs'

export interface PostDateProps {
  date: string
  format?: DatePreset | 'detail'
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
