'use client'

import { dayjs, formatDate, TZ_SHANGHAI } from '@/lib/dayjs'
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

function useIsClient() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function RelativeTime({ date, className, style, short }: RelativeTimeProps) {
  const isClient = useIsClient()
  const dateObj = dayjs(date).tz(TZ_SHANGHAI)
  const fullFormatted = formatDate(date, 'full-time')

  const now = useNow({ interval: 1000 })

  const formatted = formatDate(date, 'date-time')
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
