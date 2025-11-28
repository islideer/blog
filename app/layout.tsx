import './globals.css'

import { SiteHeader } from '@/components/site-header'
import { GoogleAnalytics } from '@next/third-parties/google'
import { siteConfig } from '@/lib/config'
import { generateCanonicalUrl } from '@/lib/seo'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'

import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: siteConfig.theme.background.light },
    { media: '(prefers-color-scheme: dark)', color: siteConfig.theme.background.dark },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
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
    alternates: {
      canonical: generateCanonicalUrl('/'),
    },
    openGraph: {
      type: siteConfig.openGraph.type as 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: ['/opengraph-image'],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://i.loli.net" />
        <link rel="dns-prefetch" href="https://i.loli.net" />
        <link rel="preconnect" href="https://s2.loli.net" />
        <link rel="dns-prefetch" href="https://s2.loli.net" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.name} RSS 订阅`}
          href={siteConfig.links.rss}
        />
      </head>
      <body className="bg-bg-primary text-text-primary font-sans antialiased duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Analytics />
          <GoogleAnalytics gaId={siteConfig.analytics.google} />
          <div className="flex min-h-screen min-w-md flex-col sm:mx-auto sm:max-w-3xl">
            <SiteHeader />
            <main className="flex-1">
              <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
