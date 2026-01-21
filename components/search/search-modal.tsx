'use client'

import { createPortal } from 'react-dom'
import { useSearch } from './use-search'
import { SearchInput } from './search-input'
import { SearchResults } from './search-results'
import { useState, useEffect, useSyncExternalStore, useRef } from 'react'
import { useStableFn } from '@shined/react-use'

const emptySubscribe = () => () => {}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const { results, isLoading, search, clearResults } = useSearch()

  // 防止 hydration 不匹配
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  const handleClose = useStableFn(onClose)

  // 防抖搜索
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      if (query) {
        search(query)
      } else {
        clearResults()
      }
    }, 300)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [query, search, clearResults])

  // 搜索结果变化时重置选中索引
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(0)
  }, [results])

  // 重置状态
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery('')
      setSelectedIndex(0)
      clearResults()
    }
  }, [isOpen, clearResults])

  // 键盘导航
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // 只在有结果时处理上下键和 Enter
      const hasResults = results.length > 0

      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      } else if (e.key === 'ArrowDown' && hasResults) {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp' && hasResults) {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && hasResults && results[selectedIndex]) {
        e.preventDefault()
        // 导航到选中的结果
        window.location.href = results[selectedIndex].url
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleClose, isOpen, results, selectedIndex])

  // 点击外部关闭
  const handleBackdropClick = useStableFn((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  })

  if (!mounted || !isOpen) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden bg-black/20 px-4 pt-[10vh] pb-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-bg-primary border-border animate-in fade-in zoom-in-95 flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border shadow-lg duration-200">
        {/* 搜索输入框（固定顶部） */}
        <div className="shrink-0">
          <SearchInput value={query} onChange={setQuery} isLoading={isLoading} />
        </div>

        {/* 搜索结果或空状态（可滚动区域） */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {query ? (
            <SearchResults
              results={results}
              query={query}
              selectedIndex={selectedIndex}
              onItemClick={onClose}
            />
          ) : (
            <div className="text-text-secondary flex min-h-48 flex-col items-center justify-center p-8 text-center">
              <p className="mb-2 text-base">输入关键词开始搜索</p>
              <p className="text-xs">支持搜索文章、碎碎念、Mio 说、大事记、收藏夹等内容</p>
              <div className="text-text-tertiary mt-4 flex gap-4 text-xs">
                <span>
                  <kbd className="border-border bg-bg-secondary rounded border px-1.5 py-0.5">
                    ↑↓
                  </kbd>{' '}
                  导航
                </span>
                <span>
                  <kbd className="border-border bg-bg-secondary rounded border px-1.5 py-0.5">
                    Enter
                  </kbd>{' '}
                  打开
                </span>
                <span>
                  <kbd className="border-border bg-bg-secondary rounded border px-1.5 py-0.5">
                    Esc
                  </kbd>{' '}
                  关闭
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
