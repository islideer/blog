import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    scope: '/', // 应用范围
    display: siteConfig.pwa.display,
    orientation: 'portrait-primary', // 首选竖屏方向
    background_color: siteConfig.theme.background.light,
    theme_color: siteConfig.theme.background.dark,
    categories: ['blog', 'technology', 'personal'], // 应用分类
    lang: siteConfig.locale, // 语言
    dir: 'ltr', // 文本方向：从左到右
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable', // 支持自适应图标
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable', // 支持自适应图标
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    // 快捷方式（可选）
    shortcuts: [
      {
        name: '博客文章',
        short_name: '文章',
        description: '查看所有博客文章',
        url: '/posts',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
      {
        name: '关于',
        short_name: '关于',
        description: '了解更多关于 Viki',
        url: '/about',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
    ],
  }
}
