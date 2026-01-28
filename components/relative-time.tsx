'use client'

import { dayjs } from '@/lib/dayjs'
import { useNow } from '@shined/react-use'
import { useSyncExternalStore } from 'react'

interface RelativeTimeProps {
  date: string
  className?: string
  style?: React.CSSProperties
  short?: boolean
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
export function RelativeTime({ date, className, style, short }: RelativeTimeProps) {
  const isClient = useIsClient()
  const dateObj = dayjs(date).tz('Asia/Shanghai')
  const fullFormatted = dateObj.format('YYYY-MM-DD HH:mm ddd')

  const now = useNow({ interval: 1000 })

  const isSameYear = dayjs(now).isSame(dateObj, 'year')
  const formatted = isSameYear ? dateObj.format('MM-DD HH:mm ddd') : fullFormatted
  const isOldPost = dayjs(now).diff(dateObj, 'year') >= 1
  const fromNow = dateObj.from(now)
  const fromNowStr = fromNow.match(/^\d/) ? ` ${fromNow}` : fromNow

  return (
    <time className={className} dateTime={date} style={style} title={fullFormatted}>
      <span className="inline-flex items-center gap-2" suppressHydrationWarning>
        {isClient && !isOldPost ? (
          short ? (
            fromNowStr
          ) : (
            <>
              {`发布于${fromNowStr}`}
              <span>·</span>
              {formatted}
            </>
          )
        ) : short ? (
          formatted
        ) : (
          `发布于 ${formatted}`
        )}
      </span>
    </time>
  )
}
