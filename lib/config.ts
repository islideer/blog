/**
 * 站点配置
 * 统一管理网站的基本信息、元数据和常量
 */

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
    rss: '/rss.xml',
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

  // 页面配置
  pages: {
    home: {
      title: '博客',
      description: '所有博客文章列表',
      hero: {
        title: '你好，我是 Viki',
        description:
          '我来自中国江西，是 Web 前端开发者，也是 Node.js 和 TypeScript 的狂热爱好者，经常活跃在 GitHub 开源社区。想用代码遇见更多有趣的人、做更多有趣的事。',
      },
      postsToShow: 3,
    },
    archives: {
      title: '归档',
      description: '按年份归档的所有文章',
    },
    about: {
      title: '关于',
      description: '关于 Viki 和这个博客',
    },
  },
} as const
