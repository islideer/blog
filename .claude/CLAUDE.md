# Claude Code 开发指导

Viki 的个人博客，基于 Next.js 16 + React 19 + Tailwind CSS v4 构建的现代化博客。

## 核心原则

1. **现代化优先** - 只支持现代浏览器，大胆使用最新 Web 标准
2. **性能至上** - 混合渲染（静态生成 + 动态 API）
3. **内容为王** - 专注于写作和内容展示
4. **简洁优雅** - 代码简洁，易读易维护

## 技术栈

- **Next.js 16** - App Router + 混合渲染
- **React 19** - Server Components + React Compiler
- **Tailwind CSS v4** - CSS-first 配置，OKLCH 色彩
- **TypeScript 5.9+** - 类型安全
- **unified** - Markdown 处理（remark + rehype + Shiki）
- **pnpm 10.25.0** - 包管理器
- **dayjs** - 时间处理
- **vitest** - 单元测试

## 项目特点

- **混合渲染** - 文章静态生成，OG 图片、RSS 等使用动态 API
- **纯 Markdown** - 使用 `.md` 文件 + unified 生态，不是 MDX
- **按年份组织** - `posts/{年份}/` 目录结构（2019-2025）
- **数据驱动** - 大事记、碎碎念、Mio 说等数据存储在 `data/` 目录的 JSON 文件

### 页面结构

- **首页** - 文章列表
- **文章详情** - `/[slug]` 动态路由
- **文章归档** - `/posts` 按年份分组
- **大事记** - `/timeline` 重要时刻
- **碎碎念** - `/thoughts` 生活随笔
- **Mio 说** - `/mio-says` Mio 专属空间
- **关于** - `/about` 个人介绍

## 代码风格

### 中文排版（盘古之白）

1. **中文标点** - 使用 `，。！？` 而非 `,. !?`
2. **中英混排空格** - `使用 React 开发` 而非 `使用React开发`
3. **中数混排空格** - `距今已 365 天` 而非 `距今已365天`

### 命名规范

- **组件文件** - `kebab-case`（如 `theme-toggle.tsx`）
- **导出组件** - `PascalCase`（如 `export function ThemeToggle`）

### Prettier 配置

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 100
}
```

## 项目结构

```
blog/
├── app/                            # Next.js App Router
│   ├── [slug]/
│   │   ├── page.tsx                # 文章详情页
│   │   └── opengraph-image.tsx     # 文章 OG 图片
│   ├── page.tsx                    # 首页
│   ├── opengraph-image.tsx         # 首页 OG 图片
│   ├── posts/page.tsx              # 文章归档
│   ├── timeline/page.tsx           # 大事记
│   ├── thoughts/page.tsx           # 碎碎念
│   ├── mio-says/page.tsx           # Mio 说
│   ├── about/page.tsx              # 关于
│   └── rss/route.ts                # RSS Feed
├── components/                 # React 组件（kebab-case）
│   ├── icons/                  # SVG 图标组件
│   │   ├── moon.tsx            # 月亮图标
│   │   ├── sun.tsx             # 太阳图标
│   │   ├── github.tsx          # GitHub 图标
│   │   └── ...                 # 其他图标
│   ├── icon-link.tsx           # 图标链接包装器
│   ├── article-content.tsx     # 文章渲染（服务端）
│   ├── article-images.tsx      # 图片缩放（客户端）
│   ├── markdown-lite.tsx       # 简版 Markdown（服务端）
│   ├── og-image-template.tsx   # OG 图片模板
│   ├── thought-card.tsx        # 碎碎念卡片
│   ├── theme-toggle.tsx        # 主题切换
│   └── ...                     # 其他组件
├── lib/                      # 工具库
│   ├── config.ts             # 站点配置
│   ├── data.ts               # 数据加载（JSON）
│   ├── posts.ts              # 文章处理
│   ├── markdown.ts           # Markdown 解析（unified）
│   ├── dayjs.ts              # 时间处理
│   └── ...                   # 其他工具
├── posts/                    # 文章目录（.md）
│   └── {年份}/               # 按年份组织
├── data/                     # 数据文件（JSON）
├── assets/
│   └── fonts/                # 字体文件（OG 图片用）
└── public/                   # 静态资源
```

## 开发命令

```bash
pnpm dev          # 开发模式（Turbopack）
pnpm build        # 构建生产版本
pnpm type-check   # TypeScript 类型检查
pnpm format       # 代码格式化
pnpm test         # 运行单元测试
```

## Markdown 处理

使用 **unified 生态系统**（不是 MDX）处理 Markdown：

### 核心 API

```typescript
// lib/markdown.ts
parseMarkdown() // 短内容（碎碎念、Mio 说）：启用换行
parseArticle() // 博客文章：标题锚点、代码高亮
```

### 渲染组件

```typescript
// 文章内容（服务端组件）
import { ArticleContent } from '@/components/article-content'
<ArticleContent content={post.content} />

// 短内容（服务端组件）
import { MarkdownLite } from '@/components/markdown-lite'
<MarkdownLite content={thought.content} />
```

## Next.js 关键模式

### Server Components（默认）

```typescript
// 服务端组件，可以直接使用异步函数
export default async function Page() {
  const posts = await getAllPosts()
  return <div>{/* ... */}</div>
}
```

### Client Components（需要交互）

```typescript
'use client'
import { useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  return <button onClick={() => setTheme('dark')}>切换</button>
}
```

### 静态路由生成

```typescript
// app/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  return <article>{/* ... */}</article>
}
```

## Tailwind CSS v4

Tailwind v4 使用 **CSS-first 配置**，不需要 `tailwind.config.ts`：

```css
/* app/globals.css */
@import 'tailwindcss';
@plugin '@tailwindcss/typography';

/* CSS 变量定义主题 */
:root {
  --color-text: oklch(0.08 0 0);
}
.dark {
  --color-text: oklch(0.98 0 0);
}
```

## Markdown 文章格式

```markdown
---
layout: 'post'
title: 文章标题
date: 2024-07-04
excerpt: 文章摘要
---

# 文章内容

正文内容...
```

**Front Matter 必填字段**：`layout`、`title`、`date`、`excerpt`

## 常见任务

### 添加新文章

```bash
# 创建文件
posts/2025/my-new-post.md

# 添加 Front Matter
---
layout: 'post'
title: 我的新文章
date: 2025-12-15
excerpt: 简短描述
---

# 编写内容
```

### 修改站点配置

编辑 `lib/config.ts` 或 `data/site.json`

### 修改样式

- 全局样式：`app/globals.css`
- 组件样式：Tailwind 类名
- 主题色彩：CSS 变量（OKLCH）

### 添加组件

```bash
# 创建组件（kebab-case）
components/my-component.tsx
```

需要交互时添加 `'use client'`

## SVG 图标规范

### 图标组织

- **统一管理** - 所有 SVG 图标集中在 `components/icons/` 目录
- **独立组件** - 每个图标一个文件，使用 `kebab-case` 命名（如 `moon.tsx`）
- **类型安全** - 每个图标组件都有 TypeScript 类型定义
- **灵活复用** - 支持 `className` 传递，便于自定义样式

### 创建新图标

```typescript
// components/icons/example.tsx
interface ExampleIconProps {
  className?: string
}

export function ExampleIcon({ className }: ExampleIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="..." />
    </svg>
  )
}
```

### 使用图标

```typescript
// 在其他组件中使用
import { MoonIcon } from './icons/moon'

export function Component() {
  return <MoonIcon className="h-4 w-4 text-gray-500" />
}
```

### 高级封装

对于带链接的图标，使用 `icon-link.tsx` 包装器：

```typescript
import { IconLink } from './icon-link'
import { GitHubIcon } from './icons/github'

export function SocialLink({ href }: { href: string }) {
  return (
    <IconLink
      href={href}
      tooltip="GitHub"
      icon={<GitHubIcon className="h-4 w-4" />}
    />
  )
}
```

### 规则

- ✅ 新图标必须放在 `components/icons/` 目录
- ✅ 不要在组件内定义内联 SVG，除非只用一次
- ✅ 图标组件必须支持 `className` 属性
- ✅ 使用 `currentColor` 实现主题适配
- ❌ 不要在图标组件内硬编码尺寸和颜色

## 最佳实践

- ✅ 优先使用 Server Components
- ✅ 遵循 kebab-case 文件命名
- ✅ 遵循盘古之白排版规范
- ✅ 使用 `import { dayjs } from '@/lib/dayjs'` 处理时间
- ✅ Front Matter 必须包含 `title`、`date`、`excerpt` 字段
- ✅ SVG 图标统一管理在 `components/icons/`
- ⚠️ 不使用 MDX，使用纯 Markdown + unified
- ⚠️ 不使用 next-mdx-remote
- ⚠️ 必须使用 pnpm 10.25.0

## 特殊功能

- **OG 图片** - 每个页面使用 `opengraph-image.tsx` 静态生成社交分享图
  - 文章页：显示标题、日期、阅读时间、摘要
  - 首页：显示统计数据（文章数、碎碎念数等）
  - 使用 `@vercel/og` + 自定义字体（Source Han Sans SC）
  - 构建时静态生成（`force-static`）
- **RSS Feed** - `app/rss/route.ts` 动态生成订阅源
- **旧文章提示** - `components/old-post-banner.tsx` 超过 365 天显示横幅
- **数据驱动** - 大事记、碎碎念、Mio 说数据存储在 `data/` 目录的 JSON 文件

## 部署

Vercel 自动部署，连接 GitHub 仓库即可。

## 参考资源

- [Next.js 16 文档](https://nextjs.org/docs)
- [React 19 文档](https://react.dev)
- [Tailwind CSS v4 文档](https://tailwindcss.com)
- [unified 文档](https://unifiedjs.com/)
- [盘古之白](https://github.com/vinta/pangu.js)
