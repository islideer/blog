'use client'

import { useEffect } from 'react'

export default function ThemeProvider() {
  useEffect(() => {
    if (
      window.localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return <></>
}
