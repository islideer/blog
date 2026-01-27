/**
 * Message Actions - 留言操作按钮
 * 回复按钮、展开回复按钮、回复列表
 */

'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../button'
import { ReplyIcon } from '@/icons/reply'
import { XIcon } from '@/icons/x'
import { ChevronUpIcon } from '../../icons/chevron-up'
import { ChevronDownIcon } from '../../icons/chevron-down'
import { CollapsibleContent } from './collapsible-content'
// import { UABadge } from './ua-badge'
import { RelativeTime } from '../relative-time'
import { ReplyForm } from './reply-form'

import type { MessageReply } from '@/lib/messages'

interface MessageActionsProps {
  messageId: string
  replies: MessageReply[]
  replyHtmls: string[]
}

export function MessageActions({ messageId, replies, replyHtmls }: MessageActionsProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  const handleReplySuccess = () => {
    setShowReplyForm(false)
  }

  return (
    <div>
      {/* 按钮行 */}
      <div className="border-border mt-3 flex items-center justify-between border-t pt-3">
        {replies.length > 0 ? (
          <Button onClick={() => setShowReplies(!showReplies)} size="sm">
            {showReplies
              ? `收起回复${replies.length ? ` (${replies.length.toLocaleString('zh-Hans-CN')})` : ''}`
              : `展开回复${replies.length ? ` (${replies.length.toLocaleString('zh-Hans-CN')})` : ''}`}
            {showReplies ? (
              <ChevronUpIcon className="h-3.5 w-3.5" />
            ) : (
              <ChevronDownIcon className="h-3.5 w-3.5" />
            )}
          </Button>
        ) : (
          <span></span>
        )}

        <Button onClick={() => setShowReplyForm(!showReplyForm)} size="sm">
          {showReplyForm ? (
            <>
              取消回复
              <XIcon className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              回复
              <ReplyIcon className="h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </div>

      {/* 回复表单 */}
      {showReplyForm && (
        <div className="mt-3">
          <ReplyForm
            messageId={messageId}
            onSuccess={handleReplySuccess}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {/* 回复列表 */}
      {showReplies && replies.length > 0 && (
        <div className="border-border mt-3 ml-4 space-y-2 border-l-2 pl-4">
          {replies.map((reply, index) => {
            const authorName = reply.author.name || '匿名'
            const firstChar = authorName.charAt(0)
            const useTextAvatar = !reply.author.avatar && !reply.author.email

            return (
              <div key={reply.id} className="border-border bg-bg-secondary rounded-lg border p-3">
                {/* 回复作者 */}
                <div className="mb-2 flex items-start gap-2.5">
                  {useTextAvatar || !reply.author.avatar ? (
                    <div className="bg-bg-tertiary text-text-secondary flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                      {firstChar}
                    </div>
                  ) : (
                    <Image
                      src={reply.author.avatar}
                      alt={authorName}
                      className="h-7 w-7 shrink-0 rounded-full object-cover"
                      height={28}
                      width={28}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      {reply.author.website ? (
                        <a
                          href={reply.author.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-primary text-xs font-medium underline decoration-dotted underline-offset-2 hover:decoration-solid"
                        >
                          {authorName}
                        </a>
                      ) : (
                        <span className="text-text-primary text-xs font-medium">{authorName}</span>
                      )}
                    </div>

                    <div className="text-text-tertiary mt-0.5 flex items-center gap-1.5 text-xs">
                      <RelativeTime date={reply.createdAt} />
                      {/* {reply.ua && <UABadge ua={reply.ua} />} */}
                    </div>
                  </div>
                </div>

                {/* 回复内容 */}
                <CollapsibleContent html={replyHtmls[index]} maxLines={3} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
