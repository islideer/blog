# Viki 的博客

一个基于 **Next.js 16**、**React 19** 和 **Tailwind CSS v4** 构建的现代化个人博客。

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

> 生活需要记录

---

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
- **[rehype](https://github.com/rehypejs/rehype)** - HTML 处理
- **[next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)** - MDX 支持

### 工具库

- **[dayjs](https://day.js.org/)** - 日期处理
- **[Feed](https://github.com/jpmonette/feed)** - RSS/Atom feed 生成
- **[@vercel/og](https://vercel.com/docs/functions/og-image-generation)** - OG 图片生成
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

## 📁 项目结构

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
├── .claude/                      # Claude Code 配置
│   ├── CLAUDE.md                 # 开发指导
│   └── CODE_STYLE.md             # 代码风格（如果有）
├── next.config.ts                # Next.js 配置
├── tsconfig.json                 # TypeScript 配置
├── package.json                  # 项目配置
└── README.md                     # 本文件
```

---

## 📝 内容管理

### 添加新文章

1. 在 `posts/` 目录创建 Markdown 文件（建议按年份组织）:

````markdown
## <!-- posts/2025/my-new-post.md -->

layout: 'post'
title: 文章标题
date: 2025-11-20
excerpt: 文章摘要，简短描述文章内容

---

# 文章内容

这里是文章正文，支持完整的 Markdown 语法。

## 代码示例

\```typescript
function example() {
console.log('Hello World')
}
\```
````

2. 文章会自动出现在首页和文章页

### Front Matter 字段

| 字段      | 类型     | 必需 | 说明                            |
| --------- | -------- | ---- | ------------------------------- |
| `layout`  | string   | ✅   | 布局类型（通常为 `'post'`）     |
| `title`   | string   | ✅   | 文章标题                        |
| `date`    | string   | ✅   | 发布日期（YYYY-MM-DD）          |
| `excerpt` | string   | ✅   | 文章摘要（用于 SEO 和列表展示） |
| `tags`    | string[] | ❌   | 标签列表（可选）                |

---

## 🎨 自定义配置

### 站点配置

编辑 [lib/config.ts](./lib/config.ts) 修改站点信息:

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

### 主题颜色

编辑 [app/globals.css](./app/globals.css) 自定义颜色:

```css
/* 亮色模式 */
--color-text-primary: oklch(0.08 0 0);
--color-bg-primary: oklch(1 0 0);

/* 暗色模式 */
.dark {
  --color-text-primary: oklch(0.98 0 0);
  --color-bg-primary: oklch(0.12 0 0);
}
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

## 📚 开发规范

### 代码风格

项目使用 Prettier 统一代码风格:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 100
}
```

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
  - ✅ `theme-toggle.tsx`, `about-intro.tsx`
  - ❌ `ThemeToggle.tsx`, `AboutIntro.tsx`

---

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

### 代码规范

- 遵循 Prettier 代码风格
- 遵循中文排版规范（盘古之白）
- 使用 `kebab-case` 命名组件文件
- 确保类型检查通过 (`pnpm type-check`)

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
