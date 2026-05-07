/**
 * 留言板页面
 * Messages Page
 */

import { pages } from '@/lib/data'
import { Suspense } from 'react'
import { siteConfig } from '@/lib/config'
import { MessageForm } from './_components/message-form'
import { MessageList } from './_components/message-list'
import { ImageZoomProvider } from '@/components/image-zoom-provider'
import { generateCanonicalUrl, generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo'

import type { Metadata } from 'next'

interface PageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export const metadata: Metadata = {
  title: pages.messages.title,
  description: pages.messages.description,
  alternates: {
    canonical: generateCanonicalUrl(pages.messages.slug),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl(pages.messages.slug),
    title: `${pages.messages.title} | ${siteConfig.name}`,
    description: pages.messages.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: pages.messages.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pages.messages.title} | ${siteConfig.name}`,
    description: pages.messages.description,
    images: [`${siteConfig.url}/opengraph-image`],
  },
}

export default async function MessagesPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams
  const page = Number(pageParam) || 1

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebPageSchema(
              pages.messages.title,
              pages.messages.description,
              pages.messages.slug,
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: '首页', url: '/' },
              { name: pages.messages.title, url: pages.messages.slug },
            ]),
          ),
        }}
      />
      {/* 说点什么 */}
      <section className="mb-16">
        <MessageForm />
      </section>

      {/* 大家都在聊 */}
      <section>
        <ImageZoomProvider>
          <Suspense fallback={<div className="text-text-secondary">正在打开话匣子...</div>}>
            <MessageList page={page} perPage={10} />
          </Suspense>
        </ImageZoomProvider>
      </section>
    </>
  )
}
