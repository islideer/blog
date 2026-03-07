'use client'

import { useEffect } from 'react'

export const dynamic = 'force-static'
export const revalidate = 31536000 // 缓存 1 年

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
      <p className="text-text-secondary mb-4 text-sm sm:text-base">页面加载时遇到了一些问题</p>
      <p className="text-text-tertiary mb-8 text-xs sm:text-sm">{error.message || '未知错误'}</p>

      {/* 操作按钮 */}
      <div className="flex flex-col items-center gap-3 text-xs sm:gap-4 sm:text-sm">
        <button
          onClick={reset}
          className="group text-text-secondary sm:hover:bg-bg-secondary sm:hover:text-text-primary active:bg-bg-secondary active:text-text-primary rounded-md px-2.5 py-1.5 transition-colors"
        >
          <span className="transition-transform group-active:scale-90">重新加载</span>
        </button>
      </div>
    </div>
  )
}
