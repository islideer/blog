import { cn } from '@/lib/cn'

interface PaginationProps {
  currentPage: number
  totalPages: number
  buildHref: (page: number) => string
}

type PageItem = number | 'ellipsis'

function generatePages(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: PageItem[] = [1]
  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)

  if (left > 2) pages.push('ellipsis')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('ellipsis')
  pages.push(total)

  return pages
}

const itemClass = cn(
  'inline-flex size-8 items-center justify-center rounded-md text-xs sm:text-sm',
  'text-text-secondary transition-colors no-underline',
)

const activeItemClass = cn(
  itemClass,
  'group/btn sm:hover:bg-bg-secondary sm:hover:text-text-primary active:bg-bg-secondary active:text-text-primary no-icon',
)

export function Pagination({ currentPage, totalPages, buildHref }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = generatePages(currentPage, totalPages)
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav aria-label="分页" className="flex items-center justify-center gap-1">
      {/* 上一页 */}
      {hasPrev ? (
        <a href={buildHref(currentPage - 1)} className={activeItemClass}>
          <span className="transition-transform group-active/btn:scale-90">
            <Chevron direction="left" />
          </span>
        </a>
      ) : (
        <span className={cn(itemClass, 'cursor-not-allowed opacity-30')}>
          <Chevron direction="left" />
        </span>
      )}

      {/* 页码 */}
      {pages.map((item, i) =>
        item === 'ellipsis' ? (
          <span key={`e${i}`} className={cn(itemClass, 'cursor-default')}>
            …
          </span>
        ) : item === currentPage ? (
          <span
            key={item}
            className={cn(itemClass, 'text-text-primary font-medium')}
            aria-current="page"
          >
            {item}
          </span>
        ) : (
          <a
            key={item}
            href={buildHref(item)}
            className={activeItemClass}
          >
            <span className="transition-transform group-active/btn:scale-90">{item}</span>
          </a>
        ),
      )}

      {/* 下一页 */}
      {hasNext ? (
        <a
          href={buildHref(currentPage + 1)}
          className={activeItemClass}
        >
          <span className="transition-transform group-active/btn:scale-90">
            <Chevron direction="right" />
          </span>
        </a>
      ) : (
        <span className={cn(itemClass, 'cursor-not-allowed opacity-30')}>
          <Chevron direction="right" />
        </span>
      )}
    </nav>
  )
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline
        points={direction === 'left' ? '15 18 9 12 15 6' : '9 6 15 12 9 18'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
