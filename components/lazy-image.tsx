'use client'

import { useState, useEffect, useRef } from 'react'
import Image, { type ImageProps } from 'next/image'

export function LazyImage(props: ImageProps) {
  const { src, alt, width, height, className, priority, ...rest } = props
  const [isVisible, setIsVisible] = useState(priority || false)
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

    return () => {
      observer.disconnect()
    }
  }, [isVisible])

  if (isVisible) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        {...rest}
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className={`${className || ''} animate-pulse bg-zinc-100 dark:bg-zinc-800`}
      style={{
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
      }}
    />
  )
}
