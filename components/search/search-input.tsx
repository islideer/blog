import { SearchIcon } from '../../icons/search'
import { SpinIcon } from '../../icons/spin'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  isLoading: boolean
}

export function SearchInput({ value, onChange, isLoading }: SearchInputProps) {
  return (
    <div className="border-border flex items-center gap-2 border-b px-4 py-3 sm:py-4">
      {/* 搜索图标 */}
      <SearchIcon className="text-text-tertiary h-5 w-5 shrink-0" />

      {/* 输入框 */}
      <input
        id="search"
        type="text"
        autoFocus
        value={value}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜点什么呢..."
        className="text-text-primary placeholder:text-text-tertiary flex-1 bg-transparent px-1 text-base outline-none! active:outline-none! sm:text-lg"
      />

      {/* 加载指示器或 Esc 提示 */}
      {isLoading ? (
        <div className="text-text-tertiary shrink-0 text-xs">
          <SpinIcon className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <kbd className="text-text-tertiary border-border bg-bg-secondary hidden rounded border px-1.5 py-0.5 text-xs sm:inline-block">
          Esc
        </kbd>
      )}
    </div>
  )
}
