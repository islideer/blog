'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      {/* 500 数字 */}
      <div className="relative mb-6">
        <div className="text-text-tertiary text-[100px] leading-none font-black opacity-24 sm:text-[140px] dark:opacity-36">
          500
        </div>
        <h1 className="text-text-primary absolute inset-0 flex items-center justify-center text-3xl font-bold text-nowrap sm:text-4xl">
          出错了
        </h1>
      </div>

      {/* 描述文本 */}
      <p className="text-text-secondary mb-2 text-sm sm:text-base">页面加载时遇到了一些问题</p>
      <p className="text-text-tertiary mb-8 text-xs sm:text-sm">{error.message || '未知错误'}</p>

      {/* 操作按钮 */}
      <div className="flex items-center gap-2 text-sm sm:gap-4">
        <button
          onClick={reset}
          className="rounded-sm bg-zinc-200/40 px-3 py-1 text-zinc-900 hover:bg-zinc-200/80 dark:bg-zinc-800/60 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          重试
        </button>
        <span className="text-text-tertiary">·</span>
        <Link href="/" className="text-text-secondary hover:text-text-primary">
          回到首页 ➜
        </Link>
      </div>
    </div>
  )
}
