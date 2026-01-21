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
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * 高亮文本部分类型
 */
export interface HighlightPart {
  type: 'text' | 'mark'
  text: string
  key: number
}

/**
 * 高亮关键词
 */
export function highlightKeywords(text: string, keywords: string[]): HighlightPart[] {
  if (!keywords.length || !text) return [{ type: 'text', text, key: 0 }]

  // 过滤空关键词并转义特殊字符
  const validKeywords = keywords
    .filter((k) => k.trim().length > 0)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

  if (!validKeywords.length) return [{ type: 'text', text, key: 0 }]

  try {
    // 创建正则表达式匹配所有关键词（不区分大小写）
    const regex = new RegExp(`(${validKeywords.join('|')})`, 'gi')

    // 分割文本
    const parts = text.split(regex)

    // 返回高亮部分数组
    return parts.map((part, i) => {
      // 检查是否匹配关键词（不区分大小写）
      const isKeyword = validKeywords.some(
        (k) => k.toLowerCase() === part.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      )

      if (isKeyword && part) {
        return {
          type: 'mark' as const,
          key: i,
          text: part,
        }
      }

      return {
        type: 'text' as const,
        key: i,
        text: part,
      }
    })
  } catch (error) {
    // 正则表达式错误，返回原文本
    console.error('highlightKeywords error:', error)
    return [{ type: 'text', text, key: 0 }]
  }
}

/**
 * 提取搜索关键词（分词）
 */
export function extractKeywords(query: string): string[] {
  // 移除多余空白并分割
  const keywords = query
    .trim()
    .split(/\s+/)
    .filter((k) => k.length > 0)

  // 去重
  return Array.from(new Set(keywords))
}

/**
 * 格式化日期为相对时间
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return '现在'
  if (diffDays === 1) return '昨天'
  if (diffDays < 7) return `${diffDays} 天前`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} 周前`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} 个月前`
  return `${Math.floor(diffDays / 365)} 年前`
}

/**
 * 从文本中提取包含关键词的片段
 * @param text 完整文本
 * @param keywords 关键词数组
 * @param maxLength 片段最大长度
 * @returns 包含关键词的文本片段
 */
export function extractMatchingSnippet(
  text: string,
  keywords: string[],
  maxLength: number = 150,
): string {
  if (!text || !keywords.length) return text.slice(0, maxLength)

  // 过滤空关键词
  const validKeywords = keywords.filter((k) => k.trim().length > 0)
  if (!validKeywords.length) return text.slice(0, maxLength)

  // 查找第一个匹配的关键词位置
  let firstMatchIndex = -1

  for (const keyword of validKeywords) {
    const index = text.toLowerCase().indexOf(keyword.toLowerCase())
    if (index !== -1 && (firstMatchIndex === -1 || index < firstMatchIndex)) {
      firstMatchIndex = index
    }
  }

  // 如果没有找到匹配，返回开头
  if (firstMatchIndex === -1) {
    return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '')
  }

  // 计算片段的起始和结束位置，让关键词尽量居中
  const halfLength = Math.floor(maxLength / 2)
  let startIndex = Math.max(0, firstMatchIndex - halfLength)
  const endIndex = Math.min(text.length, startIndex + maxLength)

  // 如果结束位置到达文本末尾，调整起始位置
  if (endIndex === text.length) {
    startIndex = Math.max(0, endIndex - maxLength)
  }

  // 提取片段
  let snippet = text.slice(startIndex, endIndex)

  // 添加省略号
  if (startIndex > 0) snippet = '...' + snippet
  if (endIndex < text.length) snippet = snippet + '...'

  return snippet
}
