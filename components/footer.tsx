import { siteConfig } from '@/lib/config'

function CopyrightText() {
  return (
    <span className="text-text-secondary">
      © {siteConfig.copyright.year.start}-{siteConfig.copyright.year.end} {siteConfig.author.name}.
    </span>
  )
}

function LicenseText() {
  return (
    <span className="text-text-tertiary">
      文章以
      <a
        href={siteConfig.copyright.license.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-secondary hover:text-text-primary mx-1"
      >
        {siteConfig.copyright.license.name}
      </a>
      协议共享，转载请注明出处。
    </span>
  )
}

function SocialLinks({ center = false }: { center?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${center ? 'justify-center' : ''}`}>
      <a
        href={siteConfig.author.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-secondary hover:text-text-primary"
      >
        GitHub
      </a>
      <a
        href={siteConfig.links.rss}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-secondary hover:text-text-primary"
        title="RSS 订阅"
      >
        RSS 订阅
      </a>
    </div>
  )
}

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-border max-w-3xl border-t px-4 transition-opacity sm:px-6 sm:opacity-60 sm:hover:opacity-100"
    >
      <div className="mx-auto w-full max-w-3xl py-4 sm:py-6">
        {/* 移动端布局 */}
        <div className="flex flex-col gap-4 py-2 text-sm sm:hidden">
          <LicenseText />
          <div className="flex justify-between gap-2">
            <CopyrightText />
            <SocialLinks />
          </div>
        </div>
        {/* 桌面端布局 */}
        <div className="hidden gap-4 text-xs sm:flex sm:flex-row sm:items-center sm:justify-between">
          <div className="text-left">
            <CopyrightText />
            <br className="sm:hidden" />
          </div>
          <div className="text-left">
            <LicenseText />
          </div>
          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}
