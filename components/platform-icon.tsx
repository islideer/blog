import { WindowsIcon } from '../icons/windows'
import { MacOSIcon } from '../icons/macos'
import { LinuxIcon } from '../icons/linux'
import { GenericIcon } from '../icons/generic'

interface PlatformIconProps {
  platform: string
  className?: string
}

export function PlatformIcon({ platform, className = '' }: PlatformIconProps) {
  const normalizedPlatform = platform.toLowerCase()

  // Windows 图标
  if (normalizedPlatform.includes('windows') || normalizedPlatform.includes('win')) {
    return <WindowsIcon className={className} />
  }

  // macOS 图标
  if (
    normalizedPlatform.includes('mac') ||
    normalizedPlatform.includes('osx') ||
    normalizedPlatform.includes('darwin')
  ) {
    return <MacOSIcon className={className} />
  }

  // Linux 图标
  if (normalizedPlatform.includes('linux')) {
    return <LinuxIcon className={className} />
  }

  // Steam Deck 或其他未知平台，返回通用图标
  return <GenericIcon className={className} />
}
