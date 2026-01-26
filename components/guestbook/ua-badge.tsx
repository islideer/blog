/**
 * UA Badge - 显示用户设备信息
 * 右下角小图标 + Tooltip
 * 接收原始 UA 字符串，渲染时解析
 */

import { UAParser } from 'ua-parser-js'

interface UABadgeProps {
  ua: string
}

/**
 * 解析 UA 字符串
 */
function parseUA(uaString: string) {
  const parser = new UAParser(uaString)
  return {
    browser: parser.getBrowser().name,
    os: parser.getOS().name,
    device: parser.getDevice().type || 'Desktop',
  }
}

/**
 * 根据操作系统返回 Emoji 图标
 */
function getOSIcon(os?: string): string {
  if (!os) return '💻'

  const osLower = os.toLowerCase()
  if (osLower.includes('windows')) return '🪟'
  if (osLower.includes('mac') || osLower.includes('ios')) return '🍎'
  if (osLower.includes('android')) return '🤖'
  if (osLower.includes('linux')) return '🐧'

  return '💻'
}

/**
 * 根据浏览器返回 Emoji 图标
 */
function getBrowserIcon(browser?: string): string {
  if (!browser) return '🌐'

  const browserLower = browser.toLowerCase()
  if (browserLower.includes('chrome')) return '🌐'
  if (browserLower.includes('firefox')) return '🦊'
  if (browserLower.includes('safari')) return '🧭'
  if (browserLower.includes('edge')) return '🌊'

  return '🌐'
}

/**
 * 格式化设备信息为可读文本
 */
function formatDeviceInfo(browser?: string, os?: string, device?: string): string {
  const parts: string[] = []

  if (os) parts.push(os)
  if (browser) parts.push(browser)
  if (device && device !== 'Desktop') parts.push(device)

  return parts.join(' · ') || '未知设备'
}

export function UABadge({ ua }: UABadgeProps) {
  const { browser, os, device } = parseUA(ua)
  const osIcon = getOSIcon(os)
  const browserIcon = getBrowserIcon(browser)
  const deviceInfo = formatDeviceInfo(browser, os, device)

  return (
    <div className="group relative inline-flex items-center gap-0.5 text-xs opacity-60">
      <span aria-label={os || '操作系统'}>{osIcon}</span>
      <span aria-label={browser || '浏览器'}>{browserIcon}</span>

      {/* Tooltip */}
      <div className="pointer-events-none absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-md bg-bg-tertiary px-2 py-1 text-xs text-text-secondary shadow-lg group-hover:block">
        {deviceInfo}
        <div className="absolute right-2 top-full h-0 w-0 border-4 border-transparent border-t-bg-tertiary" />
      </div>
    </div>
  )
}
