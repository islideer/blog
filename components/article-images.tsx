'use client'

import { useEffect } from 'react'
import mediumZoom from 'medium-zoom'

/**
 * 文章图片增强组件
 * 在客户端为 .prose 内的图片添加点击缩放功能
 * 使用 medium-zoom 原生库，比 React 包装更轻量
 */
export function ArticleImages() {
  useEffect(() => {
    // 获取文章中的所有图片并添加缩放功能
    const zoom = mediumZoom('.prose img', {
      margin: window.innerWidth > 768 ? 36 : 8,
      background: 'var(--color-bg-primary)',
    })

    // 响应式更新 margin
    const handleResize = () => {
      zoom.update({ margin: window.innerWidth > 768 ? 36 : 8 })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      zoom.detach()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return null
}
