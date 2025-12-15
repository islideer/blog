import { parseMarkdown } from '@/lib/markdown'

interface MarkdownLiteProps {
  content: string
  className?: string
}

/**
 * 轻量级 Markdown 渲染组件（服务端组件）
 * 用于碎碎念、Mio 说等简单内容
 * 支持 Shiki 代码高亮，服务端渲染确保 SEO 友好
 */
export async function MarkdownLite({ content, className = '' }: MarkdownLiteProps) {
  if (!content || content.trim() === '') {
    return null
  }

  const html = await parseMarkdown(content)

  return (
    <div
      className={`prose prose-sm ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
