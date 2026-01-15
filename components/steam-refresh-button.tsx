'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tooltip } from './tooltip'

/**
 * Steam 刷新按钮（客户端组件）
 * - 使用 router.refresh() 重新获取服务端数据
 */
export function SteamRefreshButton() {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    if (refreshing) return

    setRefreshing(true)
    try {
      // 刷新服务端组件数据（触发重新渲染）
      router.refresh()

      // 等待一段时间后恢复按钮状态
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <Tooltip content="刷新 Steam 状态信息">
      <button
        onClick={handleRefresh}
        disabled={refreshing}
        className="text-text-secondary sm:hover:bg-bg-secondary sm:hover:text-text-primary active:bg-bg-secondary active:text-text-primary inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="刷新 Steam 信息"
      >
        <RefreshIcon className={refreshing ? 'animate-spin' : ''} />
        刷新状态
      </button>
    </Tooltip>
  )
}

function RefreshIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`h-3.5 w-3.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  )
}
