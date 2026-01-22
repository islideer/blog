'use client'

import Link from 'next/link'
import { cn } from '@/lib/cn'
import { RSSIcon } from './rss-icon'
import { useState } from 'react'
import { pages } from '@/lib/data'
import { siteConfig } from '@/lib/config'
import { GitHubIcon } from './github-icon'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'
import { TravellingsIcon } from './travellings-iocn'
import { SearchTrigger } from './search/search-trigger'

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const TitleTag = isHome ? 'h1' : 'div'
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  return (
    <header
      role="banner"
      className="group border-border bg-bg-primary/80 sticky top-0 z-40 max-w-3xl border-b px-4 backdrop-blur-sm select-none sm:px-6"
    >
      <div className="flex items-center justify-between py-2 sm:py-2.5">
        <Link href="/" passHref className="no-underline">
          <div>
            <TitleTag className="text-text-primary text-sm font-semibold sm:text-base">
              {siteConfig.name}
            </TitleTag>
            <p className="text-text-tertiary hidden text-xs leading-tight sm:block">
              {siteConfig.tagline.replace(/[\.。~=!～!]$/, '')}
            </p>
          </div>
        </Link>

        <nav role="navigation" aria-label="主导航" className="flex items-center gap-1.5 sm:gap-4">
          <Link
            href={pages.posts.slug}
            className={cn(
              'text-text-secondary sm:hover:text-text-primary active:text-text-primary',
              'text-xs sm:text-sm',
            )}
          >
            文章
          </Link>
          <Link
            href={pages.thoughts.slug}
            className={cn(
              'text-text-secondary sm:hover:text-text-primary active:text-text-primary',
              'text-xs sm:text-sm',
            )}
          >
            碎碎念
          </Link>
          <Link
            href={pages.mioSays.slug}
            className={cn(
              'text-text-secondary sm:hover:text-text-primary active:text-text-primary',
              'text-xs sm:text-sm',
            )}
          >
            Mio 说
          </Link>

          <Link
            href={pages.library.slug}
            className={cn(
              'text-text-secondary sm:hover:text-text-primary active:text-text-primary',
              'hidden text-xs sm:inline sm:text-sm',
            )}
          >
            书影音
          </Link>

          <Link
            href={pages.game.slug}
            className={cn(
              'text-text-secondary sm:hover:text-text-primary active:text-text-primary',
              'hidden text-xs sm:inline sm:text-sm',
            )}
          >
            游戏
          </Link>

          <Link
            href={pages.about.slug}
            className={cn(
              'text-text-secondary sm:hover:text-text-primary active:text-text-primary',
              'text-xs sm:text-sm',
            )}
          >
            关于
          </Link>

          {/* "更多"下拉菜单 */}
          <div className="relative flex items-center">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              onBlur={(e) => {
                // 延迟关闭，让点击链接有时间触发
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setTimeout(() => setIsMoreOpen(false), 150)
                }
              }}
              className={cn(
                'text-text-secondary sm:hover:text-text-primary active:text-text-primary',
                'text-xs sm:text-sm',
              )}
              aria-expanded={isMoreOpen}
              aria-haspopup="true"
            >
              更多 ▾
            </button>
            {isMoreOpen && (
              <div className="bg-bg-primary border-border absolute top-full right-0 mt-1 min-w-25 rounded-md border py-2 text-nowrap shadow">
                <div className="sm:hidden">
                  <Link
                    href={pages.library.slug}
                    className={cn(
                      'text-text-secondary hover:bg-bg-secondary hover:text-text-primary',
                      'block px-4 py-2 text-xs',
                    )}
                    onClick={() => setIsMoreOpen(false)}
                  >
                    书影音
                  </Link>

                  <Link
                    href={pages.game.slug}
                    className={cn(
                      'text-text-secondary hover:bg-bg-secondary hover:text-text-primary',
                      'block px-4 py-2 text-xs',
                    )}
                    onClick={() => setIsMoreOpen(false)}
                  >
                    游戏
                  </Link>
                </div>

                <Link
                  href={pages.timeline.slug}
                  className={cn(
                    'text-text-secondary hover:bg-bg-secondary hover:text-text-primary',
                    'block px-4 py-2 text-xs',
                  )}
                  onClick={() => setIsMoreOpen(false)}
                >
                  大事记
                </Link>

                <Link
                  href={pages.reading.slug}
                  className={cn(
                    'text-text-secondary hover:bg-bg-secondary hover:text-text-primary',
                    'block px-4 py-2 text-xs',
                  )}
                  onClick={() => setIsMoreOpen(false)}
                >
                  岛读
                </Link>

                <Link
                  href={pages.friends.slug}
                  className={cn(
                    'text-text-secondary hover:bg-bg-secondary hover:text-text-primary',
                    'block px-4 py-2 text-xs',
                  )}
                  onClick={() => setIsMoreOpen(false)}
                >
                  好朋友们
                </Link>
                <div className="sm:hidden">
                  <div className="border-border my-2 border-t" />
                  <a
                    href={siteConfig.author.github}
                    target="_blank"
                    className={cn(
                      'text-text-secondary hover:bg-bg-secondary hover:text-text-primary',
                      'block px-4 py-2 text-xs',
                    )}
                    onClick={() => setIsMoreOpen(false)}
                  >
                    GitHub
                  </a>

                  <a
                    href={siteConfig.links.rss}
                    target="_blank"
                    className={cn(
                      'text-text-secondary hover:bg-bg-secondary hover:text-text-primary',
                      'block px-4 py-2 text-xs',
                    )}
                    onClick={() => setIsMoreOpen(false)}
                  >
                    RSS 订阅
                  </a>

                  <a
                    href={siteConfig.links.travellings}
                    target="_blank"
                    className={cn(
                      'text-text-secondary hover:bg-bg-secondary hover:text-text-primary',
                      'block px-4 py-2 text-xs',
                    )}
                    onClick={() => setIsMoreOpen(false)}
                  >
                    开往 · 友链接力
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <SearchTrigger />
            <GitHubIcon href={siteConfig.author.github} className="hidden sm:flex" />
            <RSSIcon href={siteConfig.links.rss} className="hidden sm:flex" />
            <TravellingsIcon href={siteConfig.links.travellings} className="hidden sm:flex" />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
