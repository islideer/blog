/* eslint-disable react-hooks/static-components */
/**
 * UA Badge - 显示用户设备信息
 * 使用图标替代 emoji，支持操作系统和浏览器识别
 */

import { UAParser } from 'ua-parser-js'
import { WindowsIcon } from '@/icons/windows'
import { MacOSIcon } from '@/icons/macos'
import { LinuxIcon } from '@/icons/linux'
import { AndroidIcon } from '@/icons/android'
import { IOSIcon } from '@/icons/ios'
import { IPadOSIcon } from '@/icons/ipados'
import { ChromeIcon } from '@/icons/chrome'
import { SafariIcon } from '@/icons/safari'
import { EdgeIcon } from '@/icons/edge'
import { FirefoxIcon } from '@/icons/firefox'
import { QQBrowserIcon } from '@/icons/qq-browser'
import { WeChatIcon } from '@/icons/wechat'
import { BrowserIcon } from '@/icons/browser'
import { GenericIcon } from '@/icons/generic'
import { Tooltip } from '../tooltip'

interface UABadgeProps {
  ua: string
}

/**
 * 解析 UA 字符串
 */
function parseUA(uaString: string) {
  const parser = new UAParser(uaString)

  return {
    result: parser.getResult(),
    browser: parser.getBrowser(),
    os: parser.getOS(),
  }
}

/**
 * 根据操作系统返回图标组件
 */
function getOSIcon(os?: string) {
  if (!os) return GenericIcon

  const osLower = os.toLowerCase()

  // Windows
  if (osLower.includes('windows')) return WindowsIcon

  // Apple 生态（注意检查顺序：先检查更具体的）
  if (osLower.includes('ipad')) return IPadOSIcon
  if (osLower.includes('ios')) return IOSIcon
  if (osLower.includes('mac')) return MacOSIcon

  // Android & HarmonyOS
  if (osLower.includes('harmony')) return AndroidIcon // HarmonyOS 使用 Android 图标占位
  if (osLower.includes('android')) return AndroidIcon

  // Linux
  if (osLower.includes('linux')) return LinuxIcon

  return GenericIcon
}

/**
 * 根据浏览器返回图标组件
 */
function getBrowserIcon(browser?: string) {
  if (!browser) return BrowserIcon

  const browserLower = browser.toLowerCase()

  // 国内浏览器
  if (browserLower.includes('qq')) return QQBrowserIcon
  if (browserLower.includes('wechat')) return WeChatIcon

  // 主流浏览器
  if (browserLower.includes('chrome')) return ChromeIcon
  if (browserLower.includes('firefox')) return FirefoxIcon
  if (browserLower.includes('safari')) return SafariIcon
  if (browserLower.includes('edge') || browserLower.includes('edg')) return EdgeIcon

  return BrowserIcon
}

const systems = ['macos', 'android', 'windows']
const isTrustedSystem = (osName?: string) => osName && !systems.includes(osName.toLowerCase())

export function UABadge({ ua }: UABadgeProps) {
  const { browser, os } = parseUA(ua)
  const OSIcon = getOSIcon(os.name)
  const BrowserIconComponent = getBrowserIcon(browser.name)

  return (
    <Tooltip
      content={`${os.name} ${isTrustedSystem(os.name) ? os.version : ''} - ${browser.name} ${browser.version}`}
    >
      <div className="group relative inline-flex items-center gap-1 text-xs opacity-60">
        <OSIcon className="h-3 w-3" />
        <span className="text-text-tertiary">
          {os.name}
          {isTrustedSystem(os.name) && (
            <span className="mx-1">{os.version?.split('.')[0] || ''}</span>
          )}
        </span>
        <BrowserIconComponent className="h-3 w-3" />
        <span className="text-text-tertiary">
          {browser.name?.replace(/browser/i, '')?.replace(/mobile/i, '')}
          <span className="mx-1">{browser.version?.split('.')[0] || ''}</span>
        </span>
      </div>
    </Tooltip>
  )
}
