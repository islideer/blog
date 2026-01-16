'use client'

import { IconLink } from './icon-link'
import { TravellingsIcon as TravellingsIconBase } from './icons/travellings'

interface TravellingsIconProps {
  href: string
  className?: string
}

export function TravellingsIcon({ href, className }: TravellingsIconProps) {
  return (
    <IconLink
      href={href}
      tooltip="开往 · 友链接力"
      icon={<TravellingsIconBase className="text-text-secondary h-4 w-4 sm:h-4.5 sm:w-4.5" />}
      className={className}
    />
  )
}
