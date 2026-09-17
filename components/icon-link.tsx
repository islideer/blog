'use client'

import { cn } from 'cn'
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
          'group text-text-primary sm:hover:bg-bg-tertiary active:bg-bg-tertiary flex h-5 w-5 items-center justify-center rounded-sm sm:mr-0 sm:h-7 sm:w-7',
          className,
        )}
      >
        <div className={iconClassName}>{icon}</div>
      </a>
    </Tooltip>
  )
}
