/**
 * Message Image Zoom - 留言板图片缩放
 * 为留言板内容中的图片添加点击放大功能
 */

'use client'

import { useEffect } from 'react'
import mediumZoom from 'medium-zoom'

export function MessageImageZoom() {
  useEffect(() => {
    // 针对 .message-content 内的图片启用缩放
    let zoom = mediumZoom('.message-content img', {
      margin: window.innerWidth > 768 ? 36 : 8,
      background: 'var(--color-bg-primary, #fff)',
    })

    const handleChange = () => {
      zoom.detach()

      zoom = mediumZoom('.message-content img', {
        margin: window.innerWidth > 768 ? 36 : 8,
        background: 'var(--color-bg-primary, #fff)',
      })
    }

    window.addEventListener('resize', handleChange)

    // 监听 DOM 变化，因为留言内容是动态加载的
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

  return null
}
