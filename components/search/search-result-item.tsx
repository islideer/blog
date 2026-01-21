import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'
import {
  formatRelativeDate,
  highlightKeywords,
  extractKeywords,
  extractMatchingSnippet,
} from '@/lib/search-utils'

import type { SearchIndexItem } from '@/scripts/generate-search-index'
import { dayjs } from '@/lib/dayjs'

interface SearchResultItemProps {
  result: SearchIndexItem
  query: string
  isSelected?: boolean
  onClick?: () => void
}

// 类型名称映射
const TYPE_NAMES: Record<SearchIndexItem['type'], string> = {
  post: '文章',
  thought: '碎碎念',
  'mio-say': 'Mio 说',
  collection: '收藏夹',
  timeline: '大事记',
  about: '关于',
  friend: '好朋友们',
}

export function SearchResultItem({ result, query, isSelected, onClick }: SearchResultItemProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const keywords = extractKeywords(query)
  const titleParts = highlightKeywords(result.title, keywords)

  // 检查标题和摘要是否有匹配
  const titleHasMatch = titleParts.some((part) => part.type === 'mark')
  const excerptHasMatch = (result.excerpt || '')
    .toLowerCase()
    .includes(keywords[0]?.toLowerCase() || '')

  // 如果标题和摘要都没有匹配，从 content 提取包含关键词的片段
  let displayExcerpt = result.excerpt
  if (!titleHasMatch && !excerptHasMatch && result.content) {
    displayExcerpt = extractMatchingSnippet(result.content, keywords, 120)
  }

  const excerptParts = highlightKeywords(displayExcerpt || '', keywords)

  // 检查 URL 是否包含 hash（用于决定使用哪种链接方式）
  const hasHash = result.url.includes('#')

  // 自动滚动到选中的项目
  useEffect(() => {
    if (isSelected && linkRef.current) {
      linkRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [isSelected])

  const linkClassName = cn(
    'border-border no-icon block border-b p-3 no-underline sm:p-4',
    'hover:bg-bg-secondary active:bg-bg-secondary dark:hover:bg-bg-tertiary dark:active:bg-bg-tertiary',
    isSelected && 'bg-bg-secondary dark:bg-bg-tertiary',
  )

  const linkProps = {
    ref: linkRef,
    className: linkClassName,
    onClick,
    ...(result.type === 'collection' && {
      target: '_blank' as const,
      rel: 'noopener noreferrer',
    }),
  }

  // 公共内容区域
  const content = (
    <div className="flex items-start gap-3">
      <div className="min-w-0 flex-1">
        {/* 标题（高亮关键词） */}
        <h3 className="text-text-primary mb-1 line-clamp-3 text-sm font-medium sm:text-base">
          {titleParts.map((part, i) =>
            part.type === 'mark' ? (
              <mark key={i}>{part.text}</mark>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </h3>

        {/* 摘要或内容片段（高亮关键词） */}
        <p className="text-text-secondary mb-1.5 line-clamp-2 text-xs sm:text-sm">
          {excerptParts.map((part, i) =>
            part.type === 'mark' ? (
              <mark key={i}>{part.text}</mark>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>

        {/* 元信息（标签和日期） */}
        <div className="text-text-tertiary flex flex-wrap items-center gap-2 text-xs">
          {/* 类型标签 */}
          <span className="bg-bg-tertiary rounded px-1.5 py-0.5">{TYPE_NAMES[result.type]}</span>

          {/* 标签（如果有） */}
          {result.tags && result.tags.length > 0 && (
            <>
              <span className="text-text-tertiary">·</span>
              <span className="line-clamp-1">{result.tags.slice(0, 3).join(', ')}</span>
            </>
          )}

          {/* 日期 */}
          {result.date && (
            <>
              <span className="text-text-tertiary">·</span>
              <span>{formatRelativeDate(result.date)}</span>
              <span className="text-text-tertiary">·</span>
              <span>
                {dayjs(result.date).format(result.type === 'timeline' ? 'YYYY 年' : 'YYYY-MM-DD')}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )

  // 对于包含 hash 的链接，使用原生 <a> 标签以触发 :target 伪类
  // 对于其他链接，使用 Next.js <Link> 组件以启用客户端路由
  return hasHash ? (
    <a href={result.url} {...linkProps}>
      {content}
    </a>
  ) : (
    <Link href={result.url} {...linkProps}>
      {content}
    </Link>
  )
}
