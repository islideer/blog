import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Viki 写东西的地方',
    short_name: 'Viki',
    description: '分享前端技术见解和实验最新 Web 特性。Less is more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    // icons: [
    //   {
    //     src: '/icon-192.png',
    //     sizes: '192x192',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/icon-512.png',
    //     sizes: '512x512',
    //     type: 'image/png',
    //   },
    // ],
  }
}
