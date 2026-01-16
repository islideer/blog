# Viki 的博客

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

一个基于 **Next.js 16**、**React 19** 和 **Tailwind CSS v4** 构建的现代化个人博客。

> 生活需要记录

![screenshot](./docs/screenshot.png)

---

## 💻 预览

- 网址: [https://blog.viki.moe](https://blog.viki.moe)

## ✨ 特性

### 🚀 现代化技术栈

- **Next.js 16** - App Router + 混合渲染（静态生成 + 动态 API）
- **React 19** - Server Components + React Compiler
- **Tailwind CSS v4** - CSS-first 配置，OKLCH 色彩空间
- **TypeScript 5.9+** - 完整的类型安全
- **pnpm 10.22.0+** - 高效的包管理器

### 📝 内容管理

- **Markdown 文章** - 支持 `.md` 文件，按年份组织（2019-2025）
- **语法高亮** - 基于 Shiki 的精美代码高亮
- **Front Matter** - 灵活的文章元数据（标题、日期、摘要、标签等）
- **多页面支持** - 首页、文章列表、文章页、大事记、碎碎念、Mio 说、关于页

### 🎨 设计与体验

- **暗色/亮色主题** - 自动检测系统偏好，支持手动切换
- **响应式布局** - 完美适配桌面、平板、手机
- **平滑动画** - 主题切换、页面滚动、交互反馈
- **系统字体** - 零字体加载，原生体验
- **OKLCH 色彩** - 感知均匀的现代色彩空间

### 🔍 SEO 与优化

- **动态 OG 图片** - 自动生成社交媒体预览图（`/api/og`）
- **XML Sitemap** - 自动生成站点地图
- **RSS Feed** - 完整的 RSS 2.0 支持（`/rss`）
- **Robots.txt** - 搜索引擎爬虫配置
- **PWA Manifest** - 渐进式 Web 应用支持
- **Google Analytics** - 访问统计和用户行为分析

---

## 🛠️ 技术栈

### 核心框架

- **[Next.js 16](https://nextjs.org/)** - React 框架，App Router
- **[React 19](https://react.dev/)** - UI 库，Server Components
- **[TypeScript 5.9+](https://www.typescriptlang.org/)** - 类型安全
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - CSS 框架

### 内容处理

- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** - Front matter 解析
- **[Shiki](https://shiki.style/)** - 代码语法高亮
- **[unified](https://unifiedjs.com/)** - Markdown 处理生态系统
- **[remark](https://github.com/remarkjs/remark)** - Markdown 解析器
- **[rehype](https://github.com/rehypejs/rehype)** - HTML 处理器

### 工具库

- **[dayjs](https://day.js.org/)** - 日期处理
- **[Feed](https://github.com/jpmonette/feed)** - RSS/Atom feed 生成
- **[@vercel/og](https://vercel.com/docs/functions/og-image-generation)** - OG 图片生成
- **[medium-zoom](https://github.com/francoischalifour/medium-zoom)** - 图片缩放
- **[@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - 打包分析
- **[Google Analytics](https://analytics.google.com/)** - 网站访问统计

### 开发工具

- **[pnpm](https://pnpm.io/)** - 包管理器（10.22.0+）
- **[Prettier](https://prettier.io/)** - 代码格式化
- **[ESLint](https://eslint.org/)** - 代码检查
- **React Compiler** - 自动性能优化

---

## 🚀 快速开始

### 环境要求

- **Node.js** 18.17+ 或 20+
- **pnpm** 10.22.0+

### 安装

```bash
# 克隆仓库
git clone https://github.com/vikiboss/blog.git
cd blog

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动开发服务器（使用 Turbopack）
pnpm dev

# 访问 http://localhost:3000
```

### 构建

```bash
# 生产构建
pnpm build

# 静态文件输出到 out/ 目录
```

### 其他命令

```bash
# 类型检查
pnpm type-check

# 代码格式化
pnpm format

# 打包分析
pnpm analyze
```


---

## 🚢 部署

### Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. 点击上方按钮
2. 导入 Git 仓库
3. 自动部署

### 其他静态托管

构建后，将 `out/` 目录部署到:

- **GitHub Pages** - 免费，集成 Git
- **Cloudflare Pages** - 全球 CDN，快速
- **Netlify** - 简单易用
- **任何支持静态文件的服务**

---

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！请查看 [.claude/CLAUDE.md](./.claude/CLAUDE.md) 了解开发规范。

---

## 📄 许可证

本项目采用 MIT 许可证

---

## 🙏 致谢

### 技术

- [Next.js](https://nextjs.org/) - 卓越的 React 框架
- [React](https://react.dev/) - 强大的 UI 库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Shiki](https://shiki.style/) - 美观的代码高亮

---

## 📧 联系

- **GitHub**: [@vikiboss](https://github.com/vikiboss)
- **Email**: hi@viki.moe
- **网站**: https://blog.viki.moe

---

**⭐ 如果这个项目对你有帮助，请给一个 Star！**

---

<p align="center">
  使用 ❤️ 和 <a href="https://nextjs.org">Next.js</a> 构建
</p>
