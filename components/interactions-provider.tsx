'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { InteractionCounts } from '@/lib/interactions'

interface InteractionsContextValue {
  counts: InteractionCounts
  isLoading: boolean
}

const InteractionsContext = createContext<InteractionsContextValue>({
  counts: {},
  isLoading: true,
})

export function useInteractions() {
  return useContext(InteractionsContext)
}

interface InteractionsProviderProps {
  type: string
  ids: string[]
  children: ReactNode
}

export function InteractionsProvider({ type, ids, children }: InteractionsProviderProps) {
  const [counts, setCounts] = useState<InteractionCounts>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (ids.length === 0) {
      setIsLoading(false)
      return
    }

    const idsParam = ids.join(',')

    fetch(`/api/interactions/${type}?ids=${idsParam}`)
      .then((res) => res.json())
      .then((data) => {
        setCounts(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to fetch interactions:', error)
        setIsLoading(false)
      })
  }, [type, ids.join(',')])

  return (
    <InteractionsContext.Provider value={{ counts, isLoading }}>
      {children}
    </InteractionsContext.Provider>
  )
}
