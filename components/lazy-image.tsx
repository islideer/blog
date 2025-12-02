'use client'

import Zoom from 'react-medium-image-zoom'
import { useState, useEffect, useRef } from 'react'
import Image, { type ImageProps } from 'next/image'

import 'react-medium-image-zoom/dist/styles.css'

export function LazyImage(props: ImageProps) {
  const { src, alt, width, height, className, preload, ...rest } = props
  const [isVisible, setIsVisible] = useState(preload || false)
  const [zoomMargin, setZoomMargin] = useState(20)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMargin = () => {
      // PC 端留白更多 (45px)，移动端留白较少 (10px) 以尽可能显示大图
      setZoomMargin(window.innerWidth > 768 ? 45 : 10)
    }
    updateMargin()
    window.addEventListener('resize', updateMargin)
    return () => window.removeEventListener('resize', updateMargin)
  }, [])

  useEffect(() => {
    if (isVisible) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '200px',
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const imageClasses = `w-full object-cover aspect-video ${className || ''}`

  if (isVisible) {
    return (
      <Zoom zoomMargin={zoomMargin}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          preload={preload}
          {...rest}
        />
      </Zoom>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`${className || ''} aspect-video w-full animate-pulse bg-zinc-100 dark:bg-zinc-800`}
    />
  )
}
