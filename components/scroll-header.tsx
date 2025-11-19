'use client'

import { useEffect } from 'react'

export function ScrollHeader() {
  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY
      const header = document.querySelector('header')

      if (!header) return

      // 向下滚动且滚动超过 header 高度时隐藏
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('header-hidden')
      }
      // 向上滚动时显示
      else if (currentScrollY < lastScrollY) {
        header.classList.remove('header-hidden')
      }

      lastScrollY = currentScrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderVisibility)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return null
}
