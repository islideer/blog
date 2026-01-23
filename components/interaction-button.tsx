'use client'

import { cn } from '@/lib/cn'
import CountUp from 'react-countup'
import { toast } from 'sonner'
import { Tooltip } from './tooltip'
import { HeartIcon } from '../icons/heart'
import { FlowerIcon } from '../icons/flower'
import { CheersIcon } from '../icons/cheers'
import { usePrevious } from '@shined/react-use'
import { HeartFilledIcon } from '@/icons/heart-filled'
import { useInteractions } from './interactions-provider'
import { useState, useTransition, useEffect, useRef } from 'react'
import { getInteractionConfig, getUserClickCount, recordUserClick } from '@/lib/interactions'

// 图标映射表（易于扩展）
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  cheers: CheersIcon,
  flower: FlowerIcon,
  heart: HeartIcon,
}

// 填充图标映射表（备用）
const FILLED_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  cheers: CheersIcon,
  flower: FlowerIcon,
  heart: HeartFilledIcon,
}

interface InteractionButtonProps {
  id: string
  type: string // 完全开放，不限制类型
  className?: string
  iconClassName?: string
}

export function InteractionButton({ id, type, className, iconClassName }: InteractionButtonProps) {
  const { counts } = useInteractions()
  const [localCount, setLocalCount] = useState<number | null>(null)
  const [userClickCount, setUserClickCount] = useState(0)
  const [isPending, startTransition] = useTransition()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pendingClicksRef = useRef(0)
  const submitTimerRef = useRef<NodeJS.Timeout | null>(null)

  const prevLocalCount = usePrevious(localCount) || localCount || 0

  // 从配置系统获取类型配置
  const config = getInteractionConfig(type)

  // 从 localStorage 加载用户点击状态
  useEffect(() => {
    const count = getUserClickCount(type, id)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserClickCount(count)
  }, [type, id])

  // 清理定时器
  useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        clearTimeout(submitTimerRef.current)
      }
    }
  }, [])

  // 如果类型未启用或配置不存在，不渲染按钮
  if (!config) return null

  const maxClicks = config.maxClicksPerDay ?? 1

  const displayCount = localCount ?? counts[id] ?? 0
  const remainingClicks = Math.max(0, maxClicks - userClickCount)
  const canClick = remainingClicks > 0
  const isMaxedOut = userClickCount >= maxClicks

  // 批量提交点击
  const submitBatch = async (clickCount: number) => {
    setIsSubmitting(true)
    pendingClicksRef.current = 0

    try {
      const response = await fetch(`/api/interactions/${type}/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: clickCount }),
      })

      const data = await response.json()

      if (!response.ok) {
        // 回滚乐观更新
        const rollbackCount = clickCount
        setLocalCount((prev) => (prev !== null ? prev - rollbackCount : displayCount))

        if (response.status === 429) {
          // 今天已达到限制，使用服务端返回的用户点击次数
          if (typeof data.userClickCount === 'number') {
            setUserClickCount(data.userClickCount)
          }
          toast.error('今天点过了哦，明天再来吧～')
        } else {
          // 其他错误，回滚
          setUserClickCount((prev) => Math.max(0, prev - rollbackCount))
          toast.error('操作失败了...')
        }
        setIsSubmitting(false)
        return
      }

      // 同步服务端真实计数和用户点击次数
      startTransition(() => {
        setLocalCount(data.count)
        if (typeof data.userClickCount === 'number') {
          setUserClickCount(data.userClickCount)
        }
        setIsSubmitting(false)
      })
    } catch (error) {
      // 网络错误，回滚
      const rollbackCount = clickCount
      setLocalCount((prev) => (prev !== null ? prev - rollbackCount : displayCount))
      setUserClickCount((prev) => Math.max(0, prev - rollbackCount))
      toast.error('网络错误了，请稍后重试～')
      console.error('Failed to update interaction:', error)
      setIsSubmitting(false)
    }
  }

  const handleClick = () => {
    // 不能点击时直接返回
    if (isSubmitting) {
      return
    }

    if (!canClick || isMaxedOut) {
      toast.info(
        `今日${maxClicks > 1 ? `${config.ariaLabel}已达 ${maxClicks} 次上限` : `已${config.ariaLabel}`}，明天再来吧。`,
      )
      return
    }

    // 立即乐观更新 UI
    setLocalCount((prev) => (prev !== null ? prev + 1 : displayCount + 1))
    setUserClickCount((prev) => prev + 1)
    pendingClicksRef.current += 1

    // 记录到 localStorage
    recordUserClick(type, id)

    // 清除之前的定时器
    if (submitTimerRef.current) {
      clearTimeout(submitTimerRef.current)
    }

    // 设置新的定时器，600ms 后批量提交
    submitTimerRef.current = setTimeout(() => {
      const clicksToSubmit = pendingClicksRef.current
      if (clicksToSubmit > 0) {
        submitBatch(clicksToSubmit)
      }
    }, 600)
  }

  // 动态获取图标组件
  const IconComponent = isMaxedOut ? FILLED_ICON_MAP[config.icon] : ICON_MAP[config.icon]

  // 如果图标未找到，降级处理
  if (!IconComponent) {
    console.warn(`Icon "${config.icon}" not found in ICON_MAP`)
    return null
  }

  return (
    <Tooltip
      content={
        isMaxedOut
          ? `今日${maxClicks > 1 ? `${config.ariaLabel}已达 ${maxClicks} 次上限` : `已${config.ariaLabel}`}`
          : `点击${config.ariaLabel}${maxClicks > 1 ? `，最多 ${maxClicks} 次` : ''}`
      }
    >
      <div className="group text-text-secondary relative inline-flex">
        <button
          onClick={handleClick}
          disabled={isPending || isSubmitting}
          className={cn(
            'inline-flex items-center gap-1 text-xs transition-all active:scale-72',
            canClick && !isSubmitting ? 'cursor-pointer hover:opacity-80' : 'cursor-default',
            // isSubmitting ? 'opacity-80' : '',
            className,
          )}
          style={{
            color: isMaxedOut ? `var(${config.colorVar})` : 'var(--color-text-secondary)',
          }}
          aria-label={`${config.ariaLabel} ${displayCount.toLocaleString('zh-Hans-CN')} 次，你已点击 ${userClickCount.toLocaleString('zh-Hans-CN')} 次`}
        >
          <IconComponent
            className={cn(
              'h-[1.2em] w-[1.2em] transition-transform',
              isMaxedOut && 'scale-110',
              iconClassName,
            )}
          />
          {displayCount > 0 && <CountUp duration={1} start={prevLocalCount} end={displayCount} />}
        </button>
      </div>
    </Tooltip>
  )
}
