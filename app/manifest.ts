import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { pagesData } from '@/lib/data'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    scope: '/', // 应用范围
    display: siteConfig.pwa.display as 'standalone',
    orientation: 'portrait-primary', // 首选竖屏方向
    background_color: siteConfig.theme.background.light,
    theme_color: siteConfig.theme.background.dark,
    categories: ['blog', 'technology', 'personal', 'life'], // 应用分类
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
    shortcuts: Object.values(pagesData).map((page) => ({
      name: page.title,
      short_name: page.title,
      description: page.description,
      url: `/${page.slug}`,
      icons: [{ src: '/icon-192.png', sizes: '192x192' }],
    })),
  }
}
