# Modern Blog

一个基于 **Next.js 16** 和 **React 19** 构建的现代化博客。

## 特性

- ⚡️ **Next.js 16** - 最新的 App Router + Turbopack
- ⚛️ **React 19** - Server Components + 新 Hooks (use, useOptimistic)
- 🎨 **Tailwind CSS v4** - CSS-first 配置
- 📝 **MDX** - 在 Markdown 中使用 React 组件
- 🚀 **静态生成** - 极致性能，可部署到任何静态托管
- 🔬 **实验区** - 探索最新的 Web 技术
- 💅 **现代化** - 只支持现代浏览器，使用最新 Web 标准

## 技术栈

- Next.js 16
- React 19.0.0
- TypeScript 5.7+
- Tailwind CSS 4.0.0
- MDX
- dayjs

## 开发

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 构建

```bash
pnpm build
```

静态文件将输出到 `out/` 目录。

### 类型检查

```bash
pnpm type-check
```

## 项目结构

```
blog/
├── app/                      # Next.js App Router
│   ├── blog/                # 博客页面
│   ├── experiments/         # 实验区
│   └── about/               # 关于页面
├── components/              # React 组件 (kebab-case)
├── content/                 # 内容目录
│   └── posts/               # MDX 博客文章
├── lib/                     # 工具库
└── .claude/                 # Claude Code 配置
```

## 添加文章

在 `content/posts/` 目录下创建新的 `.mdx` 文件：

```markdown
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

这里是 MDX 内容。
```

## 代码风格

项目使用 Prettier 格式化代码：

- 不使用分号
- 单引号
- 尾随逗号
- 2空格缩进
- 组件文件使用 kebab-case 命名

详见 [.claude/CODE_STYLE.md](.claude/CODE_STYLE.md)

## 部署

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### 其他静态托管

构建后，将 `out/` 目录部署到任何静态托管服务：

- GitHub Pages
- Cloudflare Pages
- AWS S3
- 等等

## License

MIT
