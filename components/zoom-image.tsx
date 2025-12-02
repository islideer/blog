'use client'

import Zoom from 'react-medium-image-zoom'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import 'react-medium-image-zoom/dist/styles.css'

export function ZoomImage(props: typeof Image extends React.ComponentType<infer P> ? P : never) {
  const [zoomMargin, setZoomMargin] = useState(20)

  useEffect(() => {
    const updateMargin = () => setZoomMargin(window.innerWidth > 768 ? 36 : 8)
    updateMargin()
    window.addEventListener('resize', updateMargin)
    return () => window.removeEventListener('resize', updateMargin)
  }, [])

  return (
    <Zoom zoomMargin={zoomMargin} wrapElement="span">
      <Image
        {...props}
        src={props.src}
        width={props.width ?? 800}
        height={props.height ?? 600}
        className={`h-auto w-full rounded-md ${props.className || ''}`}
        alt={props.alt}
      />
    </Zoom>
  )
}
