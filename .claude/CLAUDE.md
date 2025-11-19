# Claude Code 开发指导

这是一个基于 Next.js 16 + React 19 + Tailwind CSS v4 构建的现代化博客项目。

## 核心原则

1. **现代化优先** - 只支持现代浏览器，大胆使用最新 Web 标准
2. **性能至上** - 静态生成，追求极致性能
3. **实验性** - 作为新技术的实验场
4. **简洁性** - 代码风格简洁，易于阅读

## 技术栈

- **Next.js 16** - App Router + 静态导出
- **React 19** - Server Components + 新 Hooks
- **Tailwind CSS v4** - CSS-first 配置
- **TypeScript 5.7+** - 类型安全
- **MDX** - 增强的 Markdown
- **pnpm 10.20.0+** - 包管理器
- **dayjs** - 时间处理库

## 代码风格规范

### 文件命名

- 组件文件必须使用 `kebab-case`
  - ✅ `header.tsx`, `footer.tsx`, `view-transitions-demo.tsx`
  - ❌ `Header.tsx`, `Footer.tsx`, `ViewTransitionsDemo.tsx`

### Prettier 配置

```json
{
  "semi": false, // 不使用分号
  "singleQuote": true, // 单引号
  "trailingComma": "all", // 所有地方添加尾随逗号
  "tabWidth": 2, // 2空格缩进
  "printWidth": 100 // 100字符行宽
}
```

### 代码示例

```typescript
// ✅ 正确
import { useState } from 'react'

export function MyComponent({ name }: { name: string }) {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount((c) => c + 1)
  }

  return (
    <div className="flex items-center gap-4">
      <span>{name}</span>
      <button onClick={handleClick}>{count}</button>
    </div>
  )
}
```

## 项目结构

```
blog/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页
│   ├── blog/                # 博客页面
│   │   ├── page.tsx         # 文章列表
│   │   └── [slug]/page.tsx  # 文章详情
│   ├── experiments/         # 实验区
│   │   ├── view-transitions/
│   │   ├── react-19-features/
│   │   └── modern-css/
│   └── about/               # 关于页面
├── components/              # 组件 (kebab-case)
│   ├── header.tsx
│   └── footer.tsx
├── content/                 # 内容目录
│   └── posts/               # MDX 文章
├── lib/                     # 工具库
│   └── posts.ts             # 文章处理逻辑
└── .claude/                 # Claude Code 配置
    ├── CODE_STYLE.md        # 详细代码风格指南
    └── CLAUDE.md            # 本文件
```

## 开发工作流

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev  # 使用 Turbopack，极速热更新
```

### 构建

```bash
pnpm build  # 静态导出到 out/ 目录
```

### 类型检查

```bash
pnpm type-check
```

## Next.js 约定

### Server Components (默认)

```typescript
// app/page.tsx - Server Component
export default function Page() {
  return <div>Server Component</div>
}
```

### Client Components (需要交互时)

```typescript
// components/counter.tsx
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>
}
```

### 元数据

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '页面标题',
  description: '页面描述',
}
```

### 动态路由

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  return [{ slug: 'post-1' }, { slug: 'post-2' }]
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <div>{slug}</div>
}
```

## Tailwind CSS v4 约定

### CSS 文件

```css
/* app/globals.css */
@import 'tailwindcss';
@plugin '@tailwindcss/typography';

@theme {
  --color-primary: oklch(0.6 0.2 200);
}
```

### 不需要配置文件

Tailwind v4 使用 CSS-first 配置，不需要 `tailwind.config.ts`

## MDX 文章格式

```yaml
---
title: 文章标题
date: 2025-11-06
excerpt: 文章摘要
tags:
  - React
  - TypeScript
author: 作者名
---
# 文章内容

这里是 MDX 内容，可以使用 React 组件。
```

## 常见任务

### 添加新文章

1. 在 `content/posts/` 创建新的 `.mdx` 文件
2. 添加 Front matter 元数据
3. 编写 Markdown 内容
4. 构建后会自动生成静态页面

### 添加新实验

1. 在 `app/experiments/` 创建新目录
2. 添加 `page.tsx` 文件
3. 在 `app/experiments/page.tsx` 中添加链接
4. 如需交互，创建 client component

### 修改样式

1. 全局样式：编辑 `app/globals.css`
2. 组件样式：使用 Tailwind 类名
3. 自定义主题：在 `globals.css` 中使用 `@theme`

## React 19 特性

### use() Hook

```typescript
import { use } from 'react'

function Component({ dataPromise }) {
  const data = use(dataPromise)
  return <div>{data}</div>
}
```

### useOptimistic()

```typescript
import { useOptimistic } from 'react'

function Component({ items }) {
  const [optimisticItems, addOptimistic] = useOptimistic(
    items,
    (state, newItem) => [...state, newItem]
  )
  return <ul>{optimisticItems.map(...)}</ul>
}
```

## 现代 Web 特性

### View Transitions

```typescript
'use client'

function handleClick() {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      // 更新 DOM
    })
  }
}
```

### Container Queries

```css
.container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .child {
    font-size: 1.5rem;
  }
}
```

### :has() 选择器

```css
.card:has(img) {
  display: grid;
}
```

## 调试技巧

### TypeScript 错误

- 运行 `pnpm type-check` 查看类型错误
- 使用 VSCode 的 TypeScript 插件

### 构建错误

- 检查 MDX Front matter 格式
- 确保所有文件名符合 kebab-case 规范
- 检查 import 路径是否正确

### 样式问题

- 检查 Tailwind 类名是否正确
- 使用浏览器开发工具检查 CSS
- 确认 `globals.css` 中的 `@import "tailwindcss"` 存在

## 最佳实践

1. **优先使用 Server Components** - 除非需要交互
2. **使用 TypeScript** - 所有文件使用 `.tsx` 扩展名
3. **遵循 Prettier 规范** - 提交前格式化代码
4. **kebab-case 文件名** - 所有组件文件
5. **单引号、无分号、尾随逗号** - 代码风格
6. **使用 dayjs** - 时间处理
7. **现代 CSS** - 使用最新特性
8. **实验新特性** - 大胆尝试新 Web 标准

## 参考资源

- [Next.js 16 文档](https://nextjs.org/docs)
- [React 19 文档](https://react.dev)
- [Tailwind CSS v4 文档](https://tailwindcss.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [Can I Use](https://caniuse.com) - 检查浏览器支持

## 注意事项

- ⚠️ 不支持旧版浏览器
- ⚠️ 组件文件必须使用 kebab-case
- ⚠️ 必须使用 pnpm 作为包管理器
- ⚠️ 严格遵循 Prettier 配置
- ⚠️ 使用 dayjs 处理时间，不使用其他库
