'use client'

import { cn } from '@/lib/cn'
import { ZoomImage } from './zoom-image'
import { useState, useEffect, useRef } from 'react'

import type { ImageProps } from 'next/image'

interface LazyImageProps extends ImageProps {
  preload?: boolean
}

export function LazyImage({ preload, className, ...rest }: LazyImageProps) {
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
      { rootMargin: '200px' },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  if (isVisible) {
    return (
      <ZoomImage
        {...rest}
        className={cn('w-full aspect-video object-contain', className)}
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn('bg-bg-tertiary aspect-video w-full animate-pulse', className)}
    />
  )
}
