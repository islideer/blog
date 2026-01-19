# Claude Code 开发指导

Viki 的个人博客，基于 Next.js 16 + React 19 + Tailwind CSS v4 构建的现代化博客。

## 核心原则

1. **现代化优先** - 只支持现代浏览器，大胆使用最新 Web 标准
2. **性能至上** - 混合渲染（静态生成 + 动态 API）
3. **内容为王** - 专注于写作和内容展示
4. **简洁优雅** - 代码简洁，易读易维护

## 技术栈

### 核心框架
- **Next.js 16.1.1** - App Router + 混合渲染（SSG + ISR）
- **React 19.3.0** - Server Components + React Compiler
- **TypeScript 5.9.3** - 完整类型安全

### 样式与主题
- **Tailwind CSS v4.1.18** - CSS-first 配置，OKLCH 色彩空间
- **next-themes 0.4.6** - 主题管理（亮色/暗色/系统）

### Markdown 处理（unified 生态）
- **remark 15.0.1** + **remark-gfm 4.0.1** - Markdown 解析
- **remark-breaks 4.0.0** - 换行符处理（短内容）
- **rehype-slug 6.0.0** + **rehype-autolink-headings 7.1.0** - 标题锚点
- **@shikijs/rehype 3.21.0** - 双主题代码高亮（one-light / one-dark-pro）
- **rehype-raw 7.0.0** - 原生 HTML 支持
- **rehype-external-links 3.0.0** - 外部链接处理
- 自定义插件：`remark-spoiler`（剧透语法）、`rehype-zoom-image`（图片缩放）

### 工具库
- **gray-matter 4.0.3** - Front Matter 解析
- **dayjs 1.11.19** - 时间处理（相对时间、中文本地化）
- **@vercel/og 0.8.6** - 动态 OG 图片生成
- **feed 5.1.0** - RSS Feed 生成
- **medium-zoom 1.1.0** - 图片缩放
- **pangu 7.2.0** - 盘古之白排版

### 开发工具
- **pnpm 10.25.0** - 包管理器
- **vitest** - 单元测试
- **prettier** - 代码格式化（无分号、单引号、尾随逗号）

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
- **工具函数** - `camelCase`（如 `calculateReadingTime`、`formatDate`）
- **常量** - `SCREAMING_SNAKE_CASE`（如 `MAX_CACHE_SIZE`）

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

### 类名管理

优先使用 `cn` 工具函数（`lib/cn.ts`）合并 Tailwind 类名，不要用模板字符串拼接。

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

### 双处理器设计

**短内容处理器**（碎碎念、Mio 说）：
- 启用 `remark-breaks` - 单个换行符即换行
- 剧透语法支持 `||spoiler text||`
- 代码高亮（Shiki 双主题）

**文章处理器**（博客文章）：
- 自动生成标题 ID（`rehype-slug`）
- 标题锚点链接（`rehype-autolink-headings`）
- 图片缩放标记（`rehype-zoom-image`）
- 外部链接自动添加 `target="_blank"` 和 `rel`

### Shiki 双主题配置

```typescript
.use(rehypeShiki, {
  themes: {
    light: 'one-light',
    dark: 'one-dark-pro',
  },
  defaultColor: false,           // 不设置默认背景
  cssVariablePrefix: '--shiki-', // CSS 变量前缀
})
```

CSS 自动切换：
```css
/* 亮色模式 */
.prose pre span { color: var(--shiki-light); }

/* 暗色模式 */
html.dark .prose pre span { color: var(--shiki-dark); }
```

### LRU 缓存机制

```typescript
const htmlCache = new Map<string, string>()
const MAX_CACHE_SIZE = 500  // 最多缓存 500 条

// 自动清理最旧的缓存项
if (htmlCache.size >= MAX_CACHE_SIZE) {
  const firstKey = htmlCache.keys().next().value
  if (firstKey) htmlCache.delete(firstKey)
}
```

### 自定义插件

- **remark-spoiler** - 将 `||text||` 转换为 `<span class="spoiler">text</span>`
- **rehype-zoom-image** - 为图片添加 `data-zoomable` 属性

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
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

// 防止 hydration mismatch 的空订阅
const emptySubscribe = () => () => {}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  // 防止 hydration 不匹配
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,   // 客户端返回 true
    () => false,  // 服务端返回 false
  )

  if (!mounted) return null

  const handleToggle = () => {
    // 主题循环：light → dark → system → light
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    setTheme(nextTheme)
  }

  return <button onClick={handleToggle}>{/* ... */}</button>
}
```

**关键技术：**
- `useSyncExternalStore` - 防止服务端/客户端渲染不一致
- `next-themes` - 自动管理主题，同步到 localStorage 和 `<html>` 类名

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
posts/2026/my-new-post.md

# 添加 Front Matter
---
layout: 'post'
title: 我的新文章
date: 2026-02-15
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
- ✅ **使用 `cn` 工具函数处理类名合并，不使用模板字符串拼接**
- ✅ 使用 `import { dayjs } from '@/lib/dayjs'` 处理时间
- ✅ Front Matter 必须包含 `title`、`date`、`excerpt` 字段
- ✅ SVG 图标统一管理在 `components/icons/`
- ⚠️ 不使用 MDX，使用纯 Markdown + unified
- ⚠️ 不使用 next-mdx-remote
- ⚠️ 必须使用 pnpm 10.25.0

## 特殊功能

### OG 图片动态生成

每个页面使用 `opengraph-image.tsx` 生成社交分享图：

```typescript
// app/[slug]/opengraph-image.tsx
export const size = { width: 1200, height: 630 }
export const dynamic = 'force-static'  // 构建时预生成

export default async function Image({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  const fontData = await readFile('assets/fonts/SourceHanSansSC-Regular.otf')

  return new ImageResponse(
    <OgImageTemplate title={post.title} />,
    { ...size, fonts: [{ name: 'Noto Sans SC', data: fontData }] }
  )
}
```

**特点：**
- 文章页：显示标题、日期、阅读时间、摘要
- 首页：显示统计数据（文章数、碎碎念数等）
- 使用 `@vercel/og` + 自定义字体（思源黑体）
- `force-static` 在构建时预生成，性能最优

### RSS Feed 动态生成

```typescript
// app/rss/route.ts
export async function GET() {
  const posts = await getAllPosts()
  const feed = new Feed({ /* ... */ })

  posts.slice(0, 20).forEach((post) => {
    feed.addItem({ /* ... */ })
  })

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',  // 1 小时缓存
    },
  })
}
```

### 智能推荐算法

多维度加权评分系统（`lib/posts.ts`）

**算法特点：**
- **Jaccard 相似系数** - 标签集合交并比
- **时间衰减函数** - 指数型衰减（365 天为半衰期）
- **确定性随机** - 同一 slug 生成的推荐始终一致（有利于缓存）

### 其他功能

- **旧文章提示** - `components/old-post-banner.tsx` 超过 365 天显示横幅
- **数据驱动** - 大事记、碎碎念、Mio 说数据存储在 `data/` 目录的 JSON 文件
- **图片缩放** - 基于 `react-medium-image-zoom` 的原生图片缩放
- **SEO Schema** - JSON-LD 格式的 BlogPosting 和 BreadcrumbList 结构化数据
- **阅读时间计算** - 混合中英文阅读速度（400 字/分钟）

## 性能优化策略

### 渲染策略

- **静态生成（SSG）** - 文章页面在构建时预生成
- **增量静态生成（ISR）** - RSS Feed 使用 1 小时缓存
- **Server Components** - 大部分组件使用服务端渲染，减少 JavaScript
- **Client Components** - 仅交互组件使用客户端渲染（主题切换、图片缩放）

### 缓存机制

- **HTML 缓存** - LRU 缓存最多 500 条 Markdown 处理结果
- **构建时预生成** - OG 图片在构建时全部生成（`force-static`）
- **CDN 缓存** - RSS Feed、静态资源使用 CDN 缓存

### 网络优化

```typescript
// app/layout.tsx - 预连接关键域名
<link rel="preconnect" href="https://i.loli.net" />
<link rel="dns-prefetch" href="https://i.loli.net" />
<link rel="preconnect" href="https://avatar.viki.moe" />
```

### 图片优化

- **Next.js Image 组件** - 自动响应式图片、懒加载
- **优先加载** - 关键图片使用 `priority` 属性
