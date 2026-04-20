import { SearchResultItem } from './search-result-item'
import type { SearchIndexItem } from '@/lib/actions/search'

interface SearchResultsProps {
  results: SearchIndexItem[]
  query: string
  selectedIndex: number
  onItemClick: () => void
}

export function SearchResults({ results, query, selectedIndex, onItemClick }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-text-secondary flex min-h-48 flex-col items-center justify-center p-8 text-center">
        <p className="mb-2 text-base">未找到相关内容</p>
        <p className="text-xs">试试其他关键词</p>
      </div>
    )
  }

  return (
    <div className="divide-border divide-y">
      <div className="text-text-tertiary border-border bg-bg-secondary border-b px-4 py-2 text-xs">
        找到 {results.length} 个结果
      </div>
      {results.map((result, index) => (
        <SearchResultItem
          key={result.id}
          result={result}
          query={query}
          isSelected={index === selectedIndex}
          onClick={onItemClick}
        />
      ))}
    </div>
  )
}
