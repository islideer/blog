'use client'

import Link from 'next/link'
import { Tooltip } from './tooltip'

interface RSSIconProps {
  href?: string
  tooltip?: string
  className?: string
}

function Icon() {
  return (
    <svg
      className="text-text-secondary h-4 w-4 sm:h-4.5 sm:w-4.5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="24"
      height="24"
    >
      <path
        fill="currentColor"
        d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27zm0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93z"
      />
    </svg>
  )
}

export function RSSIcon({ href, className, tooltip = 'RSS 订阅' }: RSSIconProps) {
  if (href) {
    return (
      <Tooltip content={tooltip}>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${className} no-icon text-text-secondary sm:hover:bg-bg-tertiary sm:hover:text-text-primary active:bg-bg-tertiary active:text-text-primary flex h-6 w-6 items-center justify-center rounded-sm sm:h-8 sm:w-8`}
        >
          <Icon />
        </Link>
      </Tooltip>
    )
  }

  return (
    <Tooltip content={tooltip}>
      <div
        className={`${className} flex h-6 w-6 items-center justify-center rounded-sm sm:h-8 sm:w-8`}
      >
        <Icon />
      </div>
    </Tooltip>
  )
}
