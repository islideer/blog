'use client'

import { useEffect } from 'react'
import mediumZoom from 'medium-zoom'

/**
 * 文章图片缩放提供器
 *
 * 在客户端初始化 medium-zoom，作用于所有带 data-zoomable 属性的图片
 */
export function ImageZoomProvider({
  children,
  deps = [],
}: {
  children: React.ReactNode
  deps?: React.DependencyList
}) {
  useEffect(() => {
    const zoom = mediumZoom('[data-zoomable]', {
      margin: window.innerWidth > 768 ? 36 : 8,
      background: 'var(--color-bg-primary, #fff)',
    })

    const handleResize = () => {
      zoom.update({ margin: window.innerWidth > 768 ? 36 : 8 })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      zoom.detach()
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return <>{children}</>
}
