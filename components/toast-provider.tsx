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
      offset={{
        bottom: 60,
      }}
      mobileOffset={{
        bottom: 100,
        left: 36,
        right: 36,
      }}
      toastOptions={{
        classNames: {
          toast: 'sm:max-w-md max-w-lg',
          title: 'text-sm font-medium',
          description: 'text-xs',
        },
      }}
    />
  )
}
