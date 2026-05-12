import { describe, expect, it } from 'vitest'
import { calculateReadingTime, stripMarkdown } from './reading-time'

describe('stripMarkdown', () => {
  describe('frontmatter', () => {
    it('移除 frontmatter', () => {
      const md = `---
title: Test
date: 2024-01-01
---

This is content`
      expect(stripMarkdown(md).trim()).toBe('This is content')
    })

    it('正文含 --- 分割线时不误删 frontmatter 之后的内容', () => {
      const md = `---
title: Test
---

Intro

---

Body after divider`
      const result = stripMarkdown(md)
      expect(result).toContain('Intro')
      expect(result).toContain('Body after divider')
    })

    it('无 frontmatter 时正文 --- 分割线不被当作 frontmatter 消费', () => {
      const md = `# Title

Content before

---

Content after`
      const result = stripMarkdown(md)
      expect(result).toContain('Content before')
      expect(result).toContain('Content after')
    })

    it('frontmatter 不在文件开头时不匹配', () => {
      const md = `Some text

---
title: fake
---

More text`
      const result = stripMarkdown(md)
      // 不是真正的 frontmatter，内容应该保留
      expect(result).toContain('Some text')
      expect(result).toContain('More text')
    })
  })

  describe('fenced 代码块：保留内容，移除标记', () => {
    it('三反引号代码块：移除标记，保留代码内容', () => {
      const md = `Some text

\`\`\`js
const foo = 'bar'
\`\`\`

More text`
      const result = stripMarkdown(md)
      expect(result).toContain('Some text')
      expect(result).toContain("const foo = 'bar'")
      expect(result).toContain('More text')
      expect(result).not.toContain('```')
    })

    it('四反引号代码块正确匹配闭合', () => {
      const md = `\`\`\`\`ts
type Foo = string
\`\`\`\`

text`
      const result = stripMarkdown(md)
      expect(result).toContain('type Foo = string')
      expect(result).not.toContain('````')
    })

    it('无语言标记的代码块', () => {
      const md = `\`\`\`
plain code
\`\`\``
      const result = stripMarkdown(md)
      expect(result).toContain('plain code')
      expect(result).not.toContain('```')
    })

    it('空代码块', () => {
      const md = `\`\`\`js
\`\`\``
      // 内容为空，标记应被移除
      expect(stripMarkdown(md)).not.toContain('```')
    })

    it('未闭合的代码块保留原样（不误消费后续内容）', () => {
      const md = `\`\`\`js
const x = 1

More content here`
      const result = stripMarkdown(md)
      // 未闭合，正则不匹配，反引号保留，但后续内容不丢失
      expect(result).toContain('More content here')
    })

    it('代码块内容含 --- 时，--- 会被水平分割线 step 移除（记录行为）', () => {
      const md = `\`\`\`
---
key: value
---
\`\`\`

text`
      const result = stripMarkdown(md)
      expect(result).toContain('key: value')
      expect(result).toContain('text')
    })

    it('多个代码块各自独立处理', () => {
      const md = `\`\`\`js
const a = 1
\`\`\`

middle

\`\`\`py
x = 2
\`\`\``
      const result = stripMarkdown(md)
      expect(result).toContain('const a = 1')
      expect(result).toContain('middle')
      expect(result).toContain('x = 2')
      expect(result).not.toContain('```')
    })
  })

  describe('行内代码：保留内容，移除标记', () => {
    it('移除反引号标记，保留内容', () => {
      expect(stripMarkdown('Use `console.log()` to debug')).toBe('Use console.log() to debug')
      expect(stripMarkdown('The `npm install` command')).toBe('The npm install command')
    })

    it('行内代码含 markdown 特殊字符时，内容在后续 step 可能被进一步处理（记录行为）', () => {
      // `_foo_` → _foo_ → foo（italic step 继续处理）
      const result = stripMarkdown('Use `_foo_` here')
      expect(result).toContain('foo')
      expect(result).not.toContain('`')
    })

    it('行内代码在 fenced block 内部时，fenced step 先处理，inline step 再处理剩余', () => {
      const md = `\`\`\`js
const x = \`template\`
\`\`\`

outside \`inline\``
      const result = stripMarkdown(md)
      // fenced block 内容保留（去掉 ``` 标记后，里面的反引号由 inline step 处理）
      expect(result).toContain('const x =')
      expect(result).toContain('template')
      // outside inline code 内容保留
      expect(result).toContain('inline')
      expect(result).not.toContain('```')
    })
  })

  describe('标题', () => {
    it('移除 # 标记', () => {
      expect(stripMarkdown('# Heading 1')).toBe('Heading 1')
      expect(stripMarkdown('## Heading 2')).toBe('Heading 2')
      expect(stripMarkdown('###### Heading 6')).toBe('Heading 6')
    })
  })

  describe('强调', () => {
    it('移除加粗、斜体、删除线标记', () => {
      expect(stripMarkdown('**bold text**')).toBe('bold text')
      expect(stripMarkdown('*italic text*')).toBe('italic text')
      expect(stripMarkdown('_italic text_')).toBe('italic text')
      expect(stripMarkdown('~~strikethrough~~')).toBe('strikethrough')
    })
  })

  describe('链接与图片', () => {
    it('移除链接标记，保留文本', () => {
      expect(stripMarkdown('[Google](https://google.com)')).toBe('Google')
      expect(stripMarkdown('Visit [our site](https://example.com) here')).toBe(
        'Visit our site here',
      )
    })

    it('移除图片（含 alt 文本）', () => {
      expect(stripMarkdown('![Alt text](image.jpg)')).toBe('[图片]')
      expect(stripMarkdown('Text ![image](pic.png) more')).toBe('Text [图片] more')
    })
  })

  describe('引用与列表', () => {
    it('移除引用标记', () => {
      expect(stripMarkdown('> This is a quote')).toBe('This is a quote')
      expect(stripMarkdown('> Quote line 1\n> Quote line 2')).toBe('Quote line 1\nQuote line 2')
    })

    it('移除无序列表标记', () => {
      const result = stripMarkdown('- Item 1\n* Item 2\n+ Item 3')
      expect(result).toContain('Item 1')
      expect(result).toContain('Item 2')
      expect(result).toContain('Item 3')
      expect(result).not.toMatch(/^[-*+] /m)
    })

    it('移除有序列表标记', () => {
      const result = stripMarkdown('1. First\n2. Second')
      expect(result).toContain('First')
      expect(result).toContain('Second')
      expect(result).not.toContain('1. ')
    })
  })

  describe('水平分割线', () => {
    it('移除 --- *** ___ 分割线', () => {
      expect(stripMarkdown('Text\n---\nMore text')).toBe('Text\n\nMore text')
      expect(stripMarkdown('Text\n***\nMore text')).toBe('Text\n\nMore text')
      expect(stripMarkdown('Text\n___\nMore text')).toBe('Text\n\nMore text')
    })
  })

  describe('~~~ 代码块', () => {
    it('保留内容，移除 ~~~ 标记', () => {
      const md = `~~~py\nprint("hello")\n~~~`
      const result = stripMarkdown(md)
      expect(result).toContain('print("hello")')
      expect(result).not.toContain('~~~')
    })

    it('hideCodeBlockContent: true 时替换为 [代码块]', () => {
      const md = `~~~py\nprint("hello")\n~~~`
      const result = stripMarkdown(md, { hideCodeBlockContent: true })
      expect(result).toBe('[代码块]')
    })

    it('四个 ~ 正确匹配闭合', () => {
      const md = `~~~~\ncode\n~~~~`
      expect(stripMarkdown(md)).toContain('code')
      expect(stripMarkdown(md)).not.toContain('~~~~')
    })
  })

  describe('剧透标记 ||text||', () => {
    it('移除标记，保留文本', () => {
      expect(stripMarkdown('||spoiler||')).toBe('spoiler')
      expect(stripMarkdown('这是 ||剧透内容|| 请勿剧透')).toBe('这是 剧透内容 请勿剧透')
    })

    it('多个剧透标记', () => {
      expect(stripMarkdown('||A|| and ||B||')).toBe('A and B')
    })
  })

  describe('任务列表', () => {
    it('移除 - [ ] 和 - [x] 前缀，保留文本', () => {
      expect(stripMarkdown('- [ ] 未完成')).toBe('未完成')
      expect(stripMarkdown('- [x] 已完成')).toBe('已完成')
    })

    it('任务列表在无序列表之前处理（不留 [x]）', () => {
      const result = stripMarkdown('- [x] Done\n- [ ] Todo')
      expect(result).toContain('Done')
      expect(result).toContain('Todo')
      expect(result).not.toContain('[x]')
      expect(result).not.toContain('[ ]')
      expect(result).not.toContain('- ')
    })
  })

  describe('表格分隔行', () => {
    it('移除 | --- | 分隔行，保留表格内容行', () => {
      const md = `| A | B |\n| --- | --- |\n| 1 | 2 |`
      const result = stripMarkdown(md)
      expect(result).toContain('A')
      expect(result).toContain('1')
      expect(result).not.toMatch(/\| ?-/)
    })

    it('对齐语法 :--- :---: ---: 均移除', () => {
      const md = `| :--- | :---: | ---: |\n| val |`
      const result = stripMarkdown(md)
      expect(result).not.toMatch(/:-+/)
    })
  })

  describe('HTML 标签', () => {
    it('移除 HTML 标签', () => {
      expect(stripMarkdown('<div>Hello</div>')).toBe('Hello')
      expect(stripMarkdown('Text <span>with</span> tags')).toBe('Text with tags')
    })
  })

  describe('复杂混合场景', () => {
    it('混合 Markdown 语法 — 代码内容保留', () => {
      const md = `# Title

This is **bold** and *italic* text.

- Item 1
- Item 2

\`\`\`js
console.log('hello')
\`\`\`

[Link](url) and ![image](pic.jpg)`

      const result = stripMarkdown(md)
      expect(result).toContain('Title')
      expect(result).toContain('bold')
      expect(result).toContain('italic')
      expect(result).toContain('Item 1')
      // 代码内容现在保留
      expect(result).toContain('console.log')
      expect(result).not.toContain('**')
      expect(result).not.toContain('```')
    })

    it('中文 Markdown — 代码内容保留', () => {
      const md = `# 标题

这是**加粗**和*斜体*文本。

- 列表项 1

\`\`\`js
const foo = 'bar'
\`\`\``

      const result = stripMarkdown(md)
      expect(result).toContain('标题')
      expect(result).toContain('加粗')
      // 代码内容现在保留
      expect(result).toContain('const foo')
      expect(result).not.toContain('**')
      expect(result).not.toContain('```')
    })
  })

  describe('options', () => {
    describe('hideCodeBlockContent', () => {
      it('默认 false：保留代码内容', () => {
        const md = `\`\`\`js\nconst x = 1\n\`\`\``
        expect(stripMarkdown(md)).toContain('const x = 1')
      })

      it('true：代码块替换为 [代码块]，行内代码内容仍保留', () => {
        const md = `\`\`\`js\nconst x = 1\n\`\`\`\n\nUse \`console.log\` here`
        const result = stripMarkdown(md, { hideCodeBlockContent: true })
        expect(result).toContain('[代码块]')
        expect(result).not.toContain('const x = 1')
        // 行内代码内容保留
        expect(result).toContain('console.log')
      })

      it('true：~~~ 块同样替换', () => {
        const md = `~~~py\nprint(1)\n~~~`
        expect(stripMarkdown(md, { hideCodeBlockContent: true })).toBe('[代码块]')
      })
    })

    describe('normalizeWhitespace', () => {
      it('默认 false：保留多余空行和首尾空白', () => {
        const md = `\n\n\nfoo\n\n\nbar\n\n\n`
        const result = stripMarkdown(md)
        expect(result).toMatch(/\n{3,}/)
      })

      it('true：三个以上换行压缩为两个，首尾 trim', () => {
        const md = `\n\n\nfoo\n\n\n\nbar\n\n\n`
        const result = stripMarkdown(md, { normalizeWhitespace: true })
        expect(result).toBe('foo\n\nbar')
        expect(result).not.toMatch(/\n{3,}/)
      })

      it('hideCodeBlockContent + normalizeWhitespace 同时生效', () => {
        const md = `\n\n\`\`\`js\ncode\n\`\`\`\n\n\n\ntext\n\n`
        const result = stripMarkdown(md, { hideCodeBlockContent: true, normalizeWhitespace: true })
        expect(result).toBe('[代码块]\n\ntext')
      })
    })
  })
})

describe('calculateReadingTime', () => {
  describe('基本功能', () => {
    it('返回至少 1 分钟', () => {
      expect(calculateReadingTime('')).toBe(1)
      expect(calculateReadingTime('短文')).toBe(1)
      expect(calculateReadingTime('Short text')).toBe(1)
    })

    it('处理 null 和 undefined', () => {
      expect(calculateReadingTime(null as never)).toBe(1)
      expect(calculateReadingTime(undefined as never)).toBe(1)
    })
  })

  describe('纯中文内容', () => {
    it('短中文文章向上取整为 1 分钟', () => {
      const text = '这是一篇测试文章。'.repeat(20) // ~200 字
      expect(calculateReadingTime(text)).toBe(1)
    })

    it('中等长度中文文章约 2 分钟', () => {
      const text = '这是一篇测试文章，包含一些内容。'.repeat(50) // ~800 字
      expect(calculateReadingTime(text)).toBe(2)
    })

    it('长中文文章约 4 分钟', () => {
      const text = '这是一篇较长的测试文章，包含很多内容和细节。'.repeat(100) // ~2000 字
      expect(calculateReadingTime(text)).toBe(4)
    })
  })

  describe('纯英文内容', () => {
    it('短英文文章至少 1 分钟', () => {
      const text = 'This is a test article with some content. '.repeat(10)
      expect(calculateReadingTime(text)).toBe(1)
    })

    it('长英文文章 2~3 分钟', () => {
      const text = 'This is a longer test article with lots of content and details. '.repeat(80)
      const minutes = calculateReadingTime(text)
      expect(minutes).toBeGreaterThanOrEqual(2)
      expect(minutes).toBeLessThanOrEqual(3)
    })
  })

  describe('Markdown 内容', () => {
    it('代码块内容计入阅读时间（仅移除标记）', () => {
      const withCode = `这是正文。\n\n\`\`\`js\nconst a = 1\n\`\`\`\n\n这是更多正文。`
      const withoutCode = `这是正文。\n\n这是更多正文。`
      // 有代码内容的版本阅读时间 >= 无代码版本
      expect(calculateReadingTime(withCode)).toBeGreaterThanOrEqual(calculateReadingTime(withoutCode))
    })

    it('忽略 frontmatter', () => {
      const md =
        `---
title: Test Article
date: 2024-01-01
tags: [test]
---

这是文章的实际内容。` + '这是文章的实际内容。'.repeat(100)

      const minutes = calculateReadingTime(md)
      expect(minutes).toBeGreaterThan(1)
    })

    it('移除 Markdown 语法后统计字数', () => {
      const md = `
# 文章标题

这是**加粗文本**和*斜体文本*。

- 列表项 1
- 列表项 2

访问 [我的网站](https://example.com) 了解更多。

\`\`\`js
console.log('代码')
\`\`\`
      `.repeat(10)

      const minutes = calculateReadingTime(md)
      expect(minutes).toBeGreaterThanOrEqual(1)
    })
  })

  describe('边界情况', () => {
    it('只有空白字符', () => {
      expect(calculateReadingTime('   \n\n\t\t  ')).toBe(1)
    })

    it('只含 Markdown 语法标记无实际文本', () => {
      expect(calculateReadingTime('# \n## \n### ')).toBe(1)
    })

    it('非常长的文章', () => {
      const text = '这是一篇非常长的文章。'.repeat(1000) // ~10000 字
      const minutes = calculateReadingTime(text)
      expect(minutes).toBeGreaterThan(15)
      expect(minutes).toBeLessThan(20)
    })
  })

  describe('真实场景', () => {
    it('技术博客文章', () => {
      const article = `
# 使用 React 19 构建现代应用

React 19 引入了许多新特性，包括 use() Hook 和 useOptimistic() Hook。

## 新特性介绍

### use() Hook

use() Hook 允许我们在组件中直接使用 Promise。

\`\`\`tsx
function Component() {
  const data = use(fetchData())
  return <div>{data}</div>
}
\`\`\`

### useOptimistic() Hook

useOptimistic() Hook 用于乐观更新。

## 总结

React 19 带来了很多改进，让我们能够更好地构建现代化的 Web 应用。
      `.repeat(5)

      const minutes = calculateReadingTime(article)
      expect(minutes).toBeGreaterThanOrEqual(1)
      expect(minutes).toBeLessThan(15)
    })

    it('生活随笔', () => {
      const article = `
今天是个好天气，阳光明媚，微风轻拂。

我决定出门散步，走在熟悉的街道上，看着路边的树木随风摇曳。

路过公园时，看到很多人在锻炼身体，有的在跑步，有的在打太极，还有的在遛狗。

这让我想起了小时候的时光，那时候每天放学后都会和小伙伴们在公园里玩耍。

时光荏苒，如今我们都长大了，各自有了自己的生活。
      `.repeat(10)

      const minutes = calculateReadingTime(article)
      expect(minutes).toBeGreaterThan(2)
      expect(minutes).toBeLessThan(10)
    })
  })
})
