import { siteConfig } from '@/lib/config'

function CopyrightText() {
  return (
    <span className="text-text-secondary">
      © {siteConfig.copyright.year.start}-{siteConfig.copyright.year.end} {siteConfig.author.name}
    </span>
  )
}

function LicenseText() {
  return (
    <span>
      文章以{' '}
      <a
        href={siteConfig.copyright.license.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-text-secondary"
      >
        {siteConfig.copyright.license.name}
      </a>{' '}
      协议共享，转载请注明出处
    </span>
  )
}

function SocialLinks({ center = false }: { center?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${center ? 'justify-center' : ''}`}>
      <a
        href={siteConfig.links.github}
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
      className="border-border border-t transition-opacity sm:opacity-60 sm:hover:opacity-100"
    >
      <div className="mx-auto w-full p-4 sm:p-6 lg:p-8">
        {/* 移动端布局 */}
        <div className="flex flex-col gap-4 text-sm sm:hidden">
          <SocialLinks center />
          <div className="text-text-tertiary text-center">
            <LicenseText />
          </div>
          <div className="text-text-tertiary text-center">
            <CopyrightText />
          </div>
        </div>
        {/* 桌面端布局 */}
        <div className="hidden gap-4 text-sm sm:flex sm:flex-row sm:items-center sm:justify-between">
          <div className="text-text-tertiary text-left">
            <CopyrightText />
            <br className="sm:hidden" />
          </div>
          <div className="text-text-tertiary text-left">
            <LicenseText />
          </div>
          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}
