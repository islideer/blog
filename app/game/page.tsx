import { SteamProfile } from '@/components/steam-profile'
import { SteamGameLibrary } from '@/components/steam-game-library'
import { OtherGames } from '@/components/other-games'
import { siteConfig } from '@/lib/config'
import { pagesData } from '@/lib/data'
import { generateCanonicalUrl } from '@/lib/seo'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: pagesData.game.title,
  description: pagesData.game.description,
  alternates: {
    canonical: generateCanonicalUrl(pagesData.game.slug),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl(pagesData.game.slug),
    title: `${pagesData.game.title} | ${siteConfig.name}`,
    description: pagesData.game.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${pagesData.game.slug}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: pagesData.game.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pagesData.game.title} | ${siteConfig.name}`,
    description: pagesData.game.description,
    images: [`${pagesData.game.slug}/opengraph-image`],
  },
}

export default function GamePage() {
  return (
    <div className="space-y-8 py-8 sm:space-y-12 sm:py-12">
      {/* Steam 个人资料卡片 */}
      <SteamProfile steamId={siteConfig.game.steam.id} />

      {/* Steam 游戏库 */}
      <SteamGameLibrary steamId={siteConfig.game.steam.id} />

      {/* 其他游戏 */}
      <OtherGames />
    </div>
  )
}
