/**
 * 留言板页面
 * Messages Page
 */

import { pages } from '@/lib/data'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8 pt-8 pb-16 sm:space-y-12 sm:pt-12 sm:pb-24">
      {/* 页面标题 */}
      <section className="space-y-3" id="title">
        <h1 className="text-3xl font-bold">
          话
          <ruby>
            匣<rp>(</rp>
            <rt className="text-sm">xiá</rt>
            <rp>)</rp>
          </ruby>
          子
        </h1>
        <p className="text-text-secondary">{`${pages.messages.description}。`}</p>
      </section>

      {children}
    </div>
  )
}
