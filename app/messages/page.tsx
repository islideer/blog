/**
 * 留言板页面
 * Messages Page
 */

import { pages } from '@/lib/data'
import { MessageForm } from '@/components/messages/message-form'
import { MessageList } from '@/components/messages/message-list'

import type { Metadata } from 'next'

export const revalidate = 86400 // 缓存 1 天

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pages.messages.title,
    description: pages.messages.description,
  }
}

interface PageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function MessagesPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams
  const page = Number(pageParam) || 1

  return (
    <div className="space-y-8 pt-8 pb-16 sm:space-y-12 sm:pt-12 sm:pb-24">
      {/* 页面标题 */}
      <section className="space-y-3" id="title">
        <h1 className="text-3xl font-bold">{pages.messages.title}</h1>
        <p className="text-text-secondary">{`${pages.messages.description}。`}</p>
      </section>

      {/* 说点什么 */}
      <section className="mb-16">
        <h2 className="text-text-primary mb-6 font-medium sm:text-lg">说点什么</h2>
        <MessageForm />
      </section>

      {/* 大家都在聊 */}
      <section>
        <h2 className="text-text-primary mb-6 font-medium sm:text-lg">大家在聊</h2>
        <MessageList page={page} perPage={10} />
      </section>
    </div>
  )
}
