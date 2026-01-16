'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/config'
import { CopyIcon } from './icons/copy'
import { CheckIcon } from './icons/check'

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
        <div className="scale-80">
          {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        </div>
        {copied ? '完成' : '复制'}
      </button>
    </div>
  )
}
