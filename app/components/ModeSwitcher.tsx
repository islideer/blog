'use client'

import { FiSun, FiMoon } from 'react-icons/fi'
import { useEffect, useState } from 'react'

export const ModeSwitcher = () => {
  const [theme, setTheme] = useState('')
  const [isSystemDark, setIsSystemDark] = useState<boolean>(false)

  const toggleThemeMode = () => {
    let newTheme = ''

    if (!theme) {
      newTheme = isSystemDark ? 'light' : 'dark'
    } else {
      newTheme = theme === 'dark' ? 'light' : 'dark'
    }

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    setTheme(newTheme)
    window.localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    setTheme(window.localStorage.theme)
    setIsSystemDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }, [])

  const isDark = (theme && theme === 'dark') || (!theme && isSystemDark)
  const classs =
    'text-xl text-zinc-800 hover:text-zinc-400 dark:text-zinc-300 dark:hover:text-zinc-400'

  return (
    <button className='ml-3 hover:text-zinc-500 text-zinc-800' onClick={toggleThemeMode}>
      {isDark ? <FiSun className={classs} /> : <FiMoon className={classs} />}
    </button>
  )
}
