import { useEffect, useRef } from 'react'
import { SearchIcon } from '../icons/search'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  isLoading: boolean
}

export function SearchInput({ value, onChange, isLoading }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // 自动聚焦
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="border-border flex items-center gap-3 border-b px-4 py-3 sm:py-4">
      {/* 搜索图标 */}
      <SearchIcon className="text-text-tertiary h-5 w-5 shrink-0" />

      {/* 输入框 */}
      <input
        id="search"
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜索文章、碎碎念、Mio 说、大事记、收藏夹..."
        className="text-text-primary placeholder:text-text-tertiary flex-1 bg-transparent text-base outline-none! active:outline-none! sm:text-lg"
      />

      {/* 加载指示器或 Esc 提示 */}
      {isLoading ? (
        <div className="text-text-tertiary shrink-0 text-xs">
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : (
        <kbd className="text-text-tertiary border-border bg-bg-secondary hidden rounded border px-1.5 py-0.5 text-xs sm:inline-block">
          Esc
        </kbd>
      )}
    </div>
  )
}
