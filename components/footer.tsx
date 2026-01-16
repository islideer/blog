import { siteConfig } from '@/lib/config'
import Link from 'next/link'

function CopyrightText() {
  return (
    <span className="text-text-secondary">
      © {siteConfig.copyright.year.start}-{siteConfig.copyright.year.end} {siteConfig.author.name}.
      All rights reserved.
    </span>
  )
}

export function LicenseText({ className, short }: { className?: string; short?: boolean }) {
  return (
    <span className={`text-text-tertiary ${className}`}>
      {short ? '文章以' : '除特殊说明外，文章均以'}
      <Link
        href={siteConfig.copyright.license.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-secondary hover:text-text-primary mx-1"
      >
        {siteConfig.copyright.license.name}
      </Link>
      协议共享，转载请注明出处。
    </span>
  )
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Link
        href={siteConfig.author.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-secondary hover:text-text-primary"
      >
        GitHub
      </Link>
      <Link
        href={siteConfig.links.rss}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-secondary hover:text-text-primary"
        title="RSS 订阅"
      >
        RSS 订阅
      </Link>
      <Link
        href={siteConfig.links.travellings}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-secondary hover:text-text-primary hidden sm:inline"
        title="RSS 订阅"
      >
        开往 · 友链接力
      </Link>
      <Link
        href={siteConfig.links.travellings}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-secondary hover:text-text-primary sm:hidden"
        title="RSS 订阅"
      >
        开往
      </Link>
    </div>
  )
}

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-border max-w-3xl border-t px-4 transition-opacity sm:px-6 sm:opacity-60 sm:hover:opacity-100"
    >
      <div className="mx-auto w-full max-w-3xl pt-4 pb-16 sm:pt-6 sm:pb-20">
        {/* 移动端布局 */}
        <div className="block sm:hidden">
          <div className="flex flex-col gap-4 py-2 text-sm">
            <p className="text-text-secondary">{siteConfig.tagline}</p>
            <LicenseText short />
            <SocialLinks className="flex items-center gap-2 text-left" />
            <CopyrightText />
          </div>
        </div>

        {/* 桌面端布局 */}
        <div className="hidden sm:block">
          <div className="flex flex-row justify-between gap-3 text-xs">
            <div className="flex flex-col gap-3 text-left">
              <p className="text-text-secondary">{siteConfig.tagline}</p>
              <LicenseText />
              <CopyrightText />
            </div>
            <SocialLinks className="flex flex-col items-end gap-3 text-right" />
          </div>
        </div>
      </div>
    </footer>
  )
}
