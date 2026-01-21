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
  collection: 4,
  thought: 3,
  'mio-say': 3,
  timeline: 2,
  friend: 2,
  about: 1,
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

      console.log(`🔍 搜索索引加载完成：${data.items.length} 个项目`)
    } catch (error) {
      console.error('加载搜索索引失败:', error)
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
        const resultItems: SearchIndexItem[] = []

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

        // 根据 ID 从原始数据中获取完整文档
        for (const id of ids) {
          const item = itemsRef.current.find((doc) => doc.id === id)
          if (item) {
            resultItems.push(item)
          }
        }

        // 提取查询关键词（用于检查可见匹配）
        const queryKeywords = query
          .trim()
          .toLowerCase()
          .split(/\s+/)
          .filter((k) => k.length > 0)

        // 排序：可见匹配 > 类型权重 > 时间新鲜度
        resultItems.toSorted((a, b) => {
          // 1. 优先级：标题或摘要中有可见匹配的排在前面
          const aHasVisibleMatch = queryKeywords.some(
            (keyword) =>
              a.title.toLowerCase().includes(keyword) ||
              (a.excerpt || '').toLowerCase().includes(keyword),
          )

          const bHasVisibleMatch = queryKeywords.some(
            (keyword) =>
              b.title.toLowerCase().includes(keyword) ||
              (b.excerpt || '').toLowerCase().includes(keyword),
          )

          if (aHasVisibleMatch !== bHasVisibleMatch) {
            return aHasVisibleMatch ? -1 : 1
          }

          // 2. 类型权重
          const typeWeightA = TYPE_WEIGHTS[a.type] || 0
          const typeWeightB = TYPE_WEIGHTS[b.type] || 0

          if (typeWeightA !== typeWeightB) {
            return typeWeightB - typeWeightA
          }

          // 3. 时间新鲜度（日期越新越靠前）
          const dateA = new Date(a.date).getTime()
          const dateB = new Date(b.date).getTime()

          return dateB - dateA
        })

        setResults(resultItems)
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
