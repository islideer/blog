import { useState, useCallback, useTransition, useRef } from 'react'
import { searchContent, type SearchIndexItem } from '@/lib/actions/search'

export type { SearchIndexItem } from '@/lib/actions/search'

export interface UseSearchReturn {
  results: SearchIndexItem[]
  isLoading: boolean
  search: (query: string) => void
  clearResults: () => void
}

export function useSearch(): UseSearchReturn {
  const [results, setResults] = useState<SearchIndexItem[]>([])
  const [isPending, startTransition] = useTransition()
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const requestIdRef = useRef(0)

  const search = useCallback((query: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (!query.trim()) {
      setResults([])
      return
    }

    timerRef.current = setTimeout(() => {
      const id = ++requestIdRef.current
      startTransition(async () => {
        const data = await searchContent(query)
        if (id === requestIdRef.current) setResults(data)
      })
    }, 450)
  }, [])

  const clearResults = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    requestIdRef.current++
    setResults([])
  }, [])

  return {
    results,
    isLoading: isPending,
    search,
    clearResults,
  }
}
