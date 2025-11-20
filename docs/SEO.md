# SEO 优化指南 (Search Engine Optimization)

本文档说明本博客的 SEO 策略、实施细节和最佳实践。

## 目录

- [概述](#概述)
- [元数据优化](#元数据优化)
- [结构化数据](#结构化数据)
- [XML Sitemap](#xml-sitemap)
- [RSS Feed](#rss-feed)
- [Robots.txt](#robotstxt)
- [内容优化](#内容优化)
- [性能优化](#性能优化)
- [移动端优化](#移动端优化)
- [监控与分析](#监控与分析)

---

## 概述

本博客遵循现代 SEO 最佳实践,利用 Next.js 16 的静态导出特性实现最优的搜索引擎可见性和用户体验。

### SEO 目标

1. **提高搜索引擎可见性** - 确保内容被正确索引
2. **优化用户体验** - 快速加载,易于导航
3. **结构化数据** - 帮助搜索引擎理解内容
4. **移动友好** - 响应式设计,适配所有设备
5. **内容质量** - 有价值、原创、易读的内容

---

## 元数据优化

### 根布局元数据

实现位置: [app/layout.tsx](../app/layout.tsx:10-57)

```typescript
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.github }],
  keywords: siteConfig.keywords,
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: generateCanonicalUrl('/'),
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.author.twitter,
  },
}
```

### 关键元素

#### 1. **标题 (Title)**

- 主页: 网站名称
- 文章页: `文章标题 | 网站名称`
- 其他页面: `页面名称 | 网站名称`
- 长度: 50-60 字符(中文约 25-30 字)

#### 2. **描述 (Description)**

- 准确描述页面内容
- 长度: 150-160 字符(中文约 75-80 字)
- 包含目标关键词
- 吸引用户点击

#### 3. **关键词 (Keywords)**

配置位置: [lib/config.ts](../lib/config.ts:18-32)

```typescript
keywords: [
  '前端开发',
  'React',
  'Next.js',
  'TypeScript',
  'Web 开发',
  '技术博客',
]
```

- 3-10 个相关关键词
- 与内容高度相关
- 避免关键词堆砌

#### 4. **规范链接 (Canonical URL)**

```typescript
alternates: {
  canonical: generateCanonicalUrl('/path'),
}
```

- 防止重复内容问题
- 指向内容的主要版本
- 所有页面都应包含

### 文章页面元数据

实现位置: [app/(post)/[slug]/page.tsx](../app/(post)/[slug]/page.tsx:22-48)

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return {
    title: post.title,
    description: post.excerpt || post.title,
    keywords: post.tags?.join(', '),
    authors: [{ name: post.author || siteConfig.author.name }],
    alternates: {
      canonical: generateCanonicalUrl(`/${slug}`),
    },
    openGraph: generatePostOpenGraph(post),
    twitter: generatePostTwitterCard(post),
  }
}
```

- 每篇文章有独特的标题和描述
- 标签作为关键词
- 包含 Open Graph 和 Twitter Card 数据

---

## 结构化数据

使用 JSON-LD 格式提供结构化数据,帮助搜索引擎理解内容。

实现位置: [lib/seo.ts](../lib/seo.ts)

### 1. Person Schema (首页)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Viki",
  "url": "https://blog.viki.moe",
  "sameAs": [
    "https://github.com/viki-ing",
    "@viki_dev"
  ]
}
```

- 建立作者身份
- 链接社交媒体账号

### 2. Blog Schema (首页)

```json
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "博客名称",
  "description": "博客描述",
  "url": "https://blog.viki.moe",
  "author": {
    "@type": "Person",
    "name": "Viki"
  },
  "publisher": {
    "@type": "Person",
    "name": "Viki"
  }
}
```

- 标识网站类型
- 关联作者和发布者

### 3. BlogPosting Schema (文章页)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "文章标题",
  "alternativeHeadline": "文章标题",
  "description": "文章摘要",
  "articleBody": "文章内容前 500 字符",
  "url": "https://blog.viki.moe/post-slug",
  "datePublished": "2025-11-20",
  "dateModified": "2025-11-20",
  "author": {
    "@type": "Person",
    "name": "Viki"
  },
  "publisher": {
    "@type": "Person",
    "name": "Viki"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://blog.viki.moe/post-slug"
  },
  "keywords": "React, TypeScript",
  "articleSection": "技术",
  "wordCount": 1500,
  "inLanguage": "zh-CN",
  "isFamilyFriendly": "true",
  "isAccessibleForFree": "true"
}
```

优化内容:

- **wordCount** - 文章字数(动态计算)
- **articleBody** - 文章内容片段
- **mainEntityOfPage** - 主要实体页面
- **inLanguage** - 语言标识
- **isAccessibleForFree** - 免费访问

### 4. BreadcrumbList Schema (文章页)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "首页",
      "item": "https://blog.viki.moe"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "文章标题",
      "item": "https://blog.viki.moe/post-slug"
    }
  ]
}
```

- 提供导航路径
- 改善搜索结果显示

### 验证结构化数据

使用 Google 的 Rich Results Test:

1. 访问 [Rich Results Test](https://search.google.com/test/rich-results)
2. 输入页面 URL 或 HTML 代码
3. 检查是否有错误或警告
4. 预览搜索结果外观

---

## XML Sitemap

实现位置: [app/sitemap.ts](../app/sitemap.ts)

### 动态生成 Sitemap

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/archives`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...staticPages, ...postPages]
}
```

### Sitemap 最佳实践

| 元素 | 说明 |
|------|------|
| `url` | 页面完整 URL |
| `lastModified` | 最后修改日期(ISO 8601) |
| `changeFrequency` | 更新频率提示 |
| `priority` | 页面优先级(0.0-1.0) |

**优先级建议:**

- 首页: `1.0`
- 归档: `0.8`
- 文章: `0.9`
- 关于: `0.5`

### 提交 Sitemap

1. **Google Search Console**
   - 访问 [Google Search Console](https://search.google.com/search-console)
   - 添加并验证网站
   - 左侧菜单 → Sitemaps
   - 添加 sitemap URL: `https://blog.viki.moe/sitemap.xml`

2. **Bing Webmaster Tools**
   - 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)
   - 添加并验证网站
   - 配置 → Sitemaps
   - 提交 sitemap URL

---

## RSS Feed

实现位置: [app/rss.xml/route.ts](../app/rss.xml/route.ts)

### RSS 2.0 Feed 生成

```typescript
export async function GET() {
  const posts = await getAllPosts()

  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: siteConfig.locale,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `© ${siteConfig.copyright.year.start}-${siteConfig.copyright.year.end} ${siteConfig.author.name}`,
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: siteConfig.author.github,
    },
  })

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/${post.slug}`,
      link: `${siteConfig.url}/${post.slug}`,
      description: post.excerpt || post.title,
      date: new Date(post.date),
      category: post.tags?.map((tag) => ({ name: tag })),
    })
  })

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
```

### RSS Feed 特性

- **完整文章列表** - 所有已发布文章
- **元数据** - 标题、描述、日期、标签
- **缓存控制** - 1 小时缓存(CDN 和浏览器)
- **自动发现** - `<link rel="alternate">` 在 `<head>` 中

### RSS 自动发现

实现位置: [app/layout.tsx](../app/layout.tsx:86-91)

```tsx
<link
  rel="alternate"
  type="application/rss+xml"
  title={`${siteConfig.name} RSS 订阅`}
  href={siteConfig.links.rss}
/>
```

- 浏览器自动检测 RSS feed
- RSS 阅读器可自动订阅

---

## Robots.txt

实现位置: [app/robots.ts](../app/robots.ts)

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
```

### Robots.txt 规则

- **允许所有爬虫** - `userAgent: '*'`
- **允许抓取** - `allow: '/'`
- **禁止路径** - `/api/`, `/_next/` (Next.js 内部路径)
- **Sitemap 引用** - 指向 XML sitemap

---

## 内容优化

### 文章 Front Matter

每篇文章应包含以下元数据:

```yaml
---
title: 文章标题
date: 2025-11-20
excerpt: 文章摘要,150字以内
tags:
  - React
  - TypeScript
author: Viki
draft: false
top: false
---
```

### 标题优化

- **H1** - 每页一个,包含主要关键词
- **H2-H6** - 逻辑层级,不跳过级别
- **描述性** - 准确描述章节内容

示例:

```markdown
# React 19 新特性详解

## 1. use() Hook 的使用

### 1.1 基础用法

### 1.2 错误处理

## 2. Server Components

### 2.1 什么是 Server Components
```

### 内部链接

- 使用描述性锚文本(避免"点击这里")
- 链接到相关文章
- 保持链接有效(定期检查 404)

```markdown
// ✅ 好的做法
了解更多关于 [React Hooks 的使用方法](./react-hooks-guide)

// ❌ 不好的做法
[点击这里](./react-hooks-guide) 了解更多
```

### 图片优化

- **Alt Text** - 描述性替代文本
- **文件名** - 描述性文件名(如 `react-component-lifecycle.png`)
- **压缩** - 使用 WebP 格式,压缩到合理大小
- **尺寸** - 适当的图片尺寸,避免过大

```markdown
![React 组件生命周期图](./images/react-component-lifecycle.png)
```

### URL 结构

- **简洁** - 短而描述性
- **语义化** - 反映内容结构
- **小写** - 使用小写字母和连字符

```
✅ https://blog.viki.moe/react-hooks-guide
❌ https://blog.viki.moe/article?id=123
```

---

## 性能优化

性能是 SEO 的重要因素,尤其是 Core Web Vitals。

### Core Web Vitals 目标

| 指标 | 良好 | 需要改进 | 差 |
|------|------|---------|-----|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | 2.5s - 4s | > 4s |
| **FID** (First Input Delay) | ≤ 100ms | 100ms - 300ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |

### 已实施的优化

#### 1. 静态导出

```typescript
// next.config.ts
export default {
  output: 'export', // 静态 HTML 导出
}
```

- 零服务器响应时间
- 可部署到 CDN
- 极速加载

#### 2. Server Components

- 默认 Server Components
- 零客户端 JavaScript(大部分页面)
- 更快的 Time to Interactive (TTI)

#### 3. 代码分割

- 每个页面独立 chunk
- 自动按路由分割
- 减少初始加载大小

#### 4. 字体优化

```css
/* 使用系统字体栈 */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
  'Helvetica Neue', Arial, sans-serif;
```

- 零字体加载时间
- 无字体闪烁(FOUT/FOIT)
- 更好的性能

#### 5. CSS 优化

- Tailwind CSS v4 自动清除未使用样式
- CSS-first 配置
- 最小化 CSS 体积

#### 6. 资源提示

实现位置: [app/layout.tsx](../app/layout.tsx:67-69)

```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
```

- 提前建立连接
- 减少 DNS 查询时间

### 性能监控

#### Bundle Analyzer

```bash
# 分析打包体积
pnpm run analyze
```

- 查看每个页面的 JavaScript 大小
- 识别大型依赖
- 优化打包策略

#### Lighthouse

```bash
# Chrome DevTools
1. 打开 DevTools (F12)
2. Lighthouse 标签
3. 运行审计(Performance + SEO)
```

目标分数:

- Performance: ≥ 90
- SEO: 100
- Accessibility: 100
- Best Practices: ≥ 90

---

## 移动端优化

### 响应式设计

使用 Tailwind CSS 断点:

```tsx
<div className="px-4 sm:px-6 lg:px-8">
  {/* 不同屏幕尺寸不同的内边距 */}
</div>
```

断点:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Viewport Meta Tag

Next.js 默认包含:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### 移动友好测试

1. **Google Mobile-Friendly Test**
   - [测试工具](https://search.google.com/test/mobile-friendly)
   - 输入页面 URL
   - 检查是否通过

2. **Chrome DevTools 设备模拟**
   - F12 → 设备工具栏 (Ctrl+Shift+M)
   - 测试不同设备尺寸
   - 检查布局和交互

---

## 监控与分析

### Google Search Console

**设置步骤:**

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加资源(网站)
3. 验证所有权(DNS 或 HTML 文件)
4. 提交 Sitemap

**监控指标:**

- 索引覆盖率
- 搜索性能(点击、展示、CTR、位置)
- Core Web Vitals
- 移动可用性
- 结构化数据问题

### Google Analytics (可选)

如需添加分析:

```tsx
// app/layout.tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  `}
</Script>
```

**注意:** 需要遵守 GDPR/隐私法规。

### 关键 SEO 指标

定期检查:

- [ ] 索引页面数量
- [ ] 平均点击率(CTR)
- [ ] 平均搜索排名
- [ ] Core Web Vitals 分数
- [ ] 移动可用性问题
- [ ] 结构化数据错误
- [ ] 外部链接数量(反向链接)

---

## SEO 检查清单

### 页面级 SEO

- [ ] 唯一的 `<title>` 标签(50-60 字符)
- [ ] 描述性 `<meta name="description">`(150-160 字符)
- [ ] 规范 URL (`canonical`)
- [ ] Open Graph 标签
- [ ] Twitter Card 标签
- [ ] H1 标签存在且唯一
- [ ] 逻辑的标题层级(H1-H6)
- [ ] 描述性 URL(语义化)
- [ ] 所有图片有 alt 属性
- [ ] 内部链接有描述性锚文本

### 技术 SEO

- [ ] XML Sitemap 生成并提交
- [ ] Robots.txt 正确配置
- [ ] 无 404 错误
- [ ] HTTPS 启用
- [ ] 移动友好(响应式)
- [ ] 页面加载速度快(LCP < 2.5s)
- [ ] 无重复内容
- [ ] 结构化数据验证通过
- [ ] RSS Feed 可访问

### 内容 SEO

- [ ] 原创内容
- [ ] 有价值、信息丰富
- [ ] 目标关键词自然出现
- [ ] 逻辑的内容结构
- [ ] 定期更新
- [ ] 内部链接到相关文章
- [ ] 标题具有吸引力
- [ ] 摘要准确概括内容

---

## 持续优化

### 月度任务

- [ ] 检查 Google Search Console 问题
- [ ] 分析搜索性能数据
- [ ] 检查 Core Web Vitals
- [ ] 审查新文章 SEO
- [ ] 更新旧文章(如需要)

### 季度任务

- [ ] 竞争对手分析
- [ ] 关键词研究
- [ ] 外部链接审计
- [ ] 内容差距分析
- [ ] 技术 SEO 审计

### 年度任务

- [ ] 全面 SEO 审计
- [ ] 内容策略调整
- [ ] 技术栈升级(如 Next.js 新版本)
- [ ] 用户体验优化

---

## 参考资源

### SEO 指南

- [Google Search Central](https://developers.google.com/search)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)
- [Ahrefs SEO Blog](https://ahrefs.com/blog/)

### 工具

- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- [Schema.org](https://schema.org/) - 结构化数据参考

### Next.js SEO

- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

---

**最后更新**: 2025-11-20
**维护者**: Viki
**版本**: 1.0.0
