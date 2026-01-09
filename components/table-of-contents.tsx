'use client'

import { useEffect, useState, useRef } from 'react'
import { extractHeadings, type TocHeading } from '@/lib/toc'

interface TableOfContentsProps {
  /** 文章容器的选择器，默认为 '.prose' */
  containerSelector?: string
}

/**
 * 文章目录组件（Table of Contents）
 *
 * 功能：
 * - 自动提取文章中的 h2 和 h3 标题
 * - 滚动时高亮当前章节
 * - 点击标题平滑滚动到对应位置
 * - PC 端：固定在右侧，默认半透明只显示当前标题，hover 显示全部
 * - 移动端：隐藏（由移动端专用组件处理）
 */
export function TableOfContents({ containerSelector = '.prose' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocHeading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isHovered, setIsHovered] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // 提取标题
  useEffect(() => {
    const container = document.querySelector<HTMLElement>(containerSelector)
    if (!container) return

    const extractedHeadings = extractHeadings(container)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(extractedHeadings)

    // 设置初始激活标题
    if (extractedHeadings.length > 0) {
      setActiveId(extractedHeadings[0].id)
    }
  }, [containerSelector])

  // Intersection Observer 监听标题可见性
  useEffect(() => {
    if (headings.length === 0) return

    const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        // 找到第一个进入视口的标题
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visibleHeadings.length > 0) {
          setActiveId(visibleHeadings[0].target.id)
        }
      },
      {
        rootMargin: '-100px 0px -66% 0px', // 当标题接近顶部时触发
        threshold: 0,
      },
    )

    headingElements.forEach((el) => {
      if (el) observer.observe(el)
    })

    observerRef.current = observer

    return () => {
      observer.disconnect()
    }
  }, [headings])

  // 如果没有标题，不渲染
  if (headings.length === 0) {
    return null
  }

  // 过滤显示的标题（非 hover 时显示当前标题及前后共 5 个）
  const getVisibleHeadings = () => {
    if (isHovered || headings.length <= 5) {
      return headings
    }

    const activeIndex = headings.findIndex((h) => h.id === activeId)
    if (activeIndex === -1) {
      return headings.slice(0, 5)
    }

    const totalToShow = 5
    // 尽量让当前标题居中，前后各显示 2 个
    let startIndex = Math.max(0, activeIndex - 2)
    let endIndex = startIndex + totalToShow

    // 如果后面不够，往前补
    if (endIndex > headings.length) {
      endIndex = headings.length
      startIndex = Math.max(0, endIndex - totalToShow)
    }

    return headings.slice(startIndex, endIndex)
  }

  const visibleHeadings = getVisibleHeadings()

  return (
    <>
      {/* PC 端 TOC - 固定在右侧 */}
      <nav
        className="fixed top-1/2 right-4 z-10 hidden max-h-[70vh] w-48 -translate-y-1/2 overflow-y-auto opacity-48 hover:opacity-100 lg:block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="文章目录"
      >
        {/* 标题 */}
        <div className="text-text-tertiary mb-4 text-xs font-medium">目录</div>

        {/* 标题列表 */}
        <ul className="text-sm">
          {headings.map((heading) => {
            const isActive = heading.id === activeId
            const isH3 = heading.level === 3
            const isVisible = visibleHeadings.some((h) => h.id === heading.id)

            return (
              <li
                key={heading.id}
                className={`overflow-hidden transition-all duration-200 ${isH3 ? 'pl-3' : ''}`}
                style={{
                  maxHeight: isVisible ? '2rem' : '0',
                  marginBottom: isVisible ? '0.25rem' : '0',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <a
                  href={`#${heading.id}`}
                  className={`block w-full truncate text-left transition-colors duration-200 ${
                    isActive
                      ? 'text-text-primary font-medium'
                      : isHovered
                        ? 'text-text-secondary hover:text-text-primary'
                        : 'text-text-tertiary'
                  }`}
                  title={heading.text}
                >
                  {heading.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
