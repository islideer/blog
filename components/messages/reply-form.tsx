/**
 * Reply Form - 回复表单
 * 基于 BaseMessageForm 的简化封装
 */

'use client'

import { BaseMessageForm } from './base-message-form'
import { submitReply } from '@/actions/messages'

interface ReplyFormProps {
  messageId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function ReplyForm({ messageId, onSuccess, onCancel }: ReplyFormProps) {
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
      maxLength={800}
      rows={3}
    />
  )
}
