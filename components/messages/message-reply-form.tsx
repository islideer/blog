/**
 * Reply Form - 回复表单
 * 基于 BaseMessageForm 的简化封装
 */

'use client'

import { submitReply } from '@/actions/messages'
import { BaseMessageForm } from './base-message-form'

import type { MessageAuthor } from '@/lib/messages'

interface MessageReplyFormProps {
  messageId: string
  repliedAuthor?: MessageAuthor
  onSuccess?: () => void
  onCancel?: () => void
}

export function MessageReplyForm({
  messageId,
  repliedAuthor,
  onSuccess,
  onCancel,
}: MessageReplyFormProps) {
  const handleSubmit = async (formData: {
    name: string
    email: string
    website: string
    content: string
  }) => {
    // 将对象转换为 FormData，并添加 messageId
    const formDataObj = new FormData()
    formDataObj.append('messageId', messageId)
    formDataObj.append('name', formData.name)
    formDataObj.append('email', formData.email)
    formDataObj.append('website', formData.website)
    formDataObj.append('content', formData.content)

    return await submitReply(formDataObj)
  }

  return (
    <BaseMessageForm
      type="reply"
      onSubmit={handleSubmit}
      onSuccess={onSuccess}
      onCancel={onCancel}
      messageId={messageId}
      repliedAuthor={repliedAuthor}
      maxLength={800}
      rows={3}
    />
  )
}
