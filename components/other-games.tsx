import Image from 'next/image'
import Link from 'next/link'
import { otherGames, type OtherGame } from '@/lib/data'
import { ImageZoomProvider } from './image-zoom-provider'

export function OtherGames() {
  if (otherGames.length === 0) {
    return null
  }

  return (
    <section className="space-y-4">
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
        其他游戏（在玩的、爱玩的、怀念的）
      </h2>

      <ImageZoomProvider deps={[otherGames]}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {otherGames.map((game: OtherGame) => (
            <div
              key={game.id}
              className="border-border group sm:hover:border-text-tertiary flex flex-col overflow-hidden rounded-lg border"
            >
              {/* 游戏封面 */}
              <div className="bg-bg-secondary relative aspect-video w-full overflow-hidden">
                <Image
                  src={game.cover}
                  alt={game.name}
                  width={240}
                  height={135}
                  data-zoomable
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 游戏信息 */}
              <div className="flex flex-col gap-2 p-3">
                {game.url ? (
                  <Link
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-text-primary text-text-secondary line-clamp-1 truncate text-sm font-medium"
                  >
                    {game.name}
                  </Link>
                ) : (
                  <h3 className="text-text-secondary line-clamp-1 truncate text-sm font-medium">
                    {game.name}
                  </h3>
                )}

                {game.description && (
                  <p className="text-text-tertiary line-clamp-2 text-xs">{game.description}</p>
                )}

                <div className="text-text-tertiary flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                  {/* 平台 */}
                  {game.platforms.length > 0 && (
                    <span className="text-text-secondary">{game.platforms.join(' · ')}</span>
                  )}

                  {/* 游玩时长 */}
                  {game.playtime && (
                    <>
                      {game.platforms.length > 0 && <span className="text-text-tertiary">·</span>}
                      <span className="text-text-tertiary">{game.playtime}</span>
                    </>
                  )}
                </div>
                {/* 成就列表 */}
                {game.achievements && game.achievements.length > 0 && (
                  <ul className="text-text-tertiary list-inside list-disc text-xs">
                    {game.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </ImageZoomProvider>
    </section>
  )
}
