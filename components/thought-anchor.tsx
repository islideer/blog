'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ThoughtAnchorProps {
  id: string
  basePath: string
  className?: string
  style?: React.CSSProperties
  variant?: 'default' | 'mio'
}

export function ThoughtAnchor({ id, basePath, className, style }: ThoughtAnchorProps) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    const url = `${basePath}#${id}`
    await navigator.clipboard.writeText(window.location.origin + url)
    setCopied(true)

    // 更新 URL hash
    router.replace(url, { scroll: false })

    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleClick}
      className={`cursor-pointer font-mono text-xs font-semibold hover:opacity-100 ${className || ''}`}
      style={style}
      title="点击复制链接"
      aria-label={`复制 #${id} 的链接`}
    >
      {copied ? '已复制!' : `#${id}`}
    </button>
  )
}

interface ThoughtScrollContainerProps {
  children: React.ReactNode
  variant?: 'default' | 'mio'
}

export function ThoughtScrollContainer({
  children,
  variant = 'default',
}: ThoughtScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollToHash = (behavior: ScrollBehavior = 'instant') => {
      const hash = window.location.hash.slice(1)

      if (!hash) return

      // 延迟执行以确保 DOM 已渲染
      setTimeout(() => {
        const element = document.getElementById(`thought-${hash}`)

        if (!element) return

        element.scrollIntoView({ behavior, block: 'start' })

        // 添加高亮效果（闪两下）
        const highlightClass = variant === 'mio' ? 'highlight-anchor-mio' : 'highlight-anchor'
        element.classList.add(highlightClass)

        setTimeout(() => {
          element.classList.remove(highlightClass)
        }, 1600)
      }, 100)
    }

    // 初始加载时检查 hash
    scrollToHash()

    const onHashChange = () => scrollToHash('smooth')

    // 监听 hash 变化（页面内链接跳转）
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [variant])

  return <div ref={containerRef}>{children}</div>
}
