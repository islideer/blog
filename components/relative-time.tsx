'use client'

import { dayjs } from '@/lib/dayjs'
import { useSyncExternalStore } from 'react'

interface RelativeTimeProps {
  date: string
  className?: string
  style?: React.CSSProperties
}

function subscribe() {
  return () => {}
}

function getSnapshot() {
  return true
}

function getServerSnapshot() {
  return false
}

// 检测是否在客户端
function useIsClient() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * 客户端时间显示组件
 * 服务端渲染绝对时间，客户端挂载后切换为相对时间
 * 解决 SSR 缓存导致的时间显示问题
 */
export function RelativeTime({ date, className, style }: RelativeTimeProps) {
  const isClient = useIsClient()
  const dateObj = dayjs(date).tz('Asia/Shanghai')
  const isSameYear = dayjs().isSame(dateObj, 'year')
  const formatted = dateObj.format(isSameYear ? 'MM-DD HH:mm ddd' : 'YYYY-MM-DD HH:mm ddd')
  const fullFormatted = dateObj.format('YYYY-MM-DD HH:mm:ss ddd')
  const isOldPost = dayjs().diff(dateObj, 'year') >= 1

  // 显示相对时间（客户端 + 非旧文章）或绝对时间（服务端 + 旧文章）
  const displayText = isClient && !isOldPost ? dateObj.fromNow() : formatted

  return (
    <time className={className} dateTime={date} style={style} title={fullFormatted}>
      发布于 {displayText} ({formatted})
    </time>
  )
}
