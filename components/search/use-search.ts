import { Document } from 'flexsearch'
import { useState, useCallback, useRef } from 'react'

import type { SearchIndexItem } from '@/scripts/generate-search-index'

export interface UseSearchReturn {
  results: SearchIndexItem[]
  isLoading: boolean
  isIndexLoaded: boolean
  search: (query: string) => void
  clearResults: () => void
}

// 类型权重映射（用于排序）
const TYPE_WEIGHTS: Record<SearchIndexItem['type'], number> = {
  post: 5,
  thought: 4,
  'mio-say': 4,
  collection: 3,
  timeline: 2,
  about: 1,
  friend: 1,
}

/**
 * 搜索 Hook
 */
export function useSearch(): UseSearchReturn {
  const [results, setResults] = useState<SearchIndexItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isIndexLoaded, setIsIndexLoaded] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const indexRef = useRef<any>(null)
  const itemsRef = useRef<SearchIndexItem[]>([])

  // 懒加载搜索索引
  const loadIndex = useCallback(async () => {
    if (isIndexLoaded) return

    setIsLoading(true)

    try {
      // 加载索引文件
      const response = await fetch('/search-index.json')
      if (!response.ok) throw new Error('Failed to load search index')

      const data = await response.json()
      itemsRef.current = data.items

      // 初始化 FlexSearch
      const index = new Document({
        document: {
          id: 'id',
          index: ['title', 'excerpt', 'content', 'tags'],
        },
        tokenize: 'full',
        context: {
          resolution: 5,
          depth: 3,
          bidirectional: true,
        },
      })

      // 添加所有项目到索引
      for (const item of data.items) {
        index.add(item)
      }

      indexRef.current = index
      setIsIndexLoaded(true)
    } finally {
      setIsLoading(false)
    }
  }, [isIndexLoaded])

  // 搜索函数
  const search = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setResults([])
        return
      }

      // 确保索引已加载
      if (!isIndexLoaded) {
        await loadIndex()
      }

      if (!indexRef.current) {
        console.error('搜索索引未加载')
        return
      }

      setIsLoading(true)

      try {
        // 执行搜索（不使用 enrich，只获取 ID）
        const searchResults = indexRef.current.search(query, {
          limit: 100,
        })

        // 提取结果 ID
        const ids = new Set<string>()

        // FlexSearch 返回格式：数组的数组（每个字段的结果）
        for (const fieldResults of searchResults) {
          if (Array.isArray(fieldResults)) {
            // 直接是 ID 数组
            for (const id of fieldResults) {
              if (!ids.has(String(id))) {
                ids.add(String(id))
              }
            }
          } else if (fieldResults && Array.isArray(fieldResults.result)) {
            // 包含 result 字段的对象
            for (const id of fieldResults.result) {
              if (!ids.has(String(id))) {
                ids.add(String(id))
              }
            }
          }
        }

        const resultItems: SearchIndexItem[] = Array.from(ids, (id) => {
          return itemsRef.current.find((doc) => doc.id === id)!
        }).filter(Boolean)

        // 排序：可见匹配 > 类型权重 > 时间新鲜度
        const sortedItems = resultItems.toSorted((a, b) => {
          // 1. 类型权重
          const typeWeightA = TYPE_WEIGHTS[a.type] || 0
          const typeWeightB = TYPE_WEIGHTS[b.type] || 0

          if (typeWeightA !== typeWeightB) {
            return typeWeightB - typeWeightA
          }

          // 2. 时间新鲜度（日期越新越靠前）
          const dateA = a.date ? new Date(a.date).getTime() : 0
          const dateB = b.date ? new Date(b.date).getTime() : 0

          return dateB - dateA
        })

        setResults(sortedItems)
      } catch (error) {
        console.error('搜索失败:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    },
    [isIndexLoaded, loadIndex],
  )

  // 清空结果
  const clearResults = useCallback(() => {
    setResults([])
  }, [])

  return {
    results,
    isLoading,
    isIndexLoaded,
    search,
    clearResults,
  }
}
