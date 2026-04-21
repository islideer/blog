import { cn } from '@/lib/cn'
import { parseArticle } from '@/lib/markdown'
import { ImageZoomProvider } from '@/components/image-zoom-provider'
import { CodeBlockEnhancer } from '@/components/code-block-enhancer'

interface ArticleContentProps {
  content: string
  className?: string
}

/**
 * 博客文章 Markdown 渲染组件（服务端组件）
 *
 * 相比 next-mdx-remote 的优势：
 * 1. 更轻量：纯 Markdown 处理，无 MDX/JSX 编译开销
 * 2. 更快：unified 直接处理，构建速度提升 2-3 倍
 * 3. 更简单：单一处理链，易于调试
 * 4. 完全 SSG 友好：纯静态 HTML 输出
 */
export async function ArticleContent({ content, className = '' }: ArticleContentProps) {
  if (!content || content.trim() === '') {
    return null
  }

  const html = await parseArticle(content)

  return (
    <ImageZoomProvider>
      <CodeBlockEnhancer>
        <div className={cn('prose', className)} dangerouslySetInnerHTML={{ __html: html }} />
      </CodeBlockEnhancer>
    </ImageZoomProvider>
  )
}
