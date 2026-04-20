'use client'

import { useState, useEffect } from 'react'
import { SearchIcon } from '../../icons/search'
import { SearchModal } from './search-modal'
import { Tooltip } from '../tooltip'

export function SearchTrigger() {
  const [isOpen, setIsOpen] = useState(false)

  // 监听快捷键 Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <Tooltip content="搜索 · Cmd+K">
        <button
          onClick={() => setIsOpen(true)}
          className="group/btn text-text-secondary sm:hover:bg-bg-tertiary flex h-6 w-6 items-center justify-center rounded-sm transition-colors sm:h-8 sm:w-8"
          aria-label="打开搜索"
        >
          <SearchIcon className="h-4 w-4 transition-transform group-active/btn:scale-90 sm:h-4.5 sm:w-4.5" />
        </button>
      </Tooltip>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
