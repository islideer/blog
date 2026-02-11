'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * 路由变化时自动滚动到顶部
 * 用于文章详情页等需要重置滚动位置的场景
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
