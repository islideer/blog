/**
 * Message Actions - 留言操作按钮
 * 回复按钮、展开回复按钮、回复列表
 */

'use client'

import { useState } from 'react'
import { Button } from '../button'
import { ReplyIcon } from '@/icons/reply'
import { XIcon } from '@/icons/x'
import { ChevronUpIcon } from '../../icons/chevron-up'
import { ChevronDownIcon } from '../../icons/chevron-down'
import { CollapsibleContent } from './collapsible-content'
import { MessageAuthor } from './message-author'
import { MessageReplyForm } from './message-reply-form'

import type { MessageReply, MessageAuthor as Author } from '@/lib/messages'

interface MessageActionsProps {
  messageId: string
  repliedAuthor?: Author
  replies: MessageReply[]
  replyHtmls: string[]
}

export function MessageActions({
  messageId,
  repliedAuthor,
  replies,
  replyHtmls,
}: MessageActionsProps) {
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
          <MessageReplyForm
            messageId={messageId}
            repliedAuthor={repliedAuthor}
            onSuccess={handleReplySuccess}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {/* 回复列表 */}
      {showReplies && replies.length > 0 && (
        <div className="border-border divide-border mt-3 ml-4 space-y-2 divide-y border-l pl-4">
          {replies.map((reply, index) => (
            <div key={reply.id} className="bg-bg-primary p-3">
              {/* 回复作者 */}
              <div className="mb-2">
                <MessageAuthor
                  author={reply.author}
                  createdAt={reply.createdAt}
                  ua={reply.ua}
                  avatarSize="sm"
                  textSize="sm"
                />
              </div>

              {/* 回复内容 */}
              <CollapsibleContent html={replyHtmls[index]} maxLines={9} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
