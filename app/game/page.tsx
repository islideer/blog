import { SteamProfile } from '@/components/steam-profile'
import { SteamGameLibrary } from '@/components/steam-game-library'
import { OtherGames } from '@/components/other-games'
import { CS2Inventory } from '@/components/cs2-inventory'
import { siteConfig } from '@/lib/config'
import { pagesData } from '@/lib/data'
import { generateCanonicalUrl } from '@/lib/seo'
import { StaticTableOfContents } from '@/components/table-of-contents'
import { getSteamProfile, getLibraryGames, getRecentlyPlayed, getCS2Inventory } from '@/lib/steam'

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

export default async function GamePage() {
  // 在服务端并行获取所有 Steam 数据
  const [profile, libraryGames, recentGames, cs2Inventory] = await Promise.all([
    getSteamProfile(),
    getLibraryGames(),
    getRecentlyPlayed(),
    getCS2Inventory(),
  ])

  return (
    <>
      <StaticTableOfContents
        items={[
          { id: 'profile', title: 'Steam 个人资料', level: 1 },
          { id: 'library', title: 'Steam 游戏', level: 1 },
          { id: 'cs2', title: 'CS2 库存', level: 1 },
          { id: 'other', title: '其他游戏', level: 1 },
        ]}
      />

      <div className="space-y-8 py-8 sm:space-y-12 sm:py-12">
        {/* Header */}
        <section className="space-y-3" id="title">
          <h1 className="text-3xl font-bold">{pagesData.game.title}</h1>
          <p className="text-text-secondary">{`${pagesData.game.description}。`}</p>
        </section>

        {/* Steam 个人资料卡片 - 纯服务端组件 + 客户端刷新按钮 */}
        <SteamProfile id="profile" profile={profile} />

        {/* Steam 游戏库 - 纯服务端组件 + 客户端视图切换 */}
        <SteamGameLibrary id="library" libraryGames={libraryGames} recentGames={recentGames} />

        {/* CS2 库存 - 纯服务端组件 */}
        <CS2Inventory id="cs2" items={cs2Inventory} />

        {/* 其他游戏 - 纯 SSR 数据 */}
        <OtherGames id="other" />
      </div>
    </>
  )
}
