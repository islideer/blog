import Link from 'next/link'

import type { CollectionCategory } from '@/lib/data'

interface CollectionListProps {
  category: CollectionCategory
  id?: string
}

export function CollectionList({ category, id }: CollectionListProps) {
  return (
    <section className="space-y-2">
      {/* Section Header */}
      <div>
        <h2 className="text-base font-bold" id={id}>
          {category.title}
        </h2>
        <p className="text-text-secondary text-[11px]">{category.description}</p>
      </div>

      {/* Items List */}
      <div className="space-y-0.5 sm:space-y-1">
        {category.items.map((item, index) => (
          <div key={index} className="group flex items-center justify-between">
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center truncate"
            >
              <h3 className="text-text mr-1 text-xs font-medium sm:mr-2 sm:text-sm">{item.name}</h3>
              <p className="text-text-secondary flex-1 truncate text-xs sm:text-sm">
                {item.description}
              </p>
            </Link>

            {item.tags && item.tags.length > 0 && (
              <div className="text-text-secondary flex shrink-0 gap-1">
                {item.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-text-tertiary text-[11px] sm:text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
