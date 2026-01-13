'use client'

import { useState, type ReactNode, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface TooltipProps {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
  const [tooltipData, setTooltipData] = useState<{
    top: number
    left: number
    isAbove: boolean
  } | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const isTouchDevice = useRef(false)

  const handleMouseEnter = () => {
    // 触摸设备不显示 tooltip
    if (isTouchDevice.current) return

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }

    if (wrapperRef.current) {
      // 获取实际渲染的子元素（Link 或 button）
      const childElement = wrapperRef.current.firstElementChild
      if (!childElement) return

      const rect = childElement.getBoundingClientRect()

      // 计算 tooltip 初始位置（元素下方居中）
      let top = rect.bottom + 8
      let left = rect.left + rect.width / 2
      let isAbove = false

      // 边界检测和调整
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const tooltipPadding = 8 // 距离边界的最小间距

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

      // 下边界检测（tooltip 高度约 36px）
      const estimatedTooltipHeight = 36
      if (top + estimatedTooltipHeight > viewportHeight - tooltipPadding) {
        // 显示在元素上方
        top = rect.top - estimatedTooltipHeight - 8
        isAbove = true
      }

      setTooltipData({ top, left, isAbove })
    }
  }

  const handleMouseLeave = () => {
    // 立即隐藏，不延迟
    setTooltipData(null)
  }

  const handleTouchStart = () => {
    // 标记为触摸设备
    isTouchDevice.current = true
  }

  useEffect(() => {
    return () => {
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
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
      >
        {children}
      </div>

      {tooltipData &&
        createPortal(
          <div
            className="bg-bg-secondary text-text-primary border-border-hover pointer-events-none fixed z-50 -translate-x-1/2 rounded border border-solid px-2.5 py-1.5 text-xs whitespace-nowrap shadow-sm"
            style={{
              top: `${tooltipData.top}px`,
              left: `${tooltipData.left}px`,
            }}
          >
            {content}
            {/* 小三角形指示器 - 根据位置调整方向 */}
            <div
              className={`bg-bg-secondary border-border-hover absolute left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-solid ${
                tooltipData.isAbove
                  ? '-bottom-1.5 border-b border-r'
                  : '-top-1.5 border-t border-l'
              }`}
            />
          </div>,
          document.body,
        )}
    </>
  )
}
