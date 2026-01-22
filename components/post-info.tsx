'use client'

import { useState } from 'react'
import { CopyIcon } from './icons/copy'
import { CheckIcon } from './icons/check'
import { siteConfig } from '@/lib/config'

export function PostInfo({ title, slug }: { title: string; slug: string }) {
  const url = `${siteConfig.url}/${slug}`
  const [copiedTitle, setCopiedTitle] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState(false)

  const handleCopyTitle = async () => {
    try {
      await navigator.clipboard.writeText(title)
      setCopiedTitle(true)
      setTimeout(() => setCopiedTitle(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedUrl(true)
      setTimeout(() => setCopiedUrl(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <div className="space-y-2 py-1 text-xs">
      {/* 标题 */}
      <div className="flex items-center gap-1 truncate sm:gap-2">
        <span className="text-text-tertiary shrink-0">标题</span>
        <span className="text-text-tertiary shrink-0">·</span>
        <div className="flex min-w-0 flex-1 items-center gap-1 truncate sm:gap-2">
          <span className="text-text-secondary min-w-0 truncate wrap-break-word">
            {title} | {siteConfig.name}
          </span>
          <button
            onClick={handleCopyTitle}
            className="text-text-tertiary hover:text-text-primary shrink-0 transition-colors"
            aria-label={copiedTitle ? '已复制' : '复制标题'}
          >
            {copiedTitle ? (
              <CheckIcon className="h-3.5 w-3.5" />
            ) : (
              <CopyIcon className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* 链接 */}
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="text-text-tertiary shrink-0">链接</span>
        <span className="text-text-tertiary shrink-0">·</span>
        <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
          <code className="text-text-tertiary min-w-0 truncate font-mono text-[11px] break-all">
            {url}
          </code>
          <button
            onClick={handleCopyUrl}
            className="text-text-tertiary hover:text-text-primary shrink-0 transition-colors"
            aria-label={copiedUrl ? '已复制' : '复制链接'}
          >
            {copiedUrl ? (
              <CheckIcon className="h-3.5 w-3.5" />
            ) : (
              <CopyIcon className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* 协议 */}
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="text-text-tertiary shrink-0">版权</span>
        <span className="text-text-tertiary shrink-0">·</span>
        <span className="text-text-tertiary flex-1">
          文章以
          <a
            href={siteConfig.copyright.license.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary mx-1"
          >
            {siteConfig.copyright.license.name}
          </a>
          协议共享，转载请注明出处。
        </span>
      </div>
    </div>
  )
}
