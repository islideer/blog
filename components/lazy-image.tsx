'use client'

import { ZoomImage } from './zoom-image'
import { useState, useEffect, useRef } from 'react'
import { type ImageProps } from 'next/image'

import 'react-medium-image-zoom/dist/styles.css'

export function LazyImage(props: ImageProps) {
  const { src, alt, width, height, className, preload, ...rest } = props
  const [isVisible, setIsVisible] = useState(preload || false)
  const containerRef = useRef<HTMLDivElement>(null)

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

  const imageClasses = `w-full aspect-video object-contain ${className || ''}`

  if (isVisible) {
    return (
      <ZoomImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imageClasses}
        preload={preload}
        {...rest}
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className={`${className || ''} aspect-video w-full animate-pulse bg-zinc-100 dark:bg-zinc-800`}
    />
  )
}
