'use client'

import { useEffect } from 'react'
import Link from 'next/link'

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
        <div className="flex min-h-screen flex-col items-center justify-center bg-white text-center dark:bg-gray-950">
          {/* 500 数字 */}
          <div className="relative mb-6">
            <div className="text-[100px] leading-none font-black text-gray-200 opacity-50 sm:text-[140px] dark:text-gray-800">
              500
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-nowrap text-gray-900 sm:text-4xl dark:text-gray-100">
              系统错误
            </div>
          </div>

          {/* 描述文本 */}
          <p className="mb-2 text-sm text-gray-600 sm:text-base dark:text-gray-400">
            应用程序遇到了严重错误
          </p>
          <p className="mb-8 text-xs text-gray-400 sm:text-sm dark:text-gray-600">
            {error.message || '未知错误'}
          </p>

          {/* 操作按钮 */}
          <div className="flex items-center gap-2 text-sm sm:gap-4">
            <button
              onClick={reset}
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              重试
            </button>
            <span className="text-gray-400 dark:text-gray-600">·</span>
            <Link
              href="/"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              回到首页
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
