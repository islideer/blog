'use client'

import { createPortal } from 'react-dom'
import { useState, useRef, useEffect } from 'react'

interface TooltipProps {
  content: string
  children: React.ReactNode
}

let isTouchDeviceDetected = false

export function Tooltip({ content, children }: TooltipProps) {
  const [tooltipData, setTooltipData] = useState<{
    top: number
    left: number
    isAbove: boolean
  } | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleMouseEnter = () => {
    // 触摸设备不显示 tooltip
    if (isTouchDeviceDetected) return

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }

    if (wrapperRef.current) {
      // 获取实际渲染的子元素（Link 或 button）
      const childElement = wrapperRef.current.firstElementChild
      if (!childElement) return

      const rect = childElement.getBoundingClientRect()

      // 边界检测和调整
      const viewportWidth = window.innerWidth
      const tooltipPadding = 8 // 距离边界的最小间距
      const estimatedTooltipHeight = 36 // tooltip 高度约 36px

      // 计算 tooltip 初始位置（优先元素上方居中）
      let top = rect.top - estimatedTooltipHeight - 8
      let left = rect.left + rect.width / 2
      let isAbove = true

      // 上边界检测 - 如果上方空间不够，改为下方
      if (top < tooltipPadding) {
        top = rect.bottom + 8
        isAbove = false
      }

      // 预估 tooltip 宽度（假设最大 200px）
      const estimatedTooltipWidth = Math.min(content.length * 8, 200)
      const tooltipHalfWidth = estimatedTooltipWidth / 2

      // 左边界检测
      if (left - tooltipHalfWidth < tooltipPadding) {
        left = tooltipHalfWidth + tooltipPadding
      }

      // 右边界检测
      if (left + tooltipHalfWidth > viewportWidth - tooltipPadding) {
        left = viewportWidth - tooltipHalfWidth - tooltipPadding
      }

      setTooltipData({ top, left, isAbove })
    }
  }

  useEffect(() => {
    const handleTouchStart = () => {
      // 清除 tooltip 显示
      setTooltipData(null)

      // 标记为触摸设备
      isTouchDeviceDetected = true
    }

    window.addEventListener('touchstart', handleTouchStart, { once: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <div
        ref={wrapperRef}
        style={{ display: 'contents' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setTooltipData(null)}
      >
        {children}
      </div>

      {tooltipData &&
        createPortal(
          <div
            className="bg-bg-primary text-text-secondary border-border-hover pointer-events-none fixed z-50 -translate-x-1/2 rounded border border-solid px-2.5 py-1.5 text-xs whitespace-nowrap shadow-xs"
            style={{
              top: `${tooltipData.top}px`,
              left: `${tooltipData.left}px`,
            }}
          >
            {content}
            {/* 小三角形指示器 - 根据位置调整方向 */}
            <div
              className={`bg-bg-primary border-border-hover absolute left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-solid ${
                tooltipData.isAbove ? '-bottom-1.5 border-r border-b' : '-top-1.5 border-t border-l'
              }`}
            />
          </div>,
          document.body,
        )}
    </>
  )
}
