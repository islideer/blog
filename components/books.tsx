import Link from 'next/link'
import Image from 'next/image'
import { books, type Book } from '@/lib/data'
import { ImageZoomProvider } from './image-zoom-provider'

export function Books({ id }: { id?: string }) {
  if (books.length === 0) {
    return (
      <section className="space-y-4" id={id}>
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">书籍</h2>
        <p className="text-text-tertiary text-sm">暂无书籍数据</p>
      </section>
    )
  }

  return (
    <section className="space-y-4" id={id}>
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">书籍</h2>

      <ImageZoomProvider deps={[books]}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {books.map((book: Book) => (
            <div
              key={book.id}
              className="border-border group sm:hover:border-text-tertiary flex flex-col overflow-hidden rounded-lg border"
            >
              {/* 书籍封面 */}
              <div className="bg-bg-secondary relative aspect-3/4 w-full overflow-hidden">
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={240}
                  height={320}
                  data-zoomable
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 书籍信息 */}
              <div className="flex flex-col gap-2 p-3">
                {book.url ? (
                  <Link
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-text-primary text-text-secondary line-clamp-2 text-sm font-medium"
                  >
                    {book.title}
                  </Link>
                ) : (
                  <h3 className="text-text-secondary line-clamp-2 text-sm font-medium">
                    {book.title}
                  </h3>
                )}

                {book.author && (
                  <p className="text-text-tertiary line-clamp-1 text-xs">{book.author}</p>
                )}

                <div className="text-text-secondary flex flex-wrap items-center gap-x-1 gap-y-1 text-xs">
                  {book.year && <span>{book.year}</span>}
                  {book.rating && (
                    <>
                      {book.year && <span>·</span>}
                      <span>⭐ {book.rating}</span>
                    </>
                  )}
                  {book.genre && book.genre.length > 0 && (
                    <>
                      <span>·</span>
                      <span>{book.genre.join(' · ')}</span>
                    </>
                  )}
                </div>

                {book.description && (
                  <p className="text-text-tertiary line-clamp-2 text-xs">{book.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ImageZoomProvider>
    </section>
  )
}
