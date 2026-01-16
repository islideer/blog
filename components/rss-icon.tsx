'use client'

import { IconLink } from './icon-link'
import { RSSIcon as RSSIconBase } from './icons/rss'
import { Tooltip } from './tooltip'

interface RSSIconProps {
  href?: string
  tooltip?: string
  className?: string
}

export function RSSIcon({ href, className, tooltip = 'RSS 订阅' }: RSSIconProps) {
  if (href) {
    return (
      <IconLink
        href={href}
        tooltip={tooltip}
        icon={<RSSIconBase className="text-text-secondary h-4 w-4 sm:h-4.5 sm:w-4.5" />}
        className={className}
      />
    )
  }

  return (
    <Tooltip content={tooltip}>
      <div
        className={`${className} flex h-6 w-6 items-center justify-center rounded-sm sm:h-8 sm:w-8`}
      >
        <RSSIconBase className="text-text-secondary h-4 w-4 sm:h-4.5 sm:w-4.5" />
      </div>
    </Tooltip>
  )
}
