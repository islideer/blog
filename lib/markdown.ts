import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeShiki from '@shikijs/rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import remarkSpoiler from './remark-spoiler'
import rehypeZoomImage from './rehype-zoom-image'
import remarkEmojiPack from './remark-emoji-pack'

/**
 * 统一的 Markdown 解析器（基于 unified）
 *
 * 相比 next-mdx-remote 的优势：
 * 1. 更轻量：不需要 MDX 编译器，纯 Markdown 处理
 * 2. 更快：unified 直接处理，无 JSX 转换开销
 * 3. 更简单：单一处理链，易于理解和维护
 * 4. 缓存友好：可缓存编译结果
 */

/**
 * 短内容处理器（碎碎念、Mio 说）
 * - 启用换行
 * - 无标题锚点
 */
const shortContentProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkBreaks)
  .use(remarkSpoiler)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeShiki, {
    themes: {
      light: 'one-light',
      dark: 'one-dark-pro',
    },
    defaultColor: false,
    cssVariablePrefix: '--shiki-',
  })
  .use(rehypeExternalLinks, {
    target: '_blank',
    rel: ['noopener', 'noreferrer'],
  })
  .use(rehypeStringify)

/**
 * 博客文章处理器
 * - 不启用换行
 * - 有标题锚点
 */
const articleProcessor = unified()
  .use(remarkParse, {})
  .use(remarkGfm)
  .use(remarkSpoiler)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeShiki, {
    themes: {
      light: 'one-light',
      dark: 'one-dark-pro',
    },
    defaultColor: false,
    cssVariablePrefix: '--shiki-',
  })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: 'prepend',
    properties: {
      className: ['heading-anchor'],
      ariaHidden: true,
      tabIndex: -1,
    },
  })
  .use(rehypeZoomImage)
  .use(rehypeExternalLinks, {
    target: '_blank',
    rel: ['noopener', 'noreferrer'],
  })
  .use(rehypeStringify)

// HTML 缓存
const htmlCache = new Map<string, string>()
const MAX_CACHE_SIZE = 500

/**
 * 解析 Markdown 为 HTML
 * 用于碎碎念、Mio 说等短内容（启用换行，无标题锚点）
 */
export async function parseMarkdown(content: string): Promise<string> {
  if (!content || content.trim() === '') {
    return ''
  }

  const cacheKey = `short:${content}`
  const cached = htmlCache.get(cacheKey)
  if (cached) return cached

  const result = await shortContentProcessor.process(content)
  const html = String(result)

  // 缓存管理
  if (htmlCache.size >= MAX_CACHE_SIZE) {
    const firstKey = htmlCache.keys().next().value
    if (firstKey) htmlCache.delete(firstKey)
  }
  htmlCache.set(cacheKey, html)

  return html
}

/**
 * 解析博客文章 Markdown 为 HTML
 * 用于博客文章（不启用换行，有标题锚点）
 */
export async function parseArticle(content: string): Promise<string> {
  if (!content || content.trim() === '') {
    return ''
  }

  const cacheKey = `article:${content}`
  const cached = htmlCache.get(cacheKey)
  if (cached) return cached

  const result = await articleProcessor.process(content)
  const html = String(result)

  // 缓存管理
  if (htmlCache.size >= MAX_CACHE_SIZE) {
    const firstKey = htmlCache.keys().next().value
    if (firstKey) htmlCache.delete(firstKey)
  }
  htmlCache.set(cacheKey, html)

  return html
}

/**
 * 批量解析 Markdown（并行处理）
 */
export async function parseMarkdownBatch(contents: string[]): Promise<string[]> {
  return Promise.all(contents.map((content) => parseMarkdown(content)))
}

/**
 * 留言板内容处理器
 * - 启用换行（remark-breaks）
 * - 剧透语法（remark-spoiler）
 * - 自定义表情包（remark-emoji-pack）
 * - 代码高亮（Shiki）
 * - 安全过滤（rehype-sanitize）
 */
const guestbookProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkBreaks)
  .use(remarkSpoiler)
  .use(remarkEmojiPack)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeShiki, {
    themes: {
      light: 'one-light',
      dark: 'one-dark-pro',
    },
    defaultColor: false,
    cssVariablePrefix: '--shiki-',
  })
  .use(rehypeSanitize, {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      img: [
        ...(defaultSchema.attributes?.img || []),
        ['className', 'emoji', 'spoiler'],
        ['loading', 'lazy'],
      ],
      span: [
        ...(defaultSchema.attributes?.span || []),
        ['className', 'spoiler'],
      ],
    },
    tagNames: [...(defaultSchema.tagNames || []), 'span'],
  })
  .use(rehypeExternalLinks, {
    target: '_blank',
    rel: ['noopener', 'noreferrer'],
  })
  .use(rehypeStringify)

/**
 * 解析留言板 Markdown 为 HTML
 * 用于留言板（启用换行、表情包、剧透、安全过滤）
 */
export async function parseGuestbook(content: string): Promise<string> {
  if (!content || content.trim() === '') {
    return ''
  }

  const cacheKey = `guestbook:${content}`
  const cached = htmlCache.get(cacheKey)
  if (cached) return cached

  const result = await guestbookProcessor.process(content)
  const html = String(result)

  // 缓存管理
  if (htmlCache.size >= MAX_CACHE_SIZE) {
    const firstKey = htmlCache.keys().next().value
    if (firstKey) htmlCache.delete(firstKey)
  }
  htmlCache.set(cacheKey, html)

  return html
}
