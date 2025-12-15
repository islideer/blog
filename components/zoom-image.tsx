'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import mediumZoom, { type Zoom } from 'medium-zoom'

export function ZoomImage(props: typeof Image extends React.ComponentType<infer P> ? P : never) {
  const imgRef = useRef<HTMLImageElement>(null)
  const zoomRef = useRef<Zoom | null>(null)

  useEffect(() => {
    if (!imgRef.current) return

    zoomRef.current = mediumZoom(imgRef.current, {
      margin: window.innerWidth > 768 ? 36 : 8,
      background: 'var(--color-bg-primary)',
    })

    const handleResize = () => {
      zoomRef.current?.update({ margin: window.innerWidth > 768 ? 36 : 8 })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      zoomRef.current?.detach()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      style={{ background: `url('${props.src}') 50% / cover` }}
      className="image-wrapper rounded-md"
    >
      <Image
        {...props}
        ref={imgRef}
        src={props.src}
        width={props.width ?? 800}
        height={props.height ?? 450}
        className={`h-auto w-full cursor-zoom-in rounded-md ${props.className || ''}`}
        alt={props.alt}
      />
    </div>
  )
}

export function ZoomImageForArticle(
  props: typeof Image extends React.ComponentType<infer P> ? P : never,
) {
  const imgRef = useRef<HTMLImageElement>(null)
  const zoomRef = useRef<Zoom | null>(null)

  useEffect(() => {
    if (!imgRef.current) return

    zoomRef.current = mediumZoom(imgRef.current, {
      margin: window.innerWidth > 768 ? 36 : 8,
      background: 'var(--color-bg-primary)',
    })

    const handleResize = () => {
      zoomRef.current?.update({ margin: window.innerWidth > 768 ? 36 : 8 })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      zoomRef.current?.detach()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Image
      {...props}
      ref={imgRef}
      src={props.src}
      width={props.width ?? 800}
      height={props.height ?? 450}
      className={`h-auto w-full cursor-zoom-in rounded-md ${props.className || ''}`}
      alt={props.alt}
    />
  )
}
