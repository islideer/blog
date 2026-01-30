'use client'

import { useState } from 'react'
import { ChevronUpIcon } from '../../icons/chevron-up'
import { ChevronDownIcon } from '../../icons/chevron-down'

interface CollapsibleContentProps {
  html: string
  maxLines?: number
}

export function CollapsibleContent({ html, maxLines = 3 }: CollapsibleContentProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showButton, setShowButton] = useState(false)

  // 检测内容是否被截断
  const checkOverflow = (element: HTMLDivElement | null) => {
    if (!element) return
    setShowButton(element.scrollHeight > element.clientHeight)
  }

  return (
    <div className="relative">
      {/* 让 Tailwind 生成 line-clamp 类 */}
      <div className="hidden">
        <span className="line-clamp-1"></span>
        <span className="line-clamp-2"></span>
        <span className="line-clamp-3"></span>
        <span className="line-clamp-4"></span>
        <span className="line-clamp-5"></span>
        <span className="line-clamp-6"></span>
        <span className="line-clamp-7"></span>
        <span className="line-clamp-8"></span>
        <span className="line-clamp-9"></span>
        <span className="line-clamp-10"></span>
        <span className="line-clamp-11"></span>
        <span className="line-clamp-12"></span>
      </div>

      <div
        ref={(el) => {
          if (el && !isExpanded) checkOverflow(el)
        }}
        className={`message-content prose prose-sm dark:prose-invert max-w-none ${!isExpanded ? `line-clamp-${maxLines}` : ''}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-text-secondary hover:text-text-primary mt-1.5 inline-flex items-center gap-0.5 text-xs font-medium transition-all active:scale-90"
        >
          {isExpanded ? '收起' : '更多'}
          {isExpanded ? (
            <ChevronUpIcon className="h-3.5 w-3.5" />
          ) : (
            <ChevronDownIcon className="h-3.5 w-3.5" />
          )}
        </button>
      )}
    </div>
  )
}
