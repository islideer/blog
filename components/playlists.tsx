import Link from 'next/link'
import Image from 'next/image'
import { playlists, type Playlist } from '@/lib/data'
import { ImageZoomProvider } from './image-zoom-provider'

export function Playlists({ id }: { id?: string }) {
  if (playlists.length === 0) {
    return (
      <section className="space-y-4" id={id}>
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">歌单</h2>
        <p className="text-text-tertiary text-sm">暂无歌单数据</p>
      </section>
    )
  }

  return (
    <section className="space-y-4" id={id}>
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
        歌单{playlists.length ? ` (${playlists.length.toLocaleString()})` : ''}
      </h2>

      <ImageZoomProvider deps={[playlists]}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {playlists.map((playlist: Playlist) => (
            <div
              key={playlist.id}
              className="border-border group sm:hover:border-text-tertiary flex flex-col overflow-hidden rounded-lg border"
            >
              {/* 歌单封面 */}
              <div className="bg-bg-secondary relative aspect-square w-full overflow-hidden">
                <Image
                  src={playlist.cover}
                  alt={playlist.name}
                  width={240}
                  height={240}
                  data-zoomable
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 歌单信息 */}
              <div className="flex flex-col gap-2 p-3">
                {playlist.url ? (
                  <Link
                    href={playlist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-text-primary text-text-secondary line-clamp-2 text-sm font-medium"
                  >
                    {playlist.name}
                  </Link>
                ) : (
                  <h3 className="text-text-secondary line-clamp-2 text-sm font-medium">
                    {playlist.name}
                  </h3>
                )}

                {playlist.creator && (
                  <p className="text-text-tertiary line-clamp-1 text-xs">by {playlist.creator}</p>
                )}

                <div className="text-text-secondary flex flex-wrap items-center gap-x-1 gap-y-1 text-xs">
                  {playlist.song_count && <span>{playlist.song_count} 首歌曲</span>}
                  {playlist.created_date && (
                    <>
                      {playlist.song_count && <span>·</span>}
                      <span>{playlist.created_date}</span>
                    </>
                  )}
                </div>

                {playlist.description && (
                  <p className="text-text-tertiary line-clamp-2 text-xs">{playlist.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ImageZoomProvider>
    </section>
  )
}
