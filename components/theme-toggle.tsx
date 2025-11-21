'use client'

import { useLayoutEffect, useState, useSyncExternalStore } from 'react'

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
    className="sm:h-[18px] sm:w-[18px]"
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
    className="sm:h-[18px] sm:w-[18px]"
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

const emptySubscribe = () => () => {}

const getSnapshot = () => {
  return typeof window !== 'undefined' ? 'client' : 'server'
}

const getServerSnapshot = () => {
  return 'server'
}

export function ThemeToggle() {
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot)

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'

    // 优先读取 localStorage
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      return stored
    }

    // 其次检测系统偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  // 监听系统主题变化
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      // 只有当 localStorage 没有设置时，才跟随系统主题
      const stored = localStorage.getItem('theme')

      if (!stored) {
        const newTheme = e.matches ? 'dark' : 'light'
        setTheme(newTheme)
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
  }

  if (mounted === 'server') {
    return (
      <button
        className="text-text-secondary hover:bg-bg-tertiary hover:text-text-primary -mr-1 flex h-6 w-6 items-center justify-center rounded-xs transition-colors sm:mr-0 sm:h-8 sm:w-8"
        aria-label="切换主题"
        title="切换主题"
        disabled
      >
        <MoonIcon />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-text-secondary hover:bg-bg-tertiary hover:text-text-primary -mr-1 flex h-6 w-6 items-center justify-center rounded-xs transition-colors sm:mr-0 sm:h-8 sm:w-8"
      aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
      title={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
