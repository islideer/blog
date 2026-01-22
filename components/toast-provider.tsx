'use client'

import { Toaster } from 'sonner'
import { useTheme } from 'next-themes'

export function ToastProvider() {
  const { theme } = useTheme()

  return (
    <Toaster
      theme={theme as 'light' | 'dark' | 'system'}
      position="bottom-center"
      expand={false}
      toastOptions={{
        classNames: {
          toast: 'sm:max-w-md',
          title: 'text-sm font-medium',
          description: 'text-xs',
        },
      }}
    />
  )
}
