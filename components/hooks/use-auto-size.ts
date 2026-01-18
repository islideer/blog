import { useEffect, useState } from 'react'

export function useAutoSize(options: { xs: number; sm: number }) {
  const [size, setSize] = useState<number>(options.xs)

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 640) {
        setSize(options.sm)
      } else {
        setSize(options.xs)
      }
    }

    updateSize()

    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [options.sm, options.xs])

  return size
}
