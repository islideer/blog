interface ReadingTimeProps {
  minutes: number
  className?: string
}

export function ReadingTime({ minutes, className = '' }: ReadingTimeProps) {
  return <span className={className}>{minutes.toLocaleString('zh-CN')} 分钟</span>
}
