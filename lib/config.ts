/**
 * 站点配置
 * 统一管理网站的基本信息、元数据和常量
 */

import { about } from './about'

export const siteConfig = {
  // 基本信息
  name: 'Viki 写东西的地方',
  shortName: 'Viki',
  description: '分享技术和日常',
  tagline: '生活需要记录',
  url: 'https://blog.viki.moe',
  locale: 'zh-CN',
  language: 'zh-CN',

  // 作者信息
  author: {
    name: 'Viki',
    email: 'hi@viki.moe',
    github: 'https://github.com/vikiboss',
    twitter: '@vikiboss',
  },

  // 社交链接
  links: {
    github: 'https://github.com/vikiboss',
    rss: '/rss',
  },

  // SEO 关键词
  keywords: [
    '前端开发',
    'Web 开发',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    '博客',
  ] as string[],

  // 版权信息
  copyright: {
    year: {
      start: 2019,
      end: 'PRESENT',
    },
    license: {
      name: 'CC BY-SA 4.0',
      url: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  },

  // 主题配置
  theme: {
    defaultMode: 'light',
    background: {
      light: '#ffffff',
      dark: '#000000',
    },
  },

  // PWA 配置
  pwa: {
    display: 'standalone',
  },

  // Open Graph 配置
  openGraph: {
    type: 'website',
    images: {
      width: 1200,
      height: 630,
    },
  },

  // 首页配置
  home: {
    postsToShow: 3, // 首页显示的文章数量（不含置顶）
    hero: {
      title: '你好，我是 Viki',
      paragraphs: about.intro.paragraphs,
    } as { title: string; paragraphs: string[] },
  },
} as const
