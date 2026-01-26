/**
 * Message List - 留言列表
 * 服务端组件，负责获取数据并渲染留言卡片
 */

import Link from 'next/link'
import { MessageCard } from './message-card'
import { MessageActions } from './message-actions'
// import { ReplyList } from './reply-list'
import { getMessages } from '@/lib/guestbook-github'
import { parseGuestbook } from '@/lib/markdown'

interface MessageListProps {
  page?: number
  perPage?: number
}

export async function MessageList({ page = 1, perPage = 10 }: MessageListProps) {
  const { messages, total } = await getMessages(page, perPage, true)

  // 预渲染所有回复的 HTML（批量处理）
  const messagesWithReplyHtmls = await Promise.all(
    messages.map(async (message) => {
      if (message.replies && message.replies.length > 0) {
        const replyHtmls = await Promise.all(
          message.replies.map((reply) => parseGuestbook(reply.content)),
        )
        return { message, replyHtmls }
      }
      return { message, replyHtmls: [] }
    }),
  )

  const totalPages = Math.ceil(total / perPage)
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  return (
    <div className="space-y-6">
      {/* 空状态 */}
      {messages.length === 0 && (
        <div className="rounded-lg border border-border bg-bg-secondary p-8 text-center">
          <p className="text-text-secondary text-sm">还没有留言，来留下第一条吧！</p>
        </div>
      )}

      {/* 留言列表 */}
      <div className="space-y-4">
        {messagesWithReplyHtmls.map(({ message, replyHtmls }) => (
          <MessageCard
            key={message.id}
            message={message}
            actions={
              <MessageActions
                messageId={message.id}
                replyCount={message.replyCount}
                replies={message.replies || []}
                replyHtmls={replyHtmls}
              />
            }
          />
        ))}
      </div>

      {/* 分页控制 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          {hasPrevPage && (
            <Link
              href={`/guestbook?page=${page - 1}`}
              className="rounded-md border border-border px-3 py-1.5 text-xs text-text-secondary transition hover:bg-bg-secondary hover:text-text-primary"
            >
              ← 上一页
            </Link>
          )}

          <span className="text-xs text-text-tertiary">
            第 {page} 页 / 共 {totalPages} 页
          </span>

          {hasNextPage && (
            <Link
              href={`/guestbook?page=${page + 1}`}
              className="rounded-md border border-border px-3 py-1.5 text-xs text-text-secondary transition hover:bg-bg-secondary hover:text-text-primary"
            >
              下一页 →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
