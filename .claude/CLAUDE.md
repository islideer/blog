# Claude Code 开发指导

这是 Viki 的个人博客，基于 Next.js 16 + React 19 + Tailwind CSS v4 构建的现代化博客项目。

## 核心原则

1. **现代化优先** - 只支持现代浏览器，大胆使用最新 Web 标准
2. **性能至上** - 混合渲染（静态生成 + 动态 API），追求极致性能
3. **内容为王** - 专注于写作和内容展示
4. **简洁性** - 代码风格简洁，易于阅读和维护

## 技术栈

- **Next.js 16** - App Router + 混合渲染
- **React 19** - Server Components + React Compiler
- **Tailwind CSS v4** - CSS-first 配置，OKLCH 色彩
- **TypeScript 5.9+** - 类型安全
- **Markdown** - 文章格式（.md 文件）
- **pnpm 10.22.0+** - 包管理器
- **dayjs** - 时间处理库

## 项目特点

### 渲染模式

- **静态生成** - 文章页面、列表页面静态生成
- **动态 API** - OG 图片、RSS Feed 等动态路由
- **不使用 `output: 'export'`** - 支持混合模式，保留 API Routes

### 内容组织

- **文章目录** - `posts/` 按年份组织（2019-2025）
- **Markdown 格式** - 使用 `.md` 文件，不是 MDX
- **Front Matter** - 包含 layout、title、date、excerpt 等字段
- **多页面** - 首页、文章页、大事记、碎碎念、Mio 说、关于
- **碎碎念** - 记录生活中的点滴想法（小时级别更新）
- **Mio 说** - 专门开设给 Mio 的专属发言空间（小时级别更新，Viki 无权编辑）

## 代码风格规范

### 中文排版规范（盘古之白）

**所有中文内容必须遵循以下排版规则：**

1. **中文标点符号**
   - ✅ 使用中文标点：`，。！？；：「」【】`
   - ❌ 不使用英文标点：`,. !? ;: "" []`

2. **盘古之白（中英文混排空格）**
   - ✅ 中文与英文之间加空格：`使用 React 开发`
   - ✅ 中文与数字之间加空格：`距今已 365 天`
   - ✅ 中文与链接之间加空格：`访问 [GitHub](url) 了解更多`
   - ❌ 不加空格：`使用React开发`、`距今已365天`

3. **示例对比**

   ```typescript
   // ❌ 错误
   本文发布于 2025 年 1 月 1 日,距今已 100 天,请注意。

   // ✅ 正确
   本文发布于 2025 年 1 月 1 日，距今已 100 天，请注意。
   ```

### 文件命名

- 组件文件必须使用 `kebab-case`
  - ✅ `theme-toggle.tsx`, `about-intro.tsx`, `old-post-banner.tsx`
  - ❌ `ThemeToggle.tsx`, `AboutIntro.tsx`, `OldPostBanner.tsx`

### Prettier 配置

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
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
├── app/                          # Next.js App Router
│   ├── [slug]/page.tsx           # 文章详情页（动态路由）
│   ├── page.tsx                  # 首页（文章列表）
│   ├── layout.tsx                # 根布局
│   ├── not-found.tsx             # 404 页面
│   ├── posts/page.tsx            # 文章页面（按年份分组）
│   ├── timeline/page.tsx         # 大事记页面
│   ├── thoughts/page.tsx         # 碎碎念页面
│   ├── mio-says/page.tsx         # Mio 说页面
│   ├── about/page.tsx            # 关于页面
│   ├── api/og/route.tsx          # OG 图片生成 API
│   ├── globals.css               # 全局样式
│   ├── sitemap.ts                # 动态 Sitemap
│   ├── robots.ts                 # Robots.txt
│   ├── rss/route.ts              # RSS Feed
│   └── manifest.ts               # PWA Manifest
├── components/                   # React 组件（kebab-case）
│   ├── theme-toggle.tsx          # 主题切换组件
│   ├── google-analytics.tsx      # Google Analytics 组件
│   ├── about-intro.tsx           # 关于页面简介
│   ├── about-contact.tsx         # 关于页面联系方式
│   ├── about-tech-stack.tsx      # 关于页面技术栈
│   ├── about-open-source.tsx     # 关于页面开源项目
│   ├── timeline-view.tsx         # 大事记视图
│   └── old-post-banner.tsx       # 旧文章提示横幅
├── lib/                          # 工具库
│   ├── config.ts                 # 站点配置
│   ├── pages.ts                  # 页面元数据配置
│   ├── about.ts                  # 关于页面数据
│   ├── posts.ts                  # 文章处理逻辑
│   ├── thoughts.ts               # 碎碎念数据
│   ├── mio-says.ts               # Mio 说数据
│   ├── timeline.ts               # 大事记数据
│   ├── seo.ts                    # SEO 工具函数
│   ├── mdx.ts                    # MDX 配置
│   └── markdown-utils.tsx        # Markdown 处理工具
├── posts/                        # 文章内容（.md）
│   ├── 2019/                     # 按年份组织
│   ├── 2020/
│   ├── 2021/
│   ├── 2022/
│   ├── 2023/
│   ├── 2024/
│   └── 2025/
├── data/                         # 数据文件
├── public/                       # 静态资源
│   ├── favicon.ico
│   └── apple-icon.png
└── .claude/                      # Claude Code 配置
    └── CLAUDE.md                 # 本文件
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
pnpm build  # 混合渲染，静态页面 + 动态 API
```

### 类型检查

```bash
pnpm type-check
```

### 代码格式化

```bash
pnpm format
```

## Next.js 约定

### Server Components（默认）

```typescript
// app/page.tsx - Server Component
export default async function Page() {
  const posts = await getAllPosts()
  return <div>{/* 渲染文章列表 */}</div>
}
```

### Client Components（需要交互时）

```typescript
// components/theme-toggle.tsx
'use client'

import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // 主题切换逻辑
  }, [theme])

  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>切换主题</button>
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
// app/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  return <article>{/* 渲染文章 */}</article>
}
```

## Tailwind CSS v4 约定

### CSS 文件

```css
/* app/globals.css */
@import 'tailwindcss';
@plugin '@tailwindcss/typography';

/* 自定义 CSS 变量 */
:root {
  --color-text-primary: oklch(0.08 0 0);
  --color-bg-primary: oklch(1 0 0);
}

.dark {
  --color-text-primary: oklch(0.98 0 0);
  --color-bg-primary: oklch(0.12 0 0);
}
```

### 不需要配置文件

Tailwind v4 使用 CSS-first 配置，不需要 `tailwind.config.ts`

## Markdown 文章格式

````markdown
---
layout: 'post'
title: 文章标题
date: 2024-07-04
excerpt: 文章摘要，简短描述文章内容
---

# 文章内容

这里是 Markdown 内容。

## 代码示例

\```typescript
function example() {
console.log('Hello World')
}
\```
````

### Front Matter 字段说明

| 字段      | 类型     | 必需 | 说明                            |
| --------- | -------- | ---- | ------------------------------- |
| `layout`  | string   | ✅   | 布局类型（通常为 `'post'`）     |
| `title`   | string   | ✅   | 文章标题                        |
| `date`    | string   | ✅   | 发布日期（YYYY-MM-DD）          |
| `excerpt` | string   | ✅   | 文章摘要（用于 SEO 和列表展示） |
| `tags`    | string[] | ❌   | 标签列表（可选）                |

## 常见任务

### 添加新文章

1. 在 `posts/{年份}/` 创建新的 `.md` 文件

   ```bash
   # 例如
   posts/2025/my-new-post.md
   ```

2. 添加 Front matter 元数据

   ```markdown
   ---
   layout: 'post'
   title: 我的新文章
   date: 2025-11-20
   excerpt: 这是一篇关于...的文章
   ---
   ```

3. 编写 Markdown 内容

4. 构建后会自动生成静态页面

### 修改站点配置

编辑 `lib/config.ts`:

```typescript
export const siteConfig = {
  name: 'Viki 写东西的地方',
  shortName: 'Viki',
  description: '分享技术和日常',
  url: 'https://blog.viki.moe',

  author: {
    name: 'Viki',
    email: 'hi@viki.moe',
    github: 'https://github.com/vikiboss',
  },

  // Google Analytics
  analytics: {
    googleAnalyticsId: 'G-YCP5HPQZXN',
  },

  // ... 更多配置
}
```

### 修改样式

1. 全局样式：编辑 `app/globals.css`
2. 组件样式：使用 Tailwind 类名
3. 主题颜色：在 `globals.css` 中修改 CSS 变量

### 添加新组件

1. 在 `components/` 创建新文件（使用 kebab-case）

   ```bash
   components/my-new-component.tsx
   ```

2. 如果需要交互，添加 `'use client'` 指令

   ```typescript
   'use client'

   export function MyNewComponent() {
     // 组件逻辑
   }
   ```

## React 19 特性

### use() Hook

```typescript
import { use } from 'react'

async function getData() {
  return fetch('/api/data').then((r) => r.json())
}

function Component() {
  const data = use(getData())
  return <div>{data}</div>
}
```

### useOptimistic()

```typescript
import { useOptimistic } from 'react'

function Component({ items }: { items: string[] }) {
  const [optimisticItems, addOptimistic] = useOptimistic(
    items,
    (state, newItem: string) => [...state, newItem],
  )

  return <ul>{optimisticItems.map((item) => <li key={item}>{item}</li>)}</ul>
}
```

## 调试技巧

### TypeScript 错误

- 运行 `pnpm type-check` 查看类型错误
- 使用 VSCode 的 TypeScript 插件
- 检查 `tsconfig.json` 配置

### 构建错误

- 检查 Markdown Front matter 格式
- 确保所有文件名符合 kebab-case 规范
- 检查 import 路径是否正确
- 查看 `next.config.ts` 配置

### 样式问题

- 检查 Tailwind 类名是否正确
- 使用浏览器开发工具检查 CSS
- 确认 `globals.css` 中的 `@import "tailwindcss"` 存在
- 检查 CSS 变量是否正确定义

### 性能问题

- 运行 `pnpm analyze` 查看打包分析
- 检查是否有不必要的客户端组件
- 确保图片已优化
- 使用 React DevTools Profiler

## 最佳实践

1. **优先使用 Server Components** - 除非需要交互
2. **使用 TypeScript** - 所有文件使用 `.tsx` 或 `.ts` 扩展名
3. **遵循 Prettier 规范** - 提交前格式化代码
4. **kebab-case 文件名** - 所有组件文件
5. **单引号、无分号、尾随逗号** - 代码风格
6. **使用 dayjs** - 时间处理
7. **OKLCH 色彩** - 颜色定义
8. **盘古之白** - 中英文混排空格
9. **中文标点** - 中文内容使用中文标点符号

## 特殊功能

### OG 图片生成

文件：`app/api/og/route.tsx`

自动为每篇文章生成 Open Graph 图片，用于社交媒体分享。

### RSS Feed

文件：`app/rss/route.ts`

自动生成 RSS 2.0 格式的订阅源，包含所有已发布文章。

### 大事记

文件：`app/timeline/page.tsx`

展示重要时刻和里程碑，数据存储在 `lib/timeline.ts`。

### 碎碎念

文件：`app/thoughts/page.tsx`

短想法和随笔，数据存储在 `lib/thoughts.ts`。

### 旧文章提示

文件：`components/old-post-banner.tsx`

自动检测文章发布时间，超过 365 天显示提示横幅。

### Google Analytics

文件：`components/google-analytics.tsx`

自动追踪页面浏览和路由变化，提供访问统计和用户行为分析。配置项位于 `lib/config.ts` 的 `analytics.googleAnalyticsId`。

## 部署

### Vercel（推荐）

1. 连接 GitHub 仓库
2. 自动检测 Next.js 项目
3. 自动部署

### 环境变量

```bash
# 生产环境
NODE_ENV=production

# 可选：启用打包分析
ANALYZE=true
```

## 参考资源

- [Next.js 16 文档](https://nextjs.org/docs)
- [React 19 文档](https://react.dev)
- [Tailwind CSS v4 文档](https://tailwindcss.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [盘古之白](https://github.com/vinta/pangu.js)

## 注意事项

- ⚠️ 不支持旧版浏览器
- ⚠️ 组件文件必须使用 kebab-case
- ⚠️ 必须使用 pnpm 作为包管理器（10.22.0+）
- ⚠️ 严格遵循 Prettier 配置
- ⚠️ 严格遵循中文排版规范（盘古之白）
- ⚠️ 使用 dayjs 处理时间，不使用其他库
- ⚠️ 文章使用 .md 格式，不是 .mdx
- ⚠️ Front Matter 必须包含 layout、title、date、excerpt 字段
