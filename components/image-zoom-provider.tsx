'use client'

import { useEffect } from 'react'
import mediumZoom from 'medium-zoom'

/**
 * 文章图片缩放提供器
 *
 * 在客户端初始化 medium-zoom，作用于所有带 data-zoomable 属性的图片
 */
export function ImageZoomProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let zoom = mediumZoom(`[data-zoomable]`, {
      margin: window.innerWidth > 768 ? 36 : 8,
      background: 'var(--color-bg-primary, #fff)',
    })

    const handleChange = () => {
      zoom.detach()

      zoom = mediumZoom(`[data-zoomable]`, {
        margin: window.innerWidth > 768 ? 36 : 8,
        background: 'var(--color-bg-primary, #fff)',
      })
    }

    window.addEventListener('resize', handleChange)

    const observer = new MutationObserver(handleChange)

    const target = document.querySelector('main') || document.body

    observer.observe(target, {
      childList: true,
      subtree: true,
    })

    return () => {
      zoom.detach()
      observer.disconnect()
      window.removeEventListener('resize', handleChange)
    }
  }, [])

  return <>{children}</>
}
