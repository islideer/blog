import { siteConfig } from '@/lib/config'
import { SteamGameListClient } from './steam-game-list-client'
import type { LibraryGame, RecentGame } from '@/lib/steam'

interface SteamGameLibraryProps {
  id?: string
  libraryGames: LibraryGame[]
  recentGames: RecentGame[]
}

/**
 * Steam 游戏库组件（纯服务端组件）
 * - 完全在服务端渲染结构
 * - 视图切换和游戏列表由客户端组件处理
 */
export function SteamGameLibrary({ id, libraryGames, recentGames }: SteamGameLibraryProps) {
  // 如果没有数据，显示空状态
  if (libraryGames.length === 0 && recentGames.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase" id={id}>
          Steam 游戏
        </h2>
        <p className="text-text-secondary text-sm">
          暂时找不到 {siteConfig.author.name} 的 Steam 游戏数据
        </p>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      {/* 客户端组件处理视图切换和游戏列表渲染 */}
      <SteamGameListClient id={id} libraryGames={libraryGames} recentGames={recentGames} />
    </section>
  )
}
