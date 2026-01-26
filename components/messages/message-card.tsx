/**
 * Message Card - 留言卡片
 * 显示作者信息、留言内容、UA 信息
 */

import Image from 'next/image'
// import { UABadge } from './ua-badge'
import { RelativeTime } from '../relative-time'
import { CollapsibleContent } from './collapsible-content'
import { parseMessage } from '@/lib/markdown'
import type { ReactNode } from 'react'

import type { Message } from '@/lib/messages'

interface MessageCardProps {
  message: Message
  actions?: ReactNode
}

export async function MessageCard({ message, actions }: MessageCardProps) {
  const html = await parseMessage(message.content)
  const authorName = message.author.name || '匿名'
  const firstChar = authorName.charAt(0)

  // 判断是否使用文字头像（无 avatar 且无 email）
  const useTextAvatar = !message.author.avatar && !message.author.email

  return (
    <article className="group border-border bg-bg-primary hover:border-border-secondary rounded-lg border p-4 transition">
      {/* 头部：作者信息 */}
      <div className="mb-3 flex items-start gap-3">
        {/* 头像 */}
        {useTextAvatar || !message.author.avatar ? (
          <div className="bg-bg-tertiary text-text-secondary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-medium">
            {firstChar}
          </div>
        ) : (
          <Image
            src={message.author.avatar}
            alt={authorName}
            className="h-9 w-9 shrink-0 rounded-full object-cover"
            height={36}
            width={36}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}

        {/* 作者信息 */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {message.author.website ? (
              <a
                href={message.author.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary text-sm font-medium underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                {authorName}
              </a>
            ) : (
              <span className="text-text-primary text-sm font-medium">{authorName}</span>
            )}
          </div>

          <div className="text-text-tertiary mt-0.5 flex items-center gap-2 text-xs">
            <RelativeTime date={message.createdAt} />
            {/* {message.ua && <UABadge ua={message.ua} />} */}
          </div>
        </div>
      </div>

      {/* 留言内容 */}
      <CollapsibleContent html={html} maxLines={3} />

      {/* 操作按钮 */}
      {actions}
    </article>
  )
}
