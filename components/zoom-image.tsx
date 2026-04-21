'use client'

import Zoom from 'react-medium-image-zoom'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { useState, useEffect } from 'react'

import 'react-medium-image-zoom/dist/styles.css'

function useAutoMargin(initialMargin: number = 20) {
  const [zoomMargin, setZoomMargin] = useState(initialMargin)

  useEffect(() => {
    const updateMargin = () => setZoomMargin(window.innerWidth > 768 ? 36 : 8)
    updateMargin()
    window.addEventListener('resize', updateMargin)
    return () => window.removeEventListener('resize', updateMargin)
  }, [])

  return zoomMargin
}

export function ZoomImage(props: typeof Image extends React.ComponentType<infer P> ? P : never) {
  const zoomMargin = useAutoMargin()
  const { preload: _, ...imageProps } = props as typeof props & { preload?: boolean }

  return (
    <Zoom zoomMargin={zoomMargin}>
      <div
        style={{ background: `url('${props.src}') 50% / cover` }}
        className="image-wrapper rounded-md"
      >
        <Image
          {...imageProps}
          src={props.src}
          width={props.width ?? 800}
          height={props.height ?? 450}
          className={cn('h-auto w-full rounded-md', props.className)}
          alt={props.alt}
        />
      </div>
    </Zoom>
  )
}

export function ZoomImageForArticle(
  props: typeof Image extends React.ComponentType<infer P> ? P : never,
) {
  const zoomMargin = useAutoMargin()

  return (
    <Zoom zoomMargin={zoomMargin} wrapElement="span">
      <Image
        {...props}
        src={props.src}
        width={props.width ?? 800}
        height={props.height ?? 450}
        className={cn('h-auto w-full rounded-md', props.className)}
        alt={props.alt}
      />
    </Zoom>
  )
}
