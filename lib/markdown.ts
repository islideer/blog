import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkBreaks from 'remark-breaks'
import remarkRehype from 'remark-rehype'
import remarkSpoiler from './remark-spoiler'
import rehypeZoomImage from './rehype-zoom-image'
import rehypeImageCaption from './rehype-image-caption'
import remarkEmojiPack from './remark-emoji-pack'
import rehypeStringify from 'rehype-stringify'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypePrettyCode from 'rehype-pretty-code'
import { stripMarkdown } from './reading-time'

/**
 * 统一的 Markdown 解析器（基于 unified）
 *
 * 相比 next-mdx-remote 的优势：
 * 1. 更轻量：不需要 MDX 编译器，纯 Markdown 处理
 * 2. 更快：unified 直接处理，无 JSX 转换开销
 * 3. 更简单：单一处理链，易于理解和维护
 * 4. 缓存友好：可缓存编译结果
 */
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkBreaks)
  .use(remarkEmojiPack)
  .use(remarkSpoiler)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSanitize, {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      span: [...(defaultSchema.attributes?.span || []), ['className', 'spoiler'], ['title']],
      img: [
        ...(defaultSchema.attributes?.img || []),
        ['loading', 'lazy', 'eager'],
        ['className', 'emoji'],
        ['referrerPolicy'],
        ['width'],
        ['height'],
        ['crossOrigin'],
      ],
      video: [
        ...(defaultSchema.attributes?.video || []),
        ['loading'],
        ['controls'],
        ['src'],
        ['style'],
        ['class'],
        ['poster'],
        ['width'],
        ['height'],
      ],
    },
    tagNames: [...(defaultSchema.tagNames || []), 'video'],
  })
  .use(rehypePrettyCode, {
    keepBackground: false,
    theme: {
      light: 'one-light',
      dark: 'one-dark-pro',
    },
  })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: 'append',
    content: {
      type: 'text',
      value: '#',
    },
    properties: {
      className: ['heading-anchor'],
      ariaHidden: true,
      tabIndex: -1,
    },
  })
  .use(rehypeZoomImage)
  .use(rehypeImageCaption)
  .use(rehypeExternalLinks, {
    target: '_blank',
    rel: ['noopener', 'noreferrer'],
  })
  .use(rehypeStringify)

/**
 * 解析 Markdown 为 HTML
 * 用于碎碎念、Mio 说等短内容（启用换行，无标题锚点）
 */
export async function parseMarkdown(content: string): Promise<string> {
  if (!content || content.trim() === '') {
    return ''
  }

  // const t = content.slice(0, 10).replace(/\s+/g, '_')
  // console.time(`s-${t}`)
  const result = await processor.process(content)
  // console.timeEnd(`s-${t}`)

  return String(result)
}

/**
 * 解析博客文章 Markdown 为 HTML
 * 用于博客文章（不启用换行，有标题锚点）
 */
export async function parseArticle(content: string): Promise<string> {
  if (!content || content.trim() === '') {
    return ''
  }

  // const t = content.slice(0, 10).replace(/\s+/g, '_')
  // console.time(`s-${t}`)
  const result = await processor.process(content)
  // console.timeEnd(`s-${t}`)

  return String(result)
}

/**
 * 批量解析 Markdown（并行处理）
 */
export async function parseMarkdownBatch(contents: string[]): Promise<string[]> {
  return Promise.all(contents.map((content) => parseMarkdown(content)))
}

/**
 * 解析留言板 Markdown 为 HTML
 * 用于留言板（启用换行、表情包、剧透、安全过滤）
 */
export async function parseMessage(content: string): Promise<string> {
  if (!content || content.trim() === '') {
    return ''
  }

  // const t = content.slice(0, 10).replace(/\s+/g, '_')
  // console.time(`s-${t}`)
  const result = await processor.process(content)
  // console.timeEnd(`s-${t}`)

  return String(result)
}

/**
 * 清洗 Markdown 内容，移除语法保留纯文本（适用于 OG title、摘要等展示场景）
 */
export function cleanMarkdownContent(markdown: string): string {
  return stripMarkdown(markdown, { hideCodeBlockContent: true, normalizeWhitespace: true })
}

/**
 * 截断文本到指定长度
 */
export function truncateText(text: string, maxLength: number = 30): string {
  if (text.length <= maxLength) return text
  return Array.from(text).slice(0, maxLength).join('').trim() + '...'
}
