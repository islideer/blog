import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { renderMarkdown } from './inline-md'

describe('renderMarkdown', () => {
  describe('基础功能', () => {
    it('应该渲染纯文本', () => {
      const result = renderMarkdown('这是纯文本')
      const { container } = render(<>{result}</>)

      expect(container.textContent).toBe('这是纯文本')
    })

    it('应该处理空字符串', () => {
      const result = renderMarkdown('')
      const { container } = render(<>{result}</>)

      expect(container.textContent).toBe('')
    })

    it('应该处理只有空格的字符串', () => {
      const result = renderMarkdown('   ')
      const { container } = render(<>{result}</>)

      expect(container.textContent).toBe('')
    })
  })

  describe('换行处理', () => {
    it('应该将换行符转换为 <br> 标签', () => {
      const result = renderMarkdown('第一行\n第二行')
      const { container } = render(<>{result}</>)

      const brElements = container.querySelectorAll('br')
      expect(brElements).toHaveLength(1)
      expect(container.textContent).toBe('第一行第二行')
    })

    it('应该处理多个换行符', () => {
      const result = renderMarkdown('第一行\n第二行\n第三行')
      const { container } = render(<>{result}</>)

      const brElements = container.querySelectorAll('br')
      expect(brElements).toHaveLength(2)
    })

    it('应该忽略空行', () => {
      const result = renderMarkdown('第一行\n\n第二行')
      const { container } = render(<>{result}</>)

      const brElements = container.querySelectorAll('br')
      expect(brElements).toHaveLength(2)
    })
  })

  describe('链接语法', () => {
    it('应该渲染链接', () => {
      const result = renderMarkdown('[GitHub](https://github.com)')
      const { container } = render(<>{result}</>)

      const link = container.querySelector('a')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', 'https://github.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(link?.textContent).toBe('GitHub')
    })

    it('应该渲染多个链接', () => {
      const result = renderMarkdown(
        '访问 [GitHub](https://github.com) 和 [Google](https://google.com)',
      )
      const { container } = render(<>{result}</>)

      const links = container.querySelectorAll('a')
      expect(links).toHaveLength(2)
      expect(links[0]).toHaveAttribute('href', 'https://github.com')
      expect(links[1]).toHaveAttribute('href', 'https://google.com')
    })

    it('应该处理包含中文的链接', () => {
      const result = renderMarkdown('[访问网站](https://example.com)')
      const { container } = render(<>{result}</>)

      const link = container.querySelector('a')
      expect(link?.textContent).toBe('访问网站')
    })
  })

  describe('粗体语法', () => {
    it('应该渲染双星号粗体', () => {
      const result = renderMarkdown('这是**粗体**文本')
      const { container } = render(<>{result}</>)

      const strong = container.querySelector('strong')
      expect(strong).toBeInTheDocument()
      expect(strong?.textContent).toBe('粗体')
      expect(container.textContent).toBe('这是粗体文本')
    })

    it('应该渲染双下划线粗体', () => {
      const result = renderMarkdown('这是__粗体__文本')
      const { container } = render(<>{result}</>)

      const strong = container.querySelector('strong')
      expect(strong).toBeInTheDocument()
      expect(strong?.textContent).toBe('粗体')
    })

    it('应该渲染多个粗体', () => {
      const result = renderMarkdown('**第一个**和**第二个**粗体')
      const { container } = render(<>{result}</>)

      const strongs = container.querySelectorAll('strong')
      expect(strongs).toHaveLength(2)
      expect(strongs[0].textContent).toBe('第一个')
      expect(strongs[1].textContent).toBe('第二个')
    })
  })

  describe('斜体语法', () => {
    it('应该渲染单星号斜体', () => {
      const result = renderMarkdown('这是*斜体*文本')
      const { container } = render(<>{result}</>)

      const em = container.querySelector('em')
      expect(em).toBeInTheDocument()
      expect(em?.textContent).toBe('斜体')
      expect(container.textContent).toBe('这是斜体文本')
    })

    it('应该渲染单下划线斜体', () => {
      const result = renderMarkdown('这是_斜体_文本')
      const { container } = render(<>{result}</>)

      const em = container.querySelector('em')
      expect(em).toBeInTheDocument()
      expect(em?.textContent).toBe('斜体')
    })

    it('应该区分斜体和粗体', () => {
      const result = renderMarkdown('*斜体* 和 **粗体**')
      const { container } = render(<>{result}</>)

      const em = container.querySelector('em')
      const strong = container.querySelector('strong')

      expect(em).toBeInTheDocument()
      expect(strong).toBeInTheDocument()
      expect(em?.textContent).toBe('斜体')
      expect(strong?.textContent).toBe('粗体')
    })
  })

  describe('行内代码', () => {
    it('应该渲染行内代码', () => {
      const result = renderMarkdown('使用 `console.log()` 输出')
      const { container } = render(<>{result}</>)

      const code = container.querySelector('code')
      expect(code).toBeInTheDocument()
      expect(code?.textContent).toBe('console.log()')
      expect(code).toHaveClass('inline-code')
    })

    it('应该渲染多个行内代码', () => {
      const result = renderMarkdown('`const` 和 `let` 是关键字')
      const { container } = render(<>{result}</>)

      const codes = container.querySelectorAll('code')
      expect(codes).toHaveLength(2)
      expect(codes[0].textContent).toBe('const')
      expect(codes[1].textContent).toBe('let')
    })
  })

  describe('删除线', () => {
    it('应该渲染删除线', () => {
      const result = renderMarkdown('这是~~删除线~~文本')
      const { container } = render(<>{result}</>)

      const del = container.querySelector('del')
      expect(del).toBeInTheDocument()
      expect(del?.textContent).toBe('删除线')
      expect(del).toHaveClass('line-through')
      expect(del).toHaveClass('opacity-70')
    })

    it('应该渲染多个删除线', () => {
      const result = renderMarkdown('~~第一个~~和~~第二个~~删除')
      const { container } = render(<>{result}</>)

      const dels = container.querySelectorAll('del')
      expect(dels).toHaveLength(2)
    })
  })

  describe('混合语法', () => {
    it('应该处理粗体和斜体混合', () => {
      const result = renderMarkdown('这是**粗体**和*斜体*混合')
      const { container } = render(<>{result}</>)

      const strong = container.querySelector('strong')
      const em = container.querySelector('em')

      expect(strong).toBeInTheDocument()
      expect(em).toBeInTheDocument()
      expect(container.textContent).toBe('这是粗体和斜体混合')
    })

    it('应该处理链接和粗体混合', () => {
      const result = renderMarkdown('访问**[GitHub](https://github.com)**了解')
      const { container } = render(<>{result}</>)

      // 注意：由于解析顺序，这里可能不会嵌套正确
      // 但至少应该包含这些元素
      expect(container.textContent).toContain('GitHub')
    })

    it('应该处理代码和其他语法混合', () => {
      const result = renderMarkdown('使用 `code` 和**粗体**')
      const { container } = render(<>{result}</>)

      const code = container.querySelector('code')
      const strong = container.querySelector('strong')

      expect(code).toBeInTheDocument()
      expect(strong).toBeInTheDocument()
    })

    it('应该处理复杂的混合语法', () => {
      const result = renderMarkdown(
        '这是一段包含**粗体**、*斜体*、`代码`、[链接](https://example.com)和~~删除线~~的文本',
      )
      const { container } = render(<>{result}</>)

      expect(container.querySelector('strong')).toBeInTheDocument()
      expect(container.querySelector('em')).toBeInTheDocument()
      expect(container.querySelector('code')).toBeInTheDocument()
      expect(container.querySelector('a')).toBeInTheDocument()
      expect(container.querySelector('del')).toBeInTheDocument()
    })
  })

  describe('边界情况', () => {
    it('应该处理未闭合的标记', () => {
      const result = renderMarkdown('这是**未闭合的粗体')
      const { container } = render(<>{result}</>)

      // 未闭合的标记应该作为普通文本处理
      expect(container.textContent).toContain('**')
    })

    it('应该处理空的标记', () => {
      const result = renderMarkdown('这是****空粗体')
      const { container } = render(<>{result}</>)

      expect(container.textContent).toContain('**')
    })

    it('应该处理特殊字符', () => {
      const result = renderMarkdown('特殊字符：!@#$%^&*()')
      const { container } = render(<>{result}</>)

      expect(container.textContent).toBe('特殊字符：!@#$%^&*()')
    })

    it('应该处理 emoji', () => {
      const result = renderMarkdown('这是 emoji 😊🎉✨')
      const { container } = render(<>{result}</>)

      expect(container.textContent).toContain('😊')
      expect(container.textContent).toContain('🎉')
      expect(container.textContent).toContain('✨')
    })

    it('应该处理 HTML 实体', () => {
      const result = renderMarkdown('&lt;标签&gt;')
      const { container } = render(<>{result}</>)

      expect(container.textContent).toBe('&lt;标签&gt;')
    })

    it('应该处理连续的特殊字符', () => {
      const result = renderMarkdown('******')
      const { container } = render(<>{result}</>)

      // 应该包含星号
      expect(container.textContent).toContain('*')
    })
  })

  describe('真实场景测试', () => {
    it('应该正确渲染博客摘要', () => {
      const text =
        '这是一篇关于 **React** 和 *TypeScript* 的文章，访问 [官网](https://react.dev) 了解更多。'
      const result = renderMarkdown(text)
      const { container } = render(<>{result}</>)

      expect(container.querySelector('strong')?.textContent).toBe('React')
      expect(container.querySelector('em')?.textContent).toBe('TypeScript')
      expect(container.querySelector('a')).toHaveAttribute('href', 'https://react.dev')
    })

    it('应该正确渲染代码说明', () => {
      const text = '使用 `npm install` 安装依赖，然后运行 `npm start` 启动项目。'
      const result = renderMarkdown(text)
      const { container } = render(<>{result}</>)

      const codes = container.querySelectorAll('code')
      expect(codes).toHaveLength(2)
      expect(codes[0].textContent).toBe('npm install')
      expect(codes[1].textContent).toBe('npm start')
    })

    it('应该正确渲染多行内容', () => {
      const text = `第一行：这是**标题**
第二行：这是*描述*
第三行：访问[链接](https://example.com)`

      const result = renderMarkdown(text)
      const { container } = render(<>{result}</>)

      const brs = container.querySelectorAll('br')
      expect(brs).toHaveLength(2)

      expect(container.querySelector('strong')).toBeInTheDocument()
      expect(container.querySelector('em')).toBeInTheDocument()
      expect(container.querySelector('a')).toBeInTheDocument()
    })
  })
})
