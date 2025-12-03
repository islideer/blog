'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { siteConfig } from '@/lib/config'

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const TitleTag = isHome ? 'h1' : 'div'

  return (
    <header
      role="banner"
      className="group border-border bg-bg-primary/80 sticky top-0 z-40 border-b backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8">
        <Link href="/" passHref className="no-underline">
          <div>
            <TitleTag className="text-text-primary text-sm font-semibold sm:text-base">
              {siteConfig.name}
            </TitleTag>
            <p className="text-text-tertiary hidden text-xs leading-tight sm:block">
              {siteConfig.tagline}
            </p>
          </div>
        </Link>

        <nav role="navigation" aria-label="主导航" className="flex items-center gap-1.5 sm:gap-4 sm:opacity-60 sm:group-hover:opacity-100">
          <Link
            href="/posts"
            className="text-text-secondary hover:text-text-primary text-xs sm:text-sm"
          >
            文章
          </Link>
          <Link
            href="/thoughts"
            className="text-text-secondary hover:text-text-primary text-xs sm:text-sm"
          >
            碎碎念
          </Link>
          <Link
            href="/mio-says"
            className="text-text-secondary hover:text-text-primary text-xs sm:text-sm"
          >
            Mio 说
          </Link>
          <Link
            href="/timeline"
            className="text-text-secondary hover:text-text-primary text-xs sm:text-sm"
          >
            大事记
          </Link>
          <Link
            href="/about"
            className="text-text-secondary hover:text-text-primary text-xs sm:text-sm"
          >
            关于
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
