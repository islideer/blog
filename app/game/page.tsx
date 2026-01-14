import { SteamProfile } from '@/components/steam-profile'
import { SteamGameLibrary } from '@/components/steam-game-library'
import { OtherGames } from '@/components/other-games'
import { siteConfig } from '@/lib/config'
import { pagesData } from '@/lib/data'
import { generateCanonicalUrl } from '@/lib/seo'
import { getSteamProfile, getLibraryGames, getRecentlyPlayed } from '@/lib/steam'

import type { Metadata } from 'next'
import { StaticTableOfContents } from '@/components/table-of-contents'

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

export default async function GamePage() {
  // 在服务端并行获取所有 Steam 数据
  const [profile, libraryGames, recentGames] = await Promise.all([
    getSteamProfile(),
    getLibraryGames(),
    getRecentlyPlayed(),
  ])

  return (
    <>
      <StaticTableOfContents
        items={[
          { id: 'title', title: pagesData.game.title },
          { id: 'profile', title: 'Steam 个人资料' },
          { id: 'library', title: 'Steam 游戏' },
          { id: 'other', title: '其他游戏' },
        ]}
      />

      <div className="space-y-8 py-8 sm:space-y-12 sm:py-12">
        {/* Header */}
        <section className="space-y-3" id="title">
          <h1 className="text-3xl font-bold">{pagesData.game.title}</h1>
          <p className="text-text-secondary">{`${pagesData.game.description}。`}</p>
        </section>

        {/* Steam 个人资料卡片 - 传入服务端获取的数据 */}
        <SteamProfile id="profile" steamId={siteConfig.game.steam.id} initialData={profile} />

        {/* Steam 游戏库 - 传入服务端获取的数据 */}
        <SteamGameLibrary
          id="library"
          steamId={siteConfig.game.steam.id}
          initialLibraryGames={libraryGames}
          initialRecentGames={recentGames}
        />

        {/* 其他游戏 */}
        <OtherGames id="other" />
      </div>
    </>
  )
}
