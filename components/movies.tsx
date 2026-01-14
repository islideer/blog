import Link from 'next/link'
import Image from 'next/image'
import { movies, type Movie } from '@/lib/data'
import { ImageZoomProvider } from './image-zoom-provider'

export function Movies({ id }: { id?: string }) {
  if (movies.length === 0) {
    return (
      <section className="space-y-4" id={id}>
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">电影</h2>
        <p className="text-text-tertiary text-sm">暂无电影数据</p>
      </section>
    )
  }

  return (
    <section className="space-y-4" id={id}>
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">电影</h2>

      <ImageZoomProvider deps={[movies]}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {movies.map((movie: Movie) => (
            <div
              key={movie.id}
              className="border-border group sm:hover:border-text-tertiary flex flex-col overflow-hidden rounded-lg border"
            >
              {/* 电影封面 */}
              <div className="bg-bg-secondary relative aspect-3/4 w-full overflow-hidden">
                <Image
                  src={movie.cover}
                  alt={movie.title}
                  width={240}
                  height={320}
                  data-zoomable
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 电影信息 */}
              <div className="flex flex-col gap-2 p-3">
                {movie.url ? (
                  <Link
                    href={movie.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-text-primary text-text-secondary line-clamp-2 text-sm font-medium"
                  >
                    {movie.title}
                  </Link>
                ) : (
                  <h3 className="text-text-secondary line-clamp-2 text-sm font-medium">
                    {movie.title}
                  </h3>
                )}

                {movie.director && (
                  <p className="text-text-tertiary line-clamp-1 text-xs">{movie.director}</p>
                )}

                <div className="text-text-secondary flex flex-wrap items-center gap-x-1 gap-y-1 text-xs">
                  {movie.year && <span>{movie.year}</span>}
                  {movie.rating && (
                    <>
                      {movie.year && <span>·</span>}
                      <span>⭐ {movie.rating}</span>
                    </>
                  )}
                  {movie.genre && movie.genre.length > 0 && (
                    <>
                      <span>·</span>
                      <span>{movie.genre.join(' · ')}</span>
                    </>
                  )}
                </div>

                {movie.description && (
                  <p className="text-text-tertiary line-clamp-2 text-xs">{movie.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ImageZoomProvider>
    </section>
  )
}
