import Link from 'next/link'
import './globals.css'
import { ScrollHeader } from '@/components/scroll-header'
import { ThemeToggle } from '@/components/theme-toggle'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.viki.moe'),
  title: {
    default: 'Viki 写东西的地方',
    template: '%s | Viki 写东西的地方',
  },
  description: '分享技术和日常',
  authors: [{ name: 'Viki', url: 'https://github.com/vikiboss' }],
  keywords: [
    '前端开发',
    'Web 开发',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    '博客',
  ],
  creator: 'Viki',
  publisher: 'Viki',
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
    type: 'website',
    locale: 'zh_CN',
    url: 'https://blog.viki.moe',
    title: 'Viki 写东西的地方',
    description: '分享技术和日常',
    siteName: 'Viki 写东西的地方',
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
    title: 'Viki 写东西的地方',
    description: '分享技术和日常',
    creator: '@vikiboss',
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
          title="Viki 的博客 RSS 订阅"
          href="/rss.xml"
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
                    Viki 写东西的地方
                  </h1>
                  <p className="text-text-tertiary hidden text-xs sm:block">生活需要记录</p>
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
                    © 2019-PRESENT Viki.
                    <br className="sm:hidden" /> 文章以{' '}
                    <a
                      href="https://creativecommons.org/licenses/by-sa/4.0/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text-secondary"
                    >
                      CC BY-SA 4.0
                    </a>{' '}
                    协议共享，转载请注明出处。
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="/rss.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary"
                    title="RSS 订阅"
                  >
                    RSS
                  </a>
                  <a
                    href="https://github.com/vikiboss"
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
