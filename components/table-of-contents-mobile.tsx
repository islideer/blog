'use client'

import { useEffect, useState } from 'react'
import { extractHeadings, type TocHeading } from '@/lib/toc'

interface TableOfContentsMobileProps {
  /** 文章容器的选择器，默认为 '.prose' */
  containerSelector?: string
}

/**
 * 移动端文章目录组件
 *
 * 功能：
 * - 底部浮动按钮
 * - 点击展开抽屉显示完整目录
 * - 点击标题后自动关闭抽屉并滚动到对应位置
 */
export function TableOfContentsMobile({
  containerSelector = '.prose',
}: TableOfContentsMobileProps) {
  const [headings, setHeadings] = useState<TocHeading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  // 提取标题
  useEffect(() => {
    const container = document.querySelector<HTMLElement>(containerSelector)
    if (!container) return

    const extractedHeadings = extractHeadings(container)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(extractedHeadings)

    if (extractedHeadings.length > 0) {
      setActiveId(extractedHeadings[0].id)
    }
  }, [containerSelector])

  // 监听标题可见性
  useEffect(() => {
    if (headings.length === 0) return

    const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visibleHeadings.length > 0) {
          setActiveId(visibleHeadings[0].target.id)
        }
      },
      {
        rootMargin: '-100px 0px -66% 0px',
        threshold: 0,
      },
    )

    headingElements.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [headings])

  // 点击标题滚动到对应位置
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const offset = 80
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })

    // 关闭抽屉
    setIsOpen(false)
  }

  // 如果没有标题，不渲染
  if (headings.length === 0) {
    return null
  }

  return (
    <>
      {/* 浮动按钮 - 仅移动端显示 */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-bg-secondary border-border text-text-secondary hover:text-text-primary fixed right-4 bottom-20 z-40 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-all hover:shadow-xl lg:hidden"
        aria-label="打开文章目录"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="bg-bg-secondary/80 fixed inset-0 z-40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 抽屉 */}
      <div
        className={`bg-bg-primary border-border fixed right-0 bottom-0 left-0 z-50 flex max-h-[70vh] flex-col rounded-t-2xl border-t shadow-2xl transition-transform duration-300 lg:hidden ${isOpen ? 'translate-y-0' : 'translate-y-full'} `}
      >
        {/* 抽屉头部 - 固定不滚动 */}
        <div className="border-border flex shrink-0 items-center justify-between border-b px-4 py-3">
          <h2 className="text-text-tertiary text-sm font-medium">目录</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-text-tertiary hover:text-text-primary transition-colors"
            aria-label="关闭目录"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* 标题列表 - 可滚动区域 */}
        <div className="overflow-y-auto overscroll-contain">
          <ul className="space-y-1 px-4 py-4 text-sm">
            {headings.map((heading) => {
              const isActive = heading.id === activeId
              const isH3 = heading.level === 3

              return (
                <li key={heading.id} className={isH3 ? 'pl-3' : ''}>
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={`block w-full py-2 text-left no-underline transition-colors ${
                      isActive
                        ? 'text-text-primary font-medium'
                        : 'text-text-tertiary hover:text-text-primary'
                    } `}
                  >
                    {heading.text}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
