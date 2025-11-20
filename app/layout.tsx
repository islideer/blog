import Link from 'next/link'
import './globals.css'
import { ScrollHeader } from '@/components/scroll-header'
import { ThemeToggle } from '@/components/theme-toggle'
import { siteConfig } from '@/lib/config'

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
    // apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: siteConfig.openGraph.type,
    locale: siteConfig.locale.replace('-', '_'),
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    // images: [
    //   {
    //     url: '/og?title=Viki 写东西的地方&description=Less is more',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Viki 写东西的地方',
    //   },
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.author.twitter,
    // images: ['/og?title=Viki%20写东西的地方&description=分享技术和日常'],
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
        {/* Main Content Area */}
        <div className="flex min-h-screen flex-col lg:mx-auto lg:max-w-3xl">
          {/* Header - Sticky */}
          <header className="border-border bg-bg-primary/80 sticky top-0 z-40 border-b backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
              <Link href="/" passHref>
                <div>
                  <h1 className="text-text-primary text-base font-semibold sm:text-lg">
                    {siteConfig.name}
                  </h1>
                  <p className="text-text-tertiary hidden text-xs sm:block">{siteConfig.tagline}</p>
                </div>
              </Link>

              <nav className="flex items-center space-x-4">
                <Link
                  href="/archives"
                  className="text-text-secondary hover:text-text-primary text-sm font-medium"
                >
                  归档
                </Link>
                <Link
                  href="/about"
                  className="text-text-secondary hover:text-text-primary text-sm font-medium"
                >
                  关于
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto w-full flex-1 p-4 pb-8 sm:p-6 lg:p-8">{children}</main>

          {/* Footer */}
          <footer className="border-border border-t">
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
                    href={siteConfig.links.rss}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary"
                    title="RSS 订阅"
                  >
                    RSS
                  </a>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary"
                  >
                    GitHub
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
