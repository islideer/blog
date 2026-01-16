'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/config'

// 复制图标
function CopyIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="9"
        y="9"
        width="13"
        height="13"
        rx="2"
        ry="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 勾选图标
function CheckIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PageUrl() {
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState('')

  useEffect(() => {
    // 客户端获取完整 URL
    setUrl(`${siteConfig.url}${pathname}`)
  }, [pathname])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  if (!url) return null

  return (
    <div className="text-text-tertiary flex flex-row items-center justify-center gap-2 text-center text-xs sm:text-sm">
      <code className="text-text-tertiary/80 max-w-auto mx-0 max-w-full font-mono text-xs break-all">
        {url}
      </code>
      <button
        onClick={handleCopy}
        className="hover:bg-bg-secondary text-text-secondary hover:text-text-primary inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs transition-colors"
        aria-label="复制"
      >
        <div className="scale-80">{copied ? <CheckIcon /> : <CopyIcon />}</div>
        {copied ? '完成' : '复制'}
      </button>
    </div>
  )
}
