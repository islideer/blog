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
      <div>
        {category.items.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:bg-surface-hover flex items-center gap-1.5 truncate px-1 py-0.5"
          >
            <h3 className="text-text text-xs font-medium">{item.name}</h3>
            <p className="text-text-secondary min-w-0 flex-1 truncate text-[11px]">
              {item.description}
            </p>
            {item.tags && item.tags.length > 0 && (
              <div className="flex shrink-0 gap-1">
                {item.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-text-tertiary text-[11px]">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
