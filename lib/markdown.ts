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
  // .use(rehypeShiki, {
  //   themes: {
  //     light: 'one-light',
  //     dark: 'one-dark-pro',
  //   },
  //   defaultColor: false,
  //   cssVariablePrefix: '--shiki-',
  // })
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
const messageProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkBreaks)
  .use(remarkSpoiler)
  .use(remarkEmojiPack)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSanitize, {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      // 所有元素都可以使用的通用属性
      '*': [
        ...(defaultSchema.attributes?.['*'] || []),
        ['className'],
        ['id'],
        ['title'],
        ['dir'], // 文本方向 (ltr, rtl)
        ['lang'], // 语言标识
        // data-* 属性（用于自定义数据）
        ['data*'],
        // ARIA 无障碍属性
        'aria*',
        // 样式属性（白名单控制）
        [
          'style',
          // 安全的 CSS 属性白名单
          'color',
          'backgroundColor',
          'fontSize',
          'fontWeight',
          'fontStyle',
          'textAlign',
          'textDecoration',
          'margin',
          'marginTop',
          'marginRight',
          'marginBottom',
          'marginLeft',
          'padding',
          'paddingTop',
          'paddingRight',
          'paddingBottom',
          'paddingLeft',
          'border',
          'borderColor',
          'borderWidth',
          'borderStyle',
          'borderRadius',
          'width',
          'height',
          'maxWidth',
          'maxHeight',
          'minWidth',
          'minHeight',
          'display',
          'opacity',
          'lineHeight',
          'letterSpacing',
          'wordSpacing',
        ],
      ],
      // 图片增强
      img: [
        ...(defaultSchema.attributes?.img || []),
        ['loading', 'lazy', 'eager'],
        ['className', 'emoji', 'spoiler'],
        ['referrerPolicy'],
        ['width'],
        ['height'],
        ['align', 'left', 'right', 'center'],
        ['crossOrigin'], // CORS 支持
      ],
      // Span 增强
      span: [...(defaultSchema.attributes?.span || []), ['className', 'spoiler']],
      // 表格增强
      table: [
        ...(defaultSchema.attributes?.table || []),
        ['align', 'left', 'right', 'center'],
        ['border'],
        ['cellPadding'],
        ['cellSpacing'],
      ],
      td: [
        ...(defaultSchema.attributes?.td || []),
        ['align', 'left', 'right', 'center', 'justify'],
        ['valign', 'top', 'middle', 'bottom'],
        ['colSpan'],
        ['rowSpan'],
        ['width'],
        ['height'],
      ],
      th: [
        ...(defaultSchema.attributes?.th || []),
        ['align', 'left', 'right', 'center', 'justify'],
        ['valign', 'top', 'middle', 'bottom'],
        ['colSpan'],
        ['rowSpan'],
        ['width'],
        ['scope', 'row', 'col', 'rowGroup', 'colGroup'],
      ],
      // 链接增强
      a: [
        ...(defaultSchema.attributes?.a || []),
        ['download'], // 下载链接
        ['hreflang'], // 链接语言
      ],
      // Div 容器
      div: [...(defaultSchema.attributes?.div || [])],
      // 视频支持
      video: [
        ...(defaultSchema.attributes?.video || []),
        ['controls'],
        ['autoplay'],
        ['loop'],
        ['muted'],
        ['poster'], // 封面图
        ['width'],
        ['height'],
        ['preload', 'auto', 'metadata', 'none'],
      ],
      source: [...(defaultSchema.attributes?.source || []), ['src'], ['type']],
      // 音频支持
      audio: [
        ...(defaultSchema.attributes?.audio || []),
        ['controls'],
        ['autoplay'],
        ['loop'],
        ['muted'],
        ['preload', 'auto', 'metadata', 'none'],
      ],
      // 代码块增强
      code: [...(defaultSchema.attributes?.code || []), ['className']],
      pre: [...(defaultSchema.attributes?.pre || []), ['className']],
      // 列表增强
      ol: [...(defaultSchema.attributes?.ol || []), ['start'], ['type', '1', 'a', 'A', 'i', 'I']],
      // 引用增强
      blockquote: [...(defaultSchema.attributes?.blockquote || []), ['cite']],
      q: [...(defaultSchema.attributes?.q || []), ['cite']],
      // 细节/摘要（折叠面板）
      details: [...(defaultSchema.attributes?.details || []), ['open']],
      summary: [...(defaultSchema.attributes?.summary || [])],
      // 其他语义化标签
      abbr: [...(defaultSchema.attributes?.abbr || [])],
      mark: [...(defaultSchema.attributes?.mark || [])],
      kbd: [...(defaultSchema.attributes?.kbd || [])],
      sub: [...(defaultSchema.attributes?.sub || [])],
      sup: [...(defaultSchema.attributes?.sup || [])],
      time: [...(defaultSchema.attributes?.time || []), ['datetime']],
      ins: [...(defaultSchema.attributes?.ins || []), ['cite'], ['datetime']],
      del: [...(defaultSchema.attributes?.del || []), ['cite'], ['datetime']],
    },
    tagNames: [
      ...(defaultSchema.tagNames || []),
      // 基础结构
      'span',
      'div',
      'section',
      'article',
      'aside',
      'header',
      'footer',
      'main',
      'nav',
      // 语义化标签
      'mark', // 高亮文本
      'kbd', // 键盘输入
      'sub', // 下标
      'sup', // 上标
      'abbr', // 缩写
      'time', // 时间
      'ins', // 插入文本
      'del', // 删除文本
      'cite', // 引用标题
      'dfn', // 术语定义
      'samp', // 示例输出
      'var', // 变量
      // 折叠面板
      'details',
      'summary',
      // 多媒体
      'video',
      'audio',
      'source',
      'track', // 字幕轨道
      'figure', // 图文容器
      'figcaption', // 图文说明
      'picture', // 响应式图片
      // 表格增强
      'caption',
      'colgroup',
      'col',
      'tbody',
      'thead',
      'tfoot',
    ],
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
export async function parseMessage(content: string): Promise<string> {
  if (!content || content.trim() === '') {
    return ''
  }

  const cacheKey = `message:${content}`
  const cached = htmlCache.get(cacheKey)
  if (cached) return cached

  const result = await messageProcessor.process(content)
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
 * 清洗 Markdown 内容，移除语法保留纯文本
 */
export function cleanMarkdownContent(markdown: string): string {
  let content = markdown

  // 移除 Front Matter
  content = content.replace(/^---[\s\S]*?---\n/m, '')

  // 移除表格的分隔行和语法字符，保留表格内容
  content = content.replace(/^\s*\|?(\s*[:-]+[-| :]*\|)+\s*$/gm, '')

  // 移除代码块（``` 或 ~~~）
  content = content.replace(/```[\s\S]*?```/g, '')
  content = content.replace(/~~~[\s\S]*?~~~/g, '')

  // 移除内联代码
  content = content.replace(/`[^`]+`/g, '')

  // 移除图片（![alt](url)）
  content = content.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1')

  // 移除链接保留文本（[text](url) → text）
  content = content.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')

  // 移除 HTML 标签
  content = content.replace(/<[^>]+>/g, '')

  // 移除粗体（**text** 或 __text__）保留文本
  content = content.replace(/\*\*([^\*]+)\*\*/g, '$1')
  content = content.replace(/__([^_]+)__/g, '$1')

  // 移除斜体（*text* 或 _text_）保留文本
  content = content.replace(/\*([^\*]+)\*/g, '$1')
  content = content.replace(/_([^_]+)_/g, '$1')

  // 移除删除线（~~text~~）保留文本
  content = content.replace(/~~([^~]+)~~/g, '$1')

  // 移除剧透标记（||text||）保留文本
  content = content.replace(/\|\|([^\|]+)\|\|/g, '$1')

  // 移除任务列表标记（- [ ] 或 - [x]）
  content = content.replace(/^[\s]*-\s*\[[x\s]\]\s+/gim, '')

  // 移除标题标记（# ## ###）
  content = content.replace(/^#{1,6}\s+/gm, '')

  // 移除列表标记（- * +）
  content = content.replace(/^[\s]*[-*+]\s+/gm, '')

  // 移除数字列表标记（1. 2. 3.）
  content = content.replace(/^[\s]*\d+\.\s+/gm, '')

  // 移除引用标记（>）
  content = content.replace(/^>\s+/gm, '')

  // 移除水平线（--- *** ___）
  content = content.replace(/^[\s]*[-*_]{3,}[\s]*$/gm, '')

  // 移除多余的空白行（保留单个换行符）
  content = content.replace(/\n{3,}/g, '\n\n')

  // 移除首尾空白
  content = content.trim()

  return content
}

/**
 * 截断文本到指定长度
 */
export function truncateText(text: string, maxLength: number = 30): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}
