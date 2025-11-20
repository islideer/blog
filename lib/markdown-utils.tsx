import type { ReactNode } from 'react'

export type MarkdownPart = string | { text: string; url: string }

/**
 * 将 Markdown 链接转换为结构化数据
 * 支持格式：[文字](链接)
 */
export function parseMarkdownLinks(text: string): MarkdownPart[] {
  // 匹配 Markdown 链接格式：[文字](链接)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: MarkdownPart[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = linkRegex.exec(text)) !== null) {
    // 添加链接前的文本
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    // 添加链接
    parts.push({ text: match[1], url: match[2] })
    lastIndex = match.index + match[0].length
  }

  // 添加剩余文本
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

/**
 * 渲染 Markdown 链接为 React 元素
 * 支持 \n 换行符
 */
export function renderMarkdownLinks(text: string, linkClassName?: string): (string | ReactNode)[] {
  const parts = parseMarkdownLinks(text)

  return parts.flatMap((part, partIndex) => {
    if (typeof part === 'string') {
      // 处理换行符
      const lines = part.split('\n')
      return lines.flatMap((line, lineIndex) => {
        const elements: ReactNode[] = []
        if (lineIndex > 0) {
          elements.push(<br key={`${partIndex}-br-${lineIndex}`} />)
        }
        if (line) {
          elements.push(<span key={`${partIndex}-text-${lineIndex}`}>{line}</span>)
        }
        return elements
      })
    } else {
      // Markdown 链接
      return (
        <a
          key={partIndex}
          href={part.url}
          target="_blank"
          rel="noopener noreferrer"
          className={
            linkClassName || 'hover:text-text-primary underline underline-offset-2 transition-colors'
          }
        >
          {part.text}
        </a>
      )
    }
  })
}
