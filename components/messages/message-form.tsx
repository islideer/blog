/**
 * Message Form - 留言表单
 * 基于 BaseMessageForm 的简化封装
 */

'use client'

import { BaseMessageForm } from './base-message-form'
import { submitMessage } from '@/actions/messages'

export function MessageForm() {
  const handleSubmit = async (formData: {
    name: string
    email: string
    website: string
    content: string
  }) => {
    // 将对象转换为 FormData
    const formDataObj = new FormData()
    formDataObj.append('name', formData.name)
    formDataObj.append('email', formData.email)
    formDataObj.append('website', formData.website)
    formDataObj.append('content', formData.content)

    return await submitMessage(formDataObj)
  }

  return (
    <BaseMessageForm
      type="message"
      onSubmit={handleSubmit}
      maxLength={1200}
      rows={5}
    />
  )
}
