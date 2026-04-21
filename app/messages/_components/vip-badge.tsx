/**
 * VIP Badge - VIP 徽章组件
 * 显示金色 VIP 闪电图标
 */

import { cn } from '@/lib/cn'

interface VipBadgeProps {
  /** 自定义类名 */
  className?: string
  /** 提示文本 */
  title?: string
  /** 尺寸，默认 md */
  size?: 'sm' | 'md' | 'lg'
}

const VIP_BADGE_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAY1BMVEUAAAD/zAD/zQD/xwD/zwD/ywD/zAD/ywD/zQD/zAD/zAD/zAD/zAD/zQD/ygD/ywD/zAD/zAD/////+d///O//5oD/1jD/0iD/31//8r//43D/4GD/3FD/2UD/7qv/6JD/9s/3vr4WAAAAEXRSTlMAv98gEEDQcKCAUO+Qj2CwrzmNzEwAAAGgSURBVEjHpdfRmoIgEIbhAUWU2mrQdG2zuv+r3DpoWZX5kafv/H2cSBEpXulsXWl+ptWpMSVtrmwUL1K22ERNkHNvtlAx7SAtFMNqMLzdcSJ9EGj5xRv6ituKN1VFRi80b0wXwKZ1ucAVZ1TNNV4rvGoHFrt0La+zm37w2Xvf86pdWLQa2o4jqbd10PqRY70fE3Hob//qzuDSBlt/ZXBpha0fWL50kbAtC5VPbLH1Nwk34tSTf3dhFucuOVbf/eGJ5blNwnoWc9Qk7ChjS0ds/V3GNSls/VXG1freHFr/v64NPeb3iyZg1515FuXYboAY254hPudYXixY32ZYjfbcK7asqJbxPfF/H8nKePShn+gz6WScsGyoFO0k2rCVKAlfghU3sUbCt8ReYonkuR/hho5WoK03YRXa9Cds2RDY9c/YakLvmxFadkTg0h20dXi5Rw5vQ7CJE5GN/c2dbHl2ENxzVvtPjlLLw6NOEnwEzLdBV9nHv+xV2wc775AcfWfBZ0KNrSoI5TSg5vNPI1xh1Uo2OR91pjkp/WK6qq0T5C94FL1DBHlUuAAAAABJRU5ErkJggg=='

export function VipBadge({ className, title = 'VIP', size = 'md' }: VipBadgeProps) {
  // 尺寸映射
  const sizeClass = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }[size]

  return (
    <span
      className={cn('border-bg-primary inline-block rounded-full border', sizeClass, className)}
      title={title}
      style={{
        background: `url('${VIP_BADGE_IMAGE}') no-repeat center`,
        backgroundSize: 'contain',
      }}
      aria-label={title}
    />
  )
}
