import Link from 'next/link'
import './globals.css'
import { ScrollHeader } from '@/components/scroll-header'
import { ThemeToggle } from '@/components/theme-toggle'
import { siteConfig } from '@/lib/config'
import { generateCanonicalUrl } from '@/lib/seo'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.github }],
  keywords: siteConfig.keywords,
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: generateCanonicalUrl('/'),
  },
  openGraph: {
    type: siteConfig.openGraph.type,
    locale: siteConfig.locale.replace('-', '_'),
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.author.twitter,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="light" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const theme = savedTheme || systemTheme;
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.name} RSS 订阅`}
          href={siteConfig.links.rss}
        />
      </head>
      <body className="bg-bg-primary text-text-primary min-h-screen">
        <ScrollHeader />
        {/* Skip to Main Content Link - for keyboard navigation */}
        <a
          href="#main-content"
          className="focus:bg-bg-primary focus:text-text-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:shadow-lg"
        >
          跳转到主要内容
        </a>
        {/* Main Content Area */}
        <div className="flex min-h-screen flex-col lg:mx-auto lg:max-w-3xl">
          {/* Header - Sticky */}
          <header
            role="banner"
            className="border-border bg-bg-primary/80 sticky top-0 z-40 border-b backdrop-blur-sm"
          >
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
              <Link href="/" passHref className="no-underline">
                <div>
                  <h1 className="text-text-primary text-base font-semibold sm:text-lg">
                    {siteConfig.name}
                  </h1>
                  <p className="text-text-tertiary hidden text-xs sm:block">{siteConfig.tagline}</p>
                </div>
              </Link>

              <nav role="navigation" aria-label="主导航" className="flex items-center space-x-4">
                <Link href="/archives" className="text-text-secondary hover:text-text-primary">
                  归档
                </Link>
                <Link href="/about" className="text-text-secondary hover:text-text-primary">
                  关于
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main
            id="main-content"
            role="main"
            className="mx-auto w-full flex-1 p-4 pb-8 sm:p-6 lg:p-8"
          >
            {children}
          </main>

          {/* Footer */}
          <footer role="contentinfo" className="border-border border-t">
            <div className="mx-auto w-full p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
                <div className="text-text-tertiary text-center sm:text-left">
                  <p>
                    © {siteConfig.copyright.year.start}-{siteConfig.copyright.year.end}{' '}
                    {siteConfig.author.name}.
                    <br className="sm:hidden" /> 文章以{' '}
                    <a
                      href={siteConfig.copyright.license.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-secondary"
                    >
                      {siteConfig.copyright.license.name}
                    </a>{' '}
                    协议共享，转载请注明出处。
                  </p>
                </div>

                <div className="flex items-center gap-4">
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
                    RSS
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
