'use client'

import { cn } from '@/lib/cn'
import { Tooltip } from './tooltip'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RefreshIcon } from '../icons/refresh'

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
        <RefreshIcon className={cn('h-3.5 w-3.5', refreshing && 'animate-spin')} />
        刷新状态
      </button>
    </Tooltip>
  )
}
