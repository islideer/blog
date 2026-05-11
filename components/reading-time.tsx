interface ReadingTimeProps {
  minutes: number
  className?: string
  lang?: 'zh' | 'en'
}

export function ReadingTime({ minutes, className = '', lang = 'zh' }: ReadingTimeProps) {
  return (
    <span className={className}>
      {minutes.toLocaleString(lang === 'zh' ? 'zh-Hans-CN' : 'en-US')}{' '}
      {lang === 'zh' ? '分钟' : 'min'}
    </span>
  )
}
