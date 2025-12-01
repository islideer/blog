'use client'

import Error from './error'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Error:', error)
  }, [error])

  return (
    <html lang="zh-CN">
      <body>
        <Error error={error} reset={reset} />
      </body>
    </html>
  )
}
