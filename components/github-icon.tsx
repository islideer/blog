'use client'

import { IconLink } from './icon-link'
import { GitHubIcon as GitHubIconBase } from '../icons/github'

interface GitHubIconProps {
  href: string
  className?: string
}

export function GitHubIcon({ href, className }: GitHubIconProps) {
  return (
    <IconLink
      href={href}
      tooltip="GitHub"
      icon={<GitHubIconBase className="text-text-secondary h-4 w-4 sm:h-4.5 sm:w-4.5" />}
      className={className}
    />
  )
}
