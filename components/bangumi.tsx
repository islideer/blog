import Link from 'next/link'
import Image from 'next/image'
import { ImageZoomProvider } from './image-zoom-provider'

import type { BangumiItem } from '@/lib/bangumi'

interface BangumiListProps {
  id?: string
  bangumi: BangumiItem[]
}

export function Bangumi({ id, bangumi }: BangumiListProps) {
  if (bangumi.length === 0) {
    return (
      <section className="space-y-4" id={id}>
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">追番</h2>
        <p className="text-text-tertiary text-sm">暂无追番数据</p>
      </section>
    )
  }

  return (
    <section className="space-y-4" id={id}>
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">追番</h2>

      <ImageZoomProvider deps={[bangumi]}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {bangumi.map((item) => (
            <div
              key={item.season_id}
              className="border-border group sm:hover:border-text-tertiary flex flex-col overflow-hidden rounded-lg border"
            >
              {/* 番剧封面 */}
              <div className="bg-bg-secondary relative aspect-square w-full overflow-hidden">
                <Image
                  src={item.square_cover || item.cover}
                  alt={item.title}
                  width={240}
                  height={240}
                  data-zoomable
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                {/* 徽章 */}
                {item.badge && (
                  <div className="absolute top-2 right-2 rounded bg-pink-400 px-1 py-0.5 text-xs font-medium text-white">
                    {item.badge}
                  </div>
                )}
              </div>

              {/* 番剧信息 */}
              <div className="flex flex-col gap-2 p-3">
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-primary text-text-secondary line-clamp-1 truncate text-sm font-medium"
                >
                  {item.title}
                </Link>

                {item.subtitle && (
                  <p className="text-text-tertiary line-clamp-1 text-xs">{item.subtitle}</p>
                )}

                <div className="text-text-secondary flex flex-wrap items-center gap-x-0.5 gap-y-1 text-xs">
                  {item.areas && item.areas.length > 0 && (
                    <span>{item.areas.map((e) => e.name).join('·')}</span>
                  )}
                  {item.rating && (
                    <>
                      {item.areas && item.areas.length && <span>·</span>}
                      <span>{item.rating.score}分</span>
                    </>
                  )}
                  {item.styles && item.styles.length ? (
                    <>
                      <span>·</span>
                      {item.styles.slice(0, 2).join('/')}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ImageZoomProvider>
    </section>
  )
}
