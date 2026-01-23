'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronUpIcon } from '../../icons/chevron-up'
import { ChevronDownIcon } from '../../icons/chevron-down'

import type { ReadingComment } from '@/lib/reading'

interface ReadingCommentsProps {
  comments: ReadingComment[]
}

interface CommentItemProps {
  comment: ReadingComment
}

function CommentItem({ comment }: CommentItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showButton, setShowButton] = useState(false)

  // 检测内容是否被截断
  const checkOverflow = (element: HTMLParagraphElement | null) => {
    if (!element) return
    setShowButton(element.scrollHeight > element.clientHeight)
  }

  return (
    <div className="border-border bg-bg-secondary rounded-lg border p-4 sm:p-6">
      <div className="mb-3 flex items-center gap-3">
        {comment.avatar && comment.avatar.trim() !== '' ? (
          <Image
            src={comment.avatar}
            alt={comment.nickname}
            height={40}
            width={40}
            className="aspect-square h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="bg-bg-tertiary text-text-secondary flex aspect-square h-10 w-10 items-center justify-center rounded-full text-lg font-medium">
            {comment.nickname.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="font-medium">{comment.nickname}</p>
          {comment.like_count > 0 && <p className="text-xs opacity-50">{comment.like_count} 赞</p>}
        </div>
      </div>
      <div className="relative">
        <p
          ref={(el) => {
            if (el && !isExpanded) checkOverflow(el)
          }}
          className={`leading-relaxed opacity-90 ${!isExpanded ? 'line-clamp-3' : ''} whitespace-pre-wrap`}
        >
          {comment.content}
        </p>
        {showButton && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-text-secondary hover:text-text mt-2 inline-flex items-center gap-1 text-sm font-medium active:scale-80 sm:mt-4"
          >
            {isExpanded ? '收起' : '更多'}
            {isExpanded ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export function ReadingComments({ comments }: ReadingCommentsProps) {
  if (comments.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="mb-8 text-lg font-medium sm:text-2xl">
        读者评论
        <span className="text-text-tertiary ml-2 font-normal sm:text-lg">
          （共 {comments.length} 条）
        </span>
      </h2>
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  )
}
