'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { Tooltip } from './tooltip'
import { MoonIcon } from '../icons/moon'
import { SunIcon } from '../icons/sun'
import { SystemIcon } from '../icons/system'

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

  const iconClass = 'h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform group-active/btn:scale-90'

  if (!mounted) {
    return (
      <Tooltip content="切换主题">
        <button
          className="group/btn text-text-secondary sm:hover:bg-bg-tertiary flex h-6 w-6 items-center justify-center rounded-sm transition-colors sm:h-8 sm:w-8"
          aria-label="切换主题"
          disabled
        >
          <SystemIcon className={iconClass} />
        </button>
      </Tooltip>
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
        return <SunIcon className={iconClass} />
      case 'dark':
        return <MoonIcon className={iconClass} />
      default:
        return <SystemIcon className={iconClass} />
    }
  }

  const tooltipContent = `${themeLabels[currentTheme]} · 点击切换到${themeLabels[nextTheme]}`

  return (
    <Tooltip content={tooltipContent}>
      <button
        onClick={toggleTheme}
        className="group text-text-secondary sm:hover:bg-bg-tertiary flex h-6 w-6 items-center justify-center rounded-sm transition-colors sm:h-8 sm:w-8"
        aria-label={`当前：${themeLabels[currentTheme]}，点击切换到 ${themeLabels[nextTheme]}`}
      >
        {renderIcon()}
      </button>
    </Tooltip>
  )
}
