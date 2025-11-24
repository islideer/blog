# 代码风格指南

## 文件命名规范

- **组件文件**: 使用 `kebab-case` 命名
  - ✅ `header.tsx`, `footer.tsx`, `view-transitions-demo.tsx`
  - ❌ `Header.tsx`, `Footer.tsx`, `ViewTransitionsDemo.tsx`

- **页面文件**: 使用 Next.js App Router 约定
  - `page.tsx`, `layout.tsx`, `not-found.tsx`

## Prettier 配置

项目使用以下 Prettier 配置（已集成在 package.json 中）：

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 100
}
```

### 关键规则

1. **不使用分号** (`semi: false`)

   ```typescript
   // ✅ 正确
   const name = 'value'

   // ❌ 错误
   const name = 'value'
   ```

2. **使用单引号** (`singleQuote: true`)

   ```typescript
   // ✅ 正确
   import { useState } from 'react'
   const text = 'Hello'

   // ❌ 错误
   import { useState } from 'react'
   const text = 'Hello'
   ```

3. **所有地方添加尾随逗号** (`trailingComma: 'all'`)

   ```typescript
   // ✅ 正确
   const obj = {
     name: 'test',
     age: 20,
   }

   // ❌ 错误
   const obj = {
     name: 'test',
     age: 20,
   }
   ```

4. **2个空格缩进** (`tabWidth: 2`)

5. **100字符行宽** (`printWidth: 100`)

## TypeScript 规范

- 使用 `type` 定义对象类型
- 使用 `interface` 定义可扩展的类型
- 优先使用类型推导，避免不必要的类型注解
- 使用 `const` 和 `let`，避免 `var`

## React 规范

### 组件

- 使用函数组件，不使用类组件
- 优先使用 React Server Components (RSC)
- 需要交互时使用 `'use client'` 指令
- 组件导出使用具名导出

```typescript
// ✅ 正确
export function Header() {
  return <header>...</header>
}

// ❌ 错误
export default function() {
  return <header>...</header>
}
```

### Hooks

- Hook 放在组件顶部
- 遵循 Hook 命名规范（use 开头）
- 使用 React 19 新特性（use(), useOptimistic() 等）

## CSS 规范

### Tailwind CSS

- 使用 Tailwind CSS v4 的新语法
- 使用 `@import "tailwindcss"` 而非 `@tailwind` 指令
- 使用 `@theme` 定义主题变量
- 使用 `@plugin` 引入插件
- 简化类名，比如:
  - The class `rounded-[var(--radius-sm)]` can be written as `rounded-sm` (suggestCanonicalClasses)
  - The class `text-[var(--color-text-tertiary)]` can be written as `text-text-tertiary` (suggestCanonicalClasses)
  - The class `bg-[var(--color-bg-primary)]` can be written as `bg-bg-primary` (suggestCanonicalClasses)

```css
/* ✅ 正确 - Tailwind v4 */
@import 'tailwindcss';
@plugin '@tailwindcss/typography';

@theme {
  --color-primary: oklch(0.6 0.2 200);
}

/* ❌ 错误 - Tailwind v3 语法 */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 现代 CSS 特性

项目鼓励使用现代 CSS 特性：

- Container Queries
- :has() 选择器
- @layer
- color-mix()
- @property
- View Transitions

## 包管理器

- 使用 **pnpm** (version 10.20.0+)
- package.json 中指定 `"packageManager": "pnpm@10.20.0"`

## 依赖管理

- 保持依赖为最新稳定版本
- 使用 `^` 前缀允许小版本更新
- 核心依赖：
  - Next.js 16
  - React 19
  - TypeScript 5.7+
  - Tailwind CSS 4.0

## 时间处理

- 使用 `dayjs` 而非 `date-fns` 或其他时间库
- 统一时间格式化方式

```typescript
import { dayjs } from '@/lib/dayjs'

// ✅ 正确
const formatted = dayjs(date).format('YYYY-MM-DD')

// ❌ 错误
const formatted = new Date(date).toLocaleDateString()
```

## Next.js 特定规范

### App Router

- 使用 App Router（app/ 目录）
- Server Components 为默认，需要交互时标注 `'use client'`
- 使用新的 Metadata API

### 静态导出配置

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

## 实验性特性

项目鼓励实验和使用最新的 Web 技术：

- React 19 新 Hook
- View Transitions API
- 现代 CSS 特性
- Web APIs（Navigation API, Popover API 等）

## Git 提交规范

- 使用清晰的提交信息
- 遵循 Conventional Commits（可选）
- 每个提交应该是一个逻辑单元

## VSCode 配置

项目包含 VSCode 配置以支持：

- Tailwind CSS v4 智能提示
- CSS 自定义规则支持
- 禁用 CSS 未知规则警告

## 浏览器支持

- 仅支持现代浏览器
- 不考虑旧版浏览器兼容性
- 可以大胆使用最新的 Web 标准

## 文档规范

- 使用 Markdown (MDX) 编写文章
- Front matter 使用 YAML 格式
- 文章存放在 `content/posts/` 目录

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
```

## 总结

这个项目的核心原则是：

1. **现代化优先**: 使用最新的技术和标准
2. **简洁性**: 代码风格简洁，易于阅读
3. **一致性**: 统一的命名和格式规范
4. **实验性**: 鼓励探索和实验新特性
