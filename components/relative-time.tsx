'use client'

import { dayjs } from '@/lib/dayjs'
// import { useSyncExternalStore } from 'react'

interface RelativeTimeProps {
  date: string
  className?: string
  style?: React.CSSProperties
}

// function subscribe() {
//   return () => {}
// }

// function getSnapshot() {
//   return true
// }

// function getServerSnapshot() {
//   return false
// }

// // 检测是否在客户端
// function useIsClient() {
//   return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
// }

/**
 * 客户端时间显示组件
 * 服务端渲染绝对时间，客户端挂载后切换为相对时间
 * 解决 SSR 缓存导致的时间显示问题
 */
export function RelativeTime({ date, className, style }: RelativeTimeProps) {
  const dateObj = dayjs(date).tz('Asia/Shanghai')
  const isSameYear = dayjs().isSame(dateObj, 'year')
  const fullFormatted = dateObj.format('YYYY-MM-DD HH:mm ddd')
  const formatted = isSameYear ? dateObj.format('MM-DD HH:mm ddd') : fullFormatted
  const isOldPost = dayjs().diff(dateObj, 'year') >= 1

  const fromNow = dateObj.fromNow()
  const fromNowStr = fromNow.match(/^\d+/) ? ` ${fromNow}` : fromNow

  const displayContent = isOldPost ? (
    formatted
  ) : (
    <span className="inline-flex items-center gap-2" suppressHydrationWarning>
      发布于{fromNowStr}
      <span>·</span>
      {formatted}
    </span>
  )

  return (
    <time className={className} dateTime={date} style={style} title={fullFormatted}>
      {displayContent}
    </time>
  )
}
