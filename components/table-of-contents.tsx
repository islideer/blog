'use client'

import Link from 'next/link'
import { cn } from '@/lib/cn'
import { MenuIcon } from './icons/menu'
import { CloseIcon } from './icons/close'
import { extractHeadings } from '@/lib/toc'
import { useEffect, useState } from 'react'

interface TableOfContentsProps {
  /** 文章容器的选择器，默认为 '.prose' */
  containerSelector?: string
  /** PC 端显示的标题数量，默认为 5 */
  showCount?: number
}

/**
 * 文章目录组件（Table of Contents）
 *
 * 功能：
 * - 自动提取文章中的 h2 和 h3 标题
 * - 使用 StaticTableOfContents 进行渲染
 */
export function TableOfContents({
  containerSelector = '.prose',
  showCount = 5,
}: TableOfContentsProps) {
  const [items, setItems] = useState<StaticTocItem[]>([])

  // 提取标题
  useEffect(() => {
    const container = document.querySelector<HTMLElement>(containerSelector)

    if (!container) return

    const extractedHeadings = extractHeadings(container)

    // 转换为 StaticTocItem 格式
    const tocItems: StaticTocItem[] = extractedHeadings.map((h) => ({
      id: h.id,
      title: h.text, // TocHeading 使用 text，StaticTocItem 使用 title
      level: h.level,
    }))

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(tocItems)
  }, [containerSelector])

  if (items.length === 0) {
    return null
  }

  return (
    <>
      <StaticTableOfContentsPC items={items} showCount={showCount} />
      <StaticTableOfContentsMobile items={items} />
    </>
  )
}

/**
 * 静态目录组件（Static Table of Contents）
 *
 * 功能：
 * - 接收手动定义的 id 和 title 列表
 * - 滚动时高亮当前章节
 * - 点击标题平滑滚动到对应位置
 * - PC 端：固定在右侧，默认半透明只显示当前标题，hover 显示全部
 * - 移动端：隐藏（由移动端专用组件处理）
 */
export function StaticTableOfContents({ items = [], showCount = 5 }: StaticTableOfContentsProps) {
  return (
    <>
      <StaticTableOfContentsPC items={items} showCount={showCount} />
      <StaticTableOfContentsMobile items={items} />
    </>
  )
}

export interface StaticTocItem {
  id: string
  title: string
  level?: number
}

export interface StaticTableOfContentsProps {
  showCount?: number
  items: StaticTocItem[]
}

/**
 * 静态目录组件（Static Table of Contents）
 *
 * 功能：
 * - 接收手动定义的 id 和 title 列表
 * - 滚动时高亮当前章节
 * - 点击标题平滑滚动到对应位置
 * - PC 端：固定在右侧，默认半透明只显示当前标题，hover 显示全部
 * - 移动端：隐藏（由移动端专用组件处理）
 */
export function StaticTableOfContentsPC({ showCount = 5, items = [] }: StaticTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isHovered, setIsHovered] = useState(false)

  // 设置初始激活标题
  useEffect(() => {
    if (items.length > 0 && !activeId) {
      setActiveId(items[0].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  // 滚动监听 + 手动检查标题位置（更准确的高亮逻辑）
  useEffect(() => {
    if (items.length === 0) return

    const OFFSET_TOP = 150 // 视口顶部偏移量

    const updateActiveId = () => {
      const headingElements = items
        .map((h) => ({
          id: h.id,
          element: document.getElementById(h.id),
        }))
        .filter((h) => h.element !== null)

      // 找到第一个位置在偏移量以下的标题（即最接近顶部但还没滚过的标题）
      let activeHeading = headingElements[0]

      for (const heading of headingElements) {
        const rect = heading.element!.getBoundingClientRect()

        // 如果标题在偏移量以下，更新 activeHeading
        if (rect.top <= OFFSET_TOP) {
          activeHeading = heading
        } else {
          // 一旦遇到在偏移量以上的标题，停止查找
          break
        }
      }

      if (activeHeading) {
        setActiveId(activeHeading.id)
      }
    }

    // 初始化时执行一次
    updateActiveId()

    // 监听滚动事件（使用 throttle 优化性能）
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveId()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [items])

  // 如果没有标题，不渲染
  if (items.length === 0) {
    return null
  }

  // 过滤显示的标题（非 hover 时显示当前标题及前后共 5 个）
  const getVisibleHeadings = () => {
    if (isHovered || items.length <= showCount) {
      return items
    }

    const activeIndex = items.findIndex((h) => h.id === activeId)
    if (activeIndex === -1) {
      return items.slice(0, showCount)
    }

    // 尽量让当前标题居中，前后各显示 2 个
    let startIndex = Math.max(0, activeIndex - 2)
    let endIndex = startIndex + showCount

    // 如果后面不够，往前补
    if (endIndex > items.length) {
      endIndex = items.length
      startIndex = Math.max(0, endIndex - showCount)
    }

    return items.slice(startIndex, endIndex)
  }

  // 点击标题滚动到对应位置
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const offset = 160
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })

    // 更新 URL hash（不触发跳转）
    window.history.pushState(null, '', `#${id}`)
  }

  const visibleHeadings = getVisibleHeadings()

  return (
    <>
      {/* PC 端 TOC - 固定在右侧 */}
      <nav
        className="fixed top-1/2 right-4 z-10 hidden max-h-[70vh] w-60 -translate-y-1/2 overflow-y-auto opacity-48 hover:opacity-100 xl:block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="文章目录"
      >
        {/* 标题 */}
        <div className="text-text-tertiary mb-4 text-xs font-medium">目录</div>

        {/* 标题列表 */}
        <ul className="text-sm">
          {items.map((item) => {
            const isActive = item.id === activeId
            const isH3 = item.level === 3
            const isVisible = visibleHeadings.some((h) => h.id === item.id)

            return (
              <li
                key={item.id}
                className={cn('overflow-hidden transition-all! duration-200', isH3 && 'pl-3')}
                style={{
                  maxHeight: isVisible ? '2rem' : '0',
                  marginBottom: isVisible ? '0.25rem' : '0',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <Link
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHeading(item.id)
                  }}
                  className={cn(
                    'block w-full truncate text-left',
                    isActive
                      ? 'text-text-primary font-medium'
                      : isHovered
                        ? 'text-text-secondary hover:text-text-primary'
                        : 'text-text-tertiary',
                  )}
                  title={item.title}
                >
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

/**
 * 移动端静态文章目录组件
 *
 * 功能：
 * - 接收手动定义的 items (id, title, level)
 * - 底部浮动按钮
 * - 点击展开抽屉显示完整目录
 * - 滚动时高亮当前章节
 * - 点击标题后自动关闭抽屉并滚动到对应位置
 */
export function StaticTableOfContentsMobile({ items = [] }: StaticTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  // 滚动监听 + 手动检查标题位置（更准确的高亮逻辑）
  useEffect(() => {
    if (items.length === 0) return

    const OFFSET_TOP = 150 // 视口顶部偏移量

    const updateActiveId = () => {
      const headingElements = items
        .map((h) => ({
          id: h.id,
          element: document.getElementById(h.id),
        }))
        .filter((h) => h.element !== null)

      // 找到第一个位置在偏移量以下的标题（即最接近顶部但还没滚过的标题）
      let activeHeading = headingElements[0]

      for (const heading of headingElements) {
        const rect = heading.element!.getBoundingClientRect()

        // 如果标题在偏移量以下，更新 activeHeading
        if (rect.top <= OFFSET_TOP) {
          activeHeading = heading
        } else {
          // 一旦遇到在偏移量以上的标题，停止查找
          break
        }
      }

      if (activeHeading) {
        setActiveId(activeHeading.id)
      }
    }

    // 初始化时执行一次
    updateActiveId()

    // 监听滚动事件（使用 throttle 优化性能）
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveId()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [items])

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

    // 更新 URL hash（不触发跳转）
    window.history.pushState(null, '', `#${id}`)

    // 关闭抽屉
    setIsOpen(false)
  }

  // 如果没有 items，不渲染
  if (items.length === 0) {
    return null
  }

  return (
    <>
      {/* 浮动按钮 - 仅移动端显示 */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-bg-secondary border-border text-text-secondary hover:text-text-primary fixed right-4 bottom-20 z-40 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-all! hover:shadow-xl xl:hidden"
        aria-label="打开文章目录"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {/* 抽屉背景遮罩 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm xl:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 抽屉内容 */}
      <div
        className={cn(
          'bg-bg-primary fixed right-0 bottom-0 z-50 h-[60vh] w-full transform rounded-t-2xl border-t border-gray-200 shadow-2xl transition-all! duration-300 ease-in-out xl:hidden dark:border-gray-800',
          isOpen ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        {/* 把手 */}
        <div
          className="absolute top-0 right-0 left-0 flex h-6 w-full items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div className="bg-border h-1 w-12 rounded-full" />
        </div>

        {/* 标题 */}
        <div className="border-border flex items-center justify-between border-b px-6 py-4 pt-6">
          <span className="text-text-primary text-lg font-medium">目录</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-text-tertiary hover:text-text-primary p-1"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* 列表 */}
        <div className="h-[calc(60vh-6rem)] overflow-y-auto px-6 py-4">
          <ul className="space-y-3">
            {items.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id} className={cn(item.level === 3 && 'pl-4')}>
                  <Link
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToHeading(item.id)
                    }}
                    className={cn(
                      'block w-full truncate text-left transition-colors duration-200',
                      isActive ? 'text-text-primary font-medium' : 'text-text-tertiary',
                    )}
                    title={item.title}
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
