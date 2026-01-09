'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

const iconClass = 'sm:h-[18px] sm:w-[18px]'

// Moon 图标（暗色模式）
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={iconClass}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

// Sun 图标（亮色模式）
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={iconClass}
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

// 系统图标（跟随系统）
const SystemIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={iconClass}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)

const emptySubscribe = () => () => {}

// 主题循环顺序：light → dark → system → light
const themeOrder = ['light', 'dark', 'system'] as const
type ThemeType = (typeof themeOrder)[number]

const themeLabels: Record<ThemeType, string> = {
  light: '亮色模式',
  dark: '暗色模式',
  system: '跟随系统',
}

const getNextTheme = (current: string): ThemeType => {
  const currentIndex = themeOrder.indexOf(current as ThemeType)
  const nextIndex = (currentIndex + 1) % themeOrder.length
  return themeOrder[nextIndex]
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  if (!mounted) {
    return (
      <button
        className="text-text-secondary sm:hover:bg-bg-tertiary sm:hover:text-text-primary active:bg-bg-tertiary active:text-text-primary -mr-1 flex h-6 w-6 items-center justify-center rounded-sm sm:mr-0 sm:h-8 sm:w-8"
        aria-label="切换主题"
        title="切换主题"
        disabled
      >
        <SystemIcon />
      </button>
    )
  }

  const currentTheme = (theme ?? 'system') as ThemeType
  const nextTheme = getNextTheme(currentTheme)

  const toggleTheme = () => {
    setTheme(nextTheme)
  }

  const renderIcon = () => {
    switch (currentTheme) {
      case 'light':
        return <SunIcon />
      case 'dark':
        return <MoonIcon />
      default:
        return <SystemIcon />
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-text-secondary sm:hover:bg-bg-tertiary sm:hover:text-text-primary active:bg-bg-tertiary active:text-text-primary -mr-1 flex h-6 w-6 items-center justify-center rounded-sm sm:mr-0 sm:h-8 sm:w-8"
      aria-label={`当前：${themeLabels[currentTheme]}，点击切换到${themeLabels[nextTheme]}`}
      title={`当前：${themeLabels[currentTheme]}，点击切换到${themeLabels[nextTheme]}`}
    >
      {renderIcon()}
    </button>
  )
}
