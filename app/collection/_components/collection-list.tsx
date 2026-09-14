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
        <p className="text-text-secondary mt-2 text-sm">{category.description}</p>
      </div>

      {/* Items List */}
      <div className="space-y-0.5 sm:space-y-1">
        {category.items.map((item, index) => (
          <div
            key={index}
            className="group hover:bg-bg-tertiary flex items-center justify-between gap-2"
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="link">
              {item.name}
            </a>

            <p className="text-text-secondary flex-1 truncate text-xs sm:text-sm">
              {item.description}
            </p>

            {item.tags && item.tags.length > 0 && (
              <div className="text-text-secondary flex shrink-0 gap-1">
                {item.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-text-secondary text-sm">
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
