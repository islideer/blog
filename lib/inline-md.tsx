import type { ReactNode } from 'react'

/**
 * 渲染 Markdown 内容为 React 元素
 * 支持：
 * - 链接：[文字](链接)
 * - 粗体：**文字** 或 __文字__
 * - 斜体：*文字* 或 _文字_
 * - 行内代码：`代码`
 * - 删除线：~~文字~~
 * - 换行符：\n
 */
export function renderMarkdown(text: string): ReactNode[] {
  const lines = text.split('\n')
  const elements: ReactNode[] = []

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      elements.push(<br key={`br-${lineIndex}`} />)
    }

    if (!line.trim()) {
      return
    }

    const lineElements = parseInlineMarkdown(line, lineIndex)
    elements.push(...lineElements)
  })

  return elements
}

/**
 * 解析行内 Markdown 语法
 */
function parseInlineMarkdown(text: string, lineIndex: number): ReactNode[] {
  const elements: ReactNode[] = []
  let remaining = text
  let keyIndex = 0

  while (remaining) {
    // 链接：[文字](链接)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      elements.push(
        <a
          key={`${lineIndex}-${keyIndex++}`}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-primary underline underline-offset-2"
        >
          {linkMatch[1]}
        </a>,
      )
      remaining = remaining.slice(linkMatch[0].length)
      continue
    }

    // 粗体：**文字** 或 __文字__
    const boldMatch = remaining.match(/^(\*\*|__)(.+?)\1/)
    if (boldMatch) {
      elements.push(
        <strong key={`${lineIndex}-${keyIndex++}`} className="font-semibold">
          {boldMatch[2]}
        </strong>,
      )
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }

    // 斜体：*文字* 或 _文字_ (但不匹配粗体)
    const italicMatch = remaining.match(/^(\*|_)(.+?)\1(?!\1)/)
    if (italicMatch) {
      elements.push(
        <em key={`${lineIndex}-${keyIndex++}`} className="italic">
          {italicMatch[2]}
        </em>,
      )
      remaining = remaining.slice(italicMatch[0].length)
      continue
    }

    // 行内代码：`代码`
    const codeMatch = remaining.match(/^`([^`]+)`/)
    if (codeMatch) {
      elements.push(
        <code key={`${lineIndex}-${keyIndex++}`} className="inline-code">
          {codeMatch[1]}
        </code>,
      )
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }

    // 删除线：~~文字~~
    const strikeMatch = remaining.match(/^~~(.+?)~~/)
    if (strikeMatch) {
      elements.push(
        <del key={`${lineIndex}-${keyIndex++}`} className="line-through opacity-70">
          {strikeMatch[1]}
        </del>,
      )
      remaining = remaining.slice(strikeMatch[0].length)
      continue
    }

    // 普通文本
    const nextSpecialChar = remaining.search(/[[*_`~]/)
    const textLength = nextSpecialChar === -1 ? remaining.length : nextSpecialChar
    if (textLength > 0) {
      elements.push(
        <span key={`${lineIndex}-${keyIndex++}`}>{remaining.slice(0, textLength)}</span>,
      )
      remaining = remaining.slice(textLength)
      continue
    }

    // 如果没有匹配到任何规则，输出当前字符并继续
    elements.push(<span key={`${lineIndex}-${keyIndex++}`}>{remaining[0]}</span>)
    remaining = remaining.slice(1)
  }

  return elements
}
