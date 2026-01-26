/**
 * 留言板页面
 * Guestbook Page
 */

import type { Metadata } from 'next'
import { pages } from '@/lib/data'
import { MessageForm } from '@/components/guestbook/message-form'
import { MessageList } from '@/components/guestbook/message-list'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pages.guestbook.title,
    description: pages.guestbook.description,
  }
}

interface PageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function GuestbookPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams
  const page = Number(pageParam) || 1

  return (
    <div className="space-y-8 py-8 sm:space-y-12 sm:py-12">
      {/* 页面标题 */}
      <section className="space-y-3" id="title">
        <h1 className="text-3xl font-bold">{pages.guestbook.title}</h1>
        <p className="text-text-secondary">{`${pages.guestbook.description}。`}</p>
      </section>

      {/* 留言表单 */}
      <section className="mb-16">
        <h2 className="text-text-primary mb-6 font-medium sm:text-lg">留下你的足迹</h2>
        <MessageForm />
      </section>

      {/* 留言列表 */}
      <section>
        <h2 className="text-text-primary mb-6 font-medium sm:text-lg">留言列表</h2>
        <MessageList page={page} perPage={10} />
      </section>
    </div>
  )
}
