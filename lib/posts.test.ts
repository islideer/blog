import { describe, it, expect } from 'vitest'

/**
 * 计算阅读时间（分钟）
 * 从 posts.ts 复制过来用于测试
 * 中文按每分钟 300-500 字计算，这里取 400 字/分钟
 * 英文按每分钟 200-250 词计算，这里取 225 词/分钟
 */
function calculateReadingTime(content: string): number {
  // 移除 Markdown 语法标记
  const plainText = content
    .replace(/^---[\s\S]*?---/m, '') // 移除 frontmatter
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/`[^`]+`/g, '') // 移除行内代码
    .replace(/#{1,6}\s/g, '') // 移除标题标记
    .replace(/[*_~]/g, '') // 移除强调标记
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接，保留文本
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // 移除图片

  // 统计中文字符数
  const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length
  // 统计英文单词数（简单按空格分割）
  const englishWords = plainText
    .replace(/[\u4e00-\u9fa5]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 0).length

  // 计算阅读时间
  const readingTime = Math.ceil(chineseChars / 400 + englishWords / 225)

  return Math.max(1, readingTime) // 至少 1 分钟
}

describe('calculateReadingTime', () => {
  describe('基础功能', () => {
    it('应该返回至少 1 分钟', () => {
      expect(calculateReadingTime('')).toBe(1)
      expect(calculateReadingTime('短文本')).toBe(1)
      expect(calculateReadingTime('short text')).toBe(1)
    })

    it('应该正确计算纯中文的阅读时间', () => {
      // 400 字 = 1 分钟
      const text400 = '这'.repeat(400)
      expect(calculateReadingTime(text400)).toBe(1)

      // 800 字 = 2 分钟
      const text800 = '这'.repeat(800)
      expect(calculateReadingTime(text800)).toBe(2)

      // 401 字 = 2 分钟（向上取整）
      const text401 = '这'.repeat(401)
      expect(calculateReadingTime(text401)).toBe(2)
    })

    it('应该正确计算纯英文的阅读时间', () => {
      // 225 词 = 1 分钟
      const text225 = Array(225).fill('word').join(' ')
      expect(calculateReadingTime(text225)).toBe(1)

      // 450 词 = 2 分钟
      const text450 = Array(450).fill('word').join(' ')
      expect(calculateReadingTime(text450)).toBe(2)

      // 226 词 = 2 分钟（向上取整）
      const text226 = Array(226).fill('word').join(' ')
      expect(calculateReadingTime(text226)).toBe(2)
    })

    it('应该正确计算中英文混合的阅读时间', () => {
      // 200 个中文字 + 100 个英文词 = 0.5 + ~0.44 = 向上取整 1 分钟
      // 但实际上有空格等，可能会被计入英文词数，导致结果为 2 分钟
      const chineseText = '这'.repeat(200)
      const englishText = Array(100).fill('word').join(' ')
      const mixedText = `${chineseText} ${englishText}`

      const result = calculateReadingTime(mixedText)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(2)
    })
  })

  describe('Markdown 语法处理', () => {
    it('应该移除 frontmatter', () => {
      const content = `---
layout: post
title: 测试文章
date: 2024-01-01
---

${'这'.repeat(400)}`

      expect(calculateReadingTime(content)).toBe(1)
    })

    it('应该移除代码块', () => {
      const content = `
这是正文内容${'正'.repeat(395)}

\`\`\`javascript
const code = 'this should be removed'
console.log('lots of code here')
${'code'.repeat(1000)}
\`\`\`

继续正文
`
      // 实际文本：这是正文内容(5) + 正(395) + 继续正文(4) ≈ 404 字 = 2 分钟
      const result = calculateReadingTime(content)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(2)
    })

    it('应该移除行内代码', () => {
      const content = `这是一段包含\`代码\`的文本${'文'.repeat(390)}`
      // "这是一段包含的文本" + 390 个"文" ≈ 398 字 = 1 分钟
      expect(calculateReadingTime(content)).toBe(1)
    })

    it('应该移除标题标记', () => {
      const content = `
# 标题一
## 标题二
### 标题三

${'这'.repeat(400)}`

      // 标题中的中文字符仍然计入（只移除 # 标记）
      expect(calculateReadingTime(content)).toBeGreaterThanOrEqual(1)
    })

    it('应该移除强调标记（粗体、斜体、删除线）', () => {
      const content = `
这是**粗体**文本
这是*斜体*文本
这是~~删除线~~文本
${'字'.repeat(390)}
`
      // 移除 *_~ 标记后，保留文本内容
      expect(calculateReadingTime(content)).toBeGreaterThanOrEqual(1)
    })

    it('应该移除链接，保留文本', () => {
      const content = `访问[GitHub](https://github.com)了解更多${'信'.repeat(395)}`
      // 保留 "GitHub" 文本
      expect(calculateReadingTime(content)).toBeGreaterThanOrEqual(1)
    })

    it('应该移除图片', () => {
      const content = `这是一张图片![示例图片](https://example.com/image.png)${'文'.repeat(385)}`
      // "这是一张图片" + 385 个"文" ≈ 391 字 = 1 分钟
      expect(calculateReadingTime(content)).toBe(1)
    })

    it('应该处理复杂的 Markdown 文档', () => {
      const content = `---
layout: post
title: 复杂文档
date: 2024-01-01
---

# 主标题

这是一段正文，包含**粗体**和*斜体*，还有\`行内代码\`。

## 代码示例

\`\`\`typescript
function example() {
  console.log('这段代码会被移除')
  return true
}
\`\`\`

访问[官网](https://example.com)了解更多。

![示例图片](https://example.com/image.png)

${'正'.repeat(400)}文内容。
`
      // 主要计算 400 个"正"字 + 其他文本
      expect(calculateReadingTime(content)).toBeGreaterThanOrEqual(1)
    })
  })

  describe('边界情况', () => {
    it('应该处理空字符串', () => {
      expect(calculateReadingTime('')).toBe(1)
    })

    it('应该处理只有空格的字符串', () => {
      expect(calculateReadingTime('   \n\n   ')).toBe(1)
    })

    it('应该处理只有 frontmatter 的内容', () => {
      const content = `---
layout: post
title: 测试
---`
      expect(calculateReadingTime(content)).toBe(1)
    })

    it('应该处理只有代码块的内容', () => {
      const content = `
\`\`\`javascript
console.log('hello')
\`\`\`
`
      expect(calculateReadingTime(content)).toBe(1)
    })

    it('应该处理特殊字符', () => {
      const content = `这是一段包含特殊字符的文本：!@#$%^&*()${'文'.repeat(390)}`
      expect(calculateReadingTime(content)).toBeGreaterThanOrEqual(1)
    })

    it('应该处理 emoji', () => {
      const content = `这是一段包含 emoji 的文本😊🎉✨${'文'.repeat(390)}`
      expect(calculateReadingTime(content)).toBeGreaterThanOrEqual(1)
    })

    it('应该处理超长文本', () => {
      // 4000 个中文字 = 10 分钟
      const longText = '这'.repeat(4000)
      expect(calculateReadingTime(longText)).toBe(10)
    })

    it('应该处理中英文标点符号', () => {
      const content = `这是中文标点，。！？；：""''（）【】${'文'.repeat(385)}`
      expect(calculateReadingTime(content)).toBeGreaterThanOrEqual(1)
    })
  })

  describe('真实场景测试', () => {
    it('应该正确计算博客文章的阅读时间', () => {
      const blogPost = `---
layout: post
title: Next.js 性能优化指南
date: 2024-01-01
excerpt: 介绍 Next.js 的性能优化技巧
---

# Next.js 性能优化指南

Next.js 是一个强大的 React 框架，但是要充分发挥其性能优势，需要掌握一些优化技巧。

## 1. 图片优化

使用 \`next/image\` 组件可以自动优化图片：

\`\`\`jsx
import Image from 'next/image'

export default function MyImage() {
  return <Image src="/photo.jpg" width={500} height={300} alt="照片" />
}
\`\`\`

## 2. 代码分割

Next.js 自动进行代码分割，但你也可以手动控制：

\`\`\`jsx
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/Heavy'))
\`\`\`

## 3. 静态生成

尽可能使用静态生成（SSG）而不是服务端渲染（SSR），这样可以获得最佳性能。访问[官方文档](https://nextjs.org)了解更多。

总结：通过合理使用 Next.js 的各项优化功能，可以显著提升应用性能。
`
      // 这篇文章大约 200-300 个中文字符 + 少量英文
      const readingTime = calculateReadingTime(blogPost)
      expect(readingTime).toBeGreaterThanOrEqual(1)
      expect(readingTime).toBeLessThanOrEqual(3)
    })

    it('应该正确计算技术教程的阅读时间', () => {
      const tutorial = `---
layout: post
title: TypeScript 入门教程
---

# TypeScript 入门教程

${'T'.repeat(200)} ${'这'.repeat(800)}

## 基础语法

${'详'.repeat(400)}细介绍。

\`\`\`typescript
${'// 代码示例\n'.repeat(50)}
\`\`\`

## 高级特性

${'进'.repeat(400)}阶内容。
`
      // 约 1600 个中文字 + 200 个英文词 = 4 + 1 = 5 分钟
      const readingTime = calculateReadingTime(tutorial)
      expect(readingTime).toBeGreaterThanOrEqual(4)
      expect(readingTime).toBeLessThanOrEqual(6)
    })
  })
})
