import { cn } from '@/lib/cn'
import { parseMarkdown } from '@/lib/markdown'
import { CodeBlockEnhancer } from './code-block-enhancer'

interface MarkdownLiteProps {
  content: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClassMap = {
  sm: 'prose-sm',
  md: 'prose-md',
  lg: 'prose-lg',
}

/**
 * 轻量级 Markdown 渲染组件（服务端组件）
 * 用于碎碎念、Mio 说等简单内容
 * 支持 Shiki 代码高亮，服务端渲染确保 SEO 友好
 */
export async function MarkdownLite({ size = 'sm', content, className = '' }: MarkdownLiteProps) {
  if (!content || content.trim() === '') {
    return null
  }

  const sizeClass = sizeClassMap[size] || sizeClassMap.sm
  const html = await parseMarkdown(content)

  return (
    <CodeBlockEnhancer>
      <div
        className={cn('prose', sizeClass, className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </CodeBlockEnhancer>
  )
}
