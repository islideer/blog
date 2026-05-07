/**
 * Message List - 留言列表
 * 服务端组件，负责获取数据并渲染留言卡片
 */

import { MessageCard } from './message-card'
import { Pagination } from '@/components/pagination'
import { getMessages } from '@/lib/messages'
import { parseMessage } from '@/lib/markdown'
import { MessageActions } from './message-actions'

interface MessageListProps {
  page?: number
  perPage?: number
}

export async function MessageList({ page = 1, perPage = 10 }: MessageListProps) {
  // 直接调用数据层
  const { messages, total } = await getMessages(page, perPage, true)

  // 预渲染所有回复的 HTML（批量处理）
  const messagesWithReplyHtmls = await Promise.all(
    messages.map(async (message) => {
      if (message.replies && message.replies.length > 0) {
        const replyHtmls = await Promise.all(
          message.replies.map((reply) => parseMessage(reply.content)),
        )
        return { message, replyHtmls }
      }
      return { message, replyHtmls: [] }
    }),
  )

  const totalPages = Math.ceil(total / perPage)

  return (
    <>
      <h2 className="text-text-primary mb-6 font-medium sm:text-lg">
        大家在聊 ({total.toLocaleString('zh-Hans-CN')})
      </h2>

      <div className="space-y-6">
        {/* 空状态 */}
        {messages.length === 0 && (
          <div className="border-border bg-bg-secondary rounded-lg border p-8 text-center">
            <p className="text-text-secondary text-sm">还没有留言呢，来留下第一条吧！</p>
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
                  repliedAuthor={message.author}
                  replies={message.replies || []}
                  replyHtmls={replyHtmls}
                />
              }
            />
          ))}
        </div>

        {/* 分页 */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          buildHref={(p) => `/messages?page=${p}`}
        />
      </div>
    </>
  )
}
