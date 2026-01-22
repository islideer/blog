'use client'

import { cn } from '@/lib/cn'
import { Tooltip } from './tooltip'

import type { ReactNode } from 'react'

interface IconLinkProps {
  href: string
  tooltip: string
  icon: ReactNode
  className?: string
  iconClassName?: string
}

export function IconLink({ href, tooltip, icon, className, iconClassName }: IconLinkProps) {
  return (
    <Tooltip content={tooltip}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'no-icon text-text-secondary sm:hover:bg-bg-tertiary sm:hover:text-text-primary active:bg-bg-tertiary active:text-text-primary flex h-6 w-6 items-center justify-center rounded-sm sm:mr-0 sm:h-8 sm:w-8',
          className,
        )}
      >
        <div className={iconClassName}>{icon}</div>
      </a>
    </Tooltip>
  )
}
