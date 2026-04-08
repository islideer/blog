/* eslint-disable react-hooks/static-components */
/**
 * UA Badge - 显示用户设备信息
 * 使用图标替代 emoji，支持操作系统和浏览器识别
 */

import { UAParser } from 'ua-parser-js'

import { AndroidIcon } from '@/icons/android'
import { BrowserIcon } from '@/icons/browser'
import { ChromeIcon } from '@/icons/chrome'
import { EdgeIcon } from '@/icons/edge'
import { FirefoxIcon } from '@/icons/firefox'
import { GenericIcon } from '@/icons/generic'
import { IEIcon } from '@/icons/ie'
import { IOSIcon } from '@/icons/ios'
import { IPadOSIcon } from '@/icons/ipados'
import { LinuxIcon } from '@/icons/linux'
import { MacOSIcon } from '@/icons/macos'
import { QQBrowserIcon } from '@/icons/qq-browser'
import { SafariIcon } from '@/icons/safari'
import { Tooltip } from '../tooltip'
import { WeChatIcon } from '@/icons/wechat'
import { WindowsIcon } from '@/icons/windows'

interface UABadgeProps {
  ua: string
}

/**
 * 解析 UA 字符串
 */
function parseUA(uaString: string) {
  const parser = new UAParser(uaString)
  const browser = parser.getBrowser()

  if (/headless/.test(browser.name || '')) {
    browser.name = `无头 ${browser.name?.replace(/\s*headless/i, '').trim() || ''}`
  }

  return {
    model: parser.getDevice().model || '',
    os: parser.getOS(),
    browser: browser,
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

  // Android
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
  if (browserLower.includes('wechat') || browserLower.includes('micromessenger')) return WeChatIcon

  // 主流浏览器
  if (browserLower.includes('chrome')) return ChromeIcon
  if (browserLower.includes('firefox')) return FirefoxIcon
  if (browserLower.includes('safari')) return SafariIcon
  if (browserLower.includes('edge') || browserLower.includes('edg')) return EdgeIcon
  if (browserLower.includes('ie')) return IEIcon

  return BrowserIcon
}

const isTrustedSystem = (osName?: string, model?: string) => {
  const isAndroidK = osName?.toLowerCase() === 'android' && model === 'K'
  return osName && !isAndroidK && !['macos', 'windows'].includes(osName.toLowerCase())
}

export function UABadge({ ua }: UABadgeProps) {
  const { browser, os, model } = parseUA(ua)

  const OSIcon = getOSIcon(os.name)
  const BrowserIconComponent = getBrowserIcon(browser.name)

  const tooltip = (
    os.name
      ? isTrustedSystem(os.name, model) && os.version
        ? `${os.name} ${os.version} / ${browser.name || ''} ${browser.version || ''}`
        : `${os.name} / ${browser.name || ''} ${browser.version || ''}`
      : `${browser.name || ''} ${browser.version || ''}`
  ).trim()

  return (
    <Tooltip content={tooltip}>
      <div className="group relative inline-flex items-center gap-1 text-xs opacity-60">
        <OSIcon className="h-3 w-3" />
        <span className="text-text-tertiary">
          {os.name || '-'}
          {isTrustedSystem(os.name, model) && (
            <span className="mx-1">{os.version?.split('.')[0] || ''}</span>
          )}
        </span>
        <BrowserIconComponent className="h-3 w-3" />
        <span className="text-text-tertiary">
          {browser.name?.replace(/browser/i, '')?.replace(/mobile/i, '') || '-'}
          <span className="mx-1">{browser.version?.split('.')[0] || ''}</span>
        </span>
      </div>
    </Tooltip>
  )
}
