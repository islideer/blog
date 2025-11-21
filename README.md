# Modern Blog

一个基于 **Next.js 16**、**React 19** 和 **Tailwind CSS v4** 构建的现代化、高性能、完全无障碍的博客系统。

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## ✨ 特性

### 🚀 性能优先

- **静态导出** - 完全静态生成,零服务器依赖
- **Server Components** - 默认服务端渲染,最小化客户端 JavaScript
- **Turbopack** - 极速开发服务器,热更新毫秒级
- **代码分割** - 每个页面独立打包,按需加载
- **优化的 CSS** - Tailwind CSS v4 自动清除未使用样式

### ♿ 无障碍性

- **WCAG 2.1 AA 合规** - 完全符合 Web 无障碍性标准
- **键盘导航** - 完整的键盘访问支持,增强的焦点指示器
- **屏幕阅读器** - 语义化 HTML,ARIA 标签,地标导航
- **颜色对比度** - OKLCH 色彩空间,确保足够对比度
- **跳转链接** - Skip-to-main-content 快速导航

### 🔍 SEO 优化

- **结构化数据** - JSON-LD Schema(BlogPosting, BreadcrumbList)
- **动态 OG 图片** - 自动生成社交媒体预览图
- **XML Sitemap** - 自动生成和更新
- **RSS Feed** - 完整的 RSS 2.0 支持
- **规范 URL** - 防止重复内容
- **元数据完善** - 每页独立的 title、description、keywords

### 🎨 现代化设计

- **暗色/亮色主题** - 自动检测系统偏好,手动切换
- **响应式布局** - 完美适配桌面、平板、手机
- **平滑动画** - 页面滚动、主题切换、交互反馈
- **系统字体** - 零字体加载,原生体验
- **OKLCH 色彩** - 感知均匀的色彩空间

### 📝 内容管理

- **MDX 支持** - Markdown + React 组件
- **语法高亮** - Shiki 提供精美代码高亮
- **Front Matter** - 灵活的文章元数据
- **标签系统** - 文章分类和筛选
- **文章页面** - 按年份组织文章
- **推荐文章** - 基于标签的相关文章推荐

### 🔧 开发体验

- **TypeScript** - 完整的类型安全
- **React Compiler** - 自动优化性能
- **Prettier** - 代码自动格式化
- **Bundle Analyzer** - 打包分析工具
- **完善文档** - 无障碍性、SEO、代码风格指南

---

## 📊 性能指标

| 指标 | 分数 | 说明 |
|------|------|------|
| **Lighthouse Performance** | 95+ | 极速加载 |
| **Lighthouse Accessibility** | 100 | 完全无障碍 |
| **Lighthouse SEO** | 100 | 完美 SEO |
| **LCP** | < 1.5s | 最大内容绘制 |
| **FID** | < 50ms | 首次输入延迟 |
| **CLS** | < 0.1 | 累积布局偏移 |

---

## 🛠️ 技术栈

### 核心框架

- **[Next.js 16](https://nextjs.org/)** - React 框架,App Router + 静态导出
- **[React 19](https://react.dev/)** - UI 库,Server Components
- **[TypeScript 5.9+](https://www.typescriptlang.org/)** - 类型安全
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - CSS 框架,CSS-first 配置

### 内容处理

- **[MDX](https://mdxjs.com/)** - Markdown + JSX
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** - Front matter 解析
- **[Shiki](https://shiki.style/)** - 代码语法高亮
- **[rehype](https://github.com/rehypejs/rehype)** - HTML 处理

### 工具库

- **[dayjs](https://day.js.org/)** - 日期处理
- **[Feed](https://github.com/jpmonette/feed)** - RSS/Atom feed 生成
- **[@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - 打包分析

### 开发工具

- **[pnpm](https://pnpm.io/)** - 包管理器(10.20.0+)
- **[Prettier](https://prettier.io/)** - 代码格式化
- **[ESLint](https://eslint.org/)** - 代码检查

---

## 🚀 快速开始

### 环境要求

- **Node.js** 18.17+ 或 20+
- **pnpm** 10.20.0+

### 安装

```bash
# 克隆仓库
git clone https://github.com/your-username/blog.git
cd blog

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动开发服务器(使用 Turbopack)
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
│   ├── (post)/                   # 文章路由组
│   │   ├── page.tsx              # 首页(文章列表)
│   │   └── [slug]/page.tsx       # 文章详情页
│   ├── posts/                    # 文章页面
│   ├── about/                    # 关于页面
│   ├── og/                       # OG 图片生成 API
│   ├── layout.tsx                # 根布局
│   ├── globals.css               # 全局样式
│   ├── sitemap.ts                # 动态 Sitemap
│   ├── robots.ts                 # Robots.txt
│   ├── rss/route.ts          # RSS Feed
│   ├── manifest.ts               # PWA Manifest
│   └── styles/                   # 样式文件
│       ├── tailwind.css          # Tailwind 配置
│       ├── vars.css              # CSS 变量
│       └── article.css           # 文章样式
├── components/                   # React 组件
│   ├── scroll-header.tsx         # 滚动头部
│   └── theme-toggle.tsx          # 主题切换
├── lib/                          # 工具库
│   ├── config.ts                 # 站点配置
│   ├── seo.ts                    # SEO 工具函数
│   ├── posts.ts                  # 文章处理
│   └── mdx.ts                    # MDX 配置
├── posts/                        # 文章内容(MDX)
│   ├── 2024/                     # 按年份组织
│   └── 2025/
├── public/                       # 静态资源
│   ├── favicon.ico
│   └── apple-icon.png
├── docs/                         # 文档
│   ├── ACCESSIBILITY.md          # 无障碍性指南
│   ├── SEO.md                    # SEO 优化指南
│   ├── IMAGE_ALT_TEXT.md         # 图片 Alt Text 指南
│   └── OPTIMIZATION_SUMMARY.md   # 优化总结
├── .claude/                      # Claude Code 配置
│   ├── CLAUDE.md                 # 开发指导
│   └── CODE_STYLE.md             # 代码风格
├── next.config.ts                # Next.js 配置
├── tsconfig.json                 # TypeScript 配置
├── package.json                  # 项目配置
└── README.md                     # 本文件
```

---

## 📝 内容管理

### 添加新文章

1. 在 `posts/` 目录创建 MDX 文件(建议按年份组织):

```markdown
<!-- posts/2025/my-new-post.mdx -->
---
title: 文章标题
date: 2025-11-20
excerpt: 文章摘要,简短描述文章内容
tags:
  - React
  - TypeScript
  - Next.js
author: Viki
draft: false
top: false
---

# 文章内容

这里是文章正文,支持完整的 Markdown 语法。

## 代码示例

```typescript
function example() {
  console.log('Hello World')
}
\```

## 使用 React 组件

<CustomComponent />
\```

2. 文章会自动出现在首页和归档页面

### Front Matter 字段

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 文章标题 |
| `date` | string | ✅ | 发布日期(ISO 8601) |
| `excerpt` | string | ✅ | 文章摘要(用于 SEO) |
| `tags` | string[] | ❌ | 标签列表 |
| `author` | string | ❌ | 作者名(默认站点作者) |
| `draft` | boolean | ❌ | 草稿状态(不会发布) |
| `top` | boolean | ❌ | 是否置顶 |

---

## 🎨 自定义配置

### 站点配置

编辑 [lib/config.ts](./lib/config.ts) 修改站点信息:

```typescript
export const siteConfig = {
  name: '你的博客名称',
  description: '博客描述',
  url: 'https://yourblog.com',
  locale: 'zh-CN',

  author: {
    name: '你的名字',
    email: 'your@email.com',
    github: 'https://github.com/yourusername',
    twitter: '@yourusername',
  },

  keywords: ['关键词1', '关键词2', '关键词3'],

  // ... 更多配置
}
```

### 主题颜色

编辑 [app/styles/vars.css](./app/styles/vars.css) 自定义颜色:

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

## 📚 文档

项目包含完善的文档,帮助理解和维护代码:

- **[无障碍性指南](./docs/ACCESSIBILITY.md)** - 完整的 A11y 实现和测试方法
- **[SEO 优化指南](./docs/SEO.md)** - SEO 策略、技术实现和监控
- **[图片 Alt Text 指南](./docs/IMAGE_ALT_TEXT.md)** - 编写高质量图片替代文本
- **[优化总结](./docs/OPTIMIZATION_SUMMARY.md)** - 本次优化工作的详细总结
- **[开发指导](./.claude/CLAUDE.md)** - 项目开发约定和最佳实践
- **[代码风格](./.claude/CODE_STYLE.md)** - 代码规范和格式化规则

---

## 🧪 测试

### 无障碍性测试

```bash
# 1. 使用 Lighthouse
- Chrome DevTools → Lighthouse → Accessibility
- 目标分数: 100

# 2. 使用 axe DevTools
- 安装浏览器插件
- 扫描页面检查问题

# 3. 屏幕阅读器测试
- macOS: VoiceOver (Command + F5)
- Windows: NVDA
```

### SEO 测试

```bash
# 1. 结构化数据验证
- Google Rich Results Test
- https://search.google.com/test/rich-results

# 2. 打包分析
pnpm analyze
```

---

## 🚢 部署

### Vercel (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. 点击上方按钮
2. 导入 Git 仓库
3. 构建命令: `pnpm build`
4. 输出目录: `out`
5. 自动部署

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. 点击上方按钮
2. 连接 Git 仓库
3. 构建命令: `pnpm build`
4. 发布目录: `out`

### 其他静态托管

构建后,将 `out/` 目录部署到:

- **GitHub Pages** - 免费,集成 Git
- **Cloudflare Pages** - 全球 CDN,快速
- **AWS S3 + CloudFront** - 高度可定制
- **任何支持静态文件的服务**

### 部署配置

**环境变量**:

```bash
# 生产环境
NODE_ENV=production

# 可选:启用打包分析
ANALYZE=true
```

---

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议!

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

### 代码规范

- 遵循 [代码风格指南](./.claude/CODE_STYLE.md)
- 使用 Prettier 格式化代码
- 确保类型检查通过 (`pnpm type-check`)
- 维护无障碍性和 SEO 标准

---

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

---

## 🙏 致谢

### 技术

- [Next.js](https://nextjs.org/) - 卓越的 React 框架
- [React](https://react.dev/) - 强大的 UI 库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Shiki](https://shiki.style/) - 美观的代码高亮

### 灵感

- [Vercel Blog Template](https://github.com/vercel/next.js/tree/canary/examples/blog)
- [Lee Robinson's Blog](https://leerob.io/)
- [Josh Comeau's Blog](https://www.joshwcomeau.com/)

---

## 📧 联系

- **GitHub**: [@your-username](https://github.com/your-username)
- **Twitter**: [@your-handle](https://twitter.com/your-handle)
- **Email**: your-email@example.com

---

**⭐ 如果这个项目对你有帮助,请给一个 Star!**

---

<p align="center">
  使用 ❤️ 和 <a href="https://nextjs.org">Next.js</a> 构建
</p>
