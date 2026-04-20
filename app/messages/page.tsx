/**
 * 留言板页面
 * Messages Page
 */

import { pages } from '@/lib/data'
import { Suspense } from 'react'
import { siteConfig } from '@/lib/config'
import { MessageForm } from '@/components/messages/message-form'
import { MessageList } from '@/components/messages/message-list'
import { ImageZoomProvider } from '@/components/image-zoom-provider'
import { generateCanonicalUrl } from '@/lib/seo'

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
      {/* 说点什么 */}
      <section className="mb-16">
        <MessageForm />
      </section>

      {/* 大家都在聊 */}
      <section>
        <ImageZoomProvider>
          <Suspense fallback={<div className="text-text-secondary">留言加载中...</div>}>
            <MessageList page={page} perPage={10} />
          </Suspense>
        </ImageZoomProvider>
      </section>
    </>
  )
}
