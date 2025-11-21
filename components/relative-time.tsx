'use client'

import { useSyncExternalStore } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

interface RelativeTimeProps {
  date: string
  className?: string
  style?: React.CSSProperties
}

// 检测是否在客户端
function subscribe() {
  return () => {}
}

function getSnapshot() {
  return true
}

function getServerSnapshot() {
  return false
}

/**
 * 客户端时间显示组件
 * 服务端渲染绝对时间，客户端挂载后切换为相对时间
 * 解决 SSR 缓存导致的时间显示问题
 */
export function RelativeTime({ date, className, style }: RelativeTimeProps) {
  const isClient = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const dateObj = dayjs(date)
  const isOldPost = dayjs().diff(dateObj, 'year') >= 1

  // 显示相对时间（客户端 + 非旧文章）或绝对时间（服务端 + 旧文章）
  const displayText =
    isClient && !isOldPost ? dateObj.fromNow() : dateObj.format('YYYY/MM/DD HH:mm:ss ddd')

  return (
    <time
      className={className}
      style={style}
      dateTime={date}
      title={dateObj.format('YYYY/MM/DD HH:mm:ss ddd')}
    >
      发布于 {displayText}
    </time>
  )
}
