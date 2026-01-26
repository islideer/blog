/**
 * Reply Form - 回复表单
 * 简化版留言表单，用于回复留言
 */

'use client'

import { useState, useTransition, useRef } from 'react'
import { toast } from 'sonner'
import { Button } from '../button'
import { SendIcon } from '@/icons/send'
import { XIcon } from '@/icons/x'
import { EmojiPicker } from './emoji-picker'
import type { CreateReplyRequest, ApiResponse } from '@/lib/guestbook'

interface ReplyFormProps {
  messageId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function ReplyForm({ messageId, onSuccess, onCancel }: ReplyFormProps) {
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    content: '',
  })

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = formData.content
    const before = text.substring(0, start)
    const after = text.substring(end)

    const newContent = before + emoji + after
    setFormData((prev) => ({ ...prev, content: newContent }))

    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + emoji.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.content.trim()) {
      toast.error('请填写回复内容')
      return
    }

    if (formData.content.length > 1000) {
      toast.error('回复内容不能超过 1000 字符')
      return
    }

    startTransition(async () => {
      try {
        const requestBody: CreateReplyRequest = {
          messageId,
          content: formData.content,
        }

        if (formData.name.trim()) requestBody.name = formData.name.trim()
        if (formData.email.trim()) requestBody.email = formData.email.trim()
        if (formData.website.trim()) requestBody.website = formData.website.trim()

        const response = await fetch('/api/guestbook/replies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        })

        const result: ApiResponse = await response.json()

        if (!result.ok) {
          toast.error(result.message || result.error || '回复失败')
          return
        }

        toast.success('回复提交成功！')

        // 清空表单
        setFormData({
          name: '',
          email: '',
          website: '',
          content: '',
        })

        // 调用成功回调
        if (onSuccess) onSuccess()
      } catch (error) {
        console.error('Error submitting reply:', error)
        toast.error('回复失败，请稍后重试')
      }
    })
  }

  const contentLength = formData.content.length

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border bg-bg-secondary space-y-4 rounded-lg border p-4"
    >
      <div className="no-focus grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <label htmlFor="reply-name" className="text-text-secondary shrink-0 text-xs sm:text-sm">
            姓名
          </label>
          <input
            id="reply-name"
            name="name"
            autoFocus
            type="text"
            value={formData.name}
            onChange={handleChange}
            maxLength={50}
            placeholder="可选"
            className="input flex-1 text-xs sm:text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="reply-email" className="text-text-secondary shrink-0 text-xs sm:text-sm">
            邮箱
          </label>
          <input
            id="reply-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="可选，用于展示头像"
            className="input flex-1 text-xs sm:text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="reply-website"
            className="text-text-secondary shrink-0 text-xs sm:text-sm"
          >
            网站
          </label>
          <input
            id="reply-website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
            placeholder="可选"
            className="input flex-1 text-xs sm:text-sm"
          />
        </div>
      </div>

      <div>
        <textarea
          ref={textareaRef}
          name="content"
          value={formData.content}
          onChange={handleChange}
          maxLength={1000}
          rows={4}
          placeholder="写下你的回复..."
          className="textarea no-focus w-full"
          required
        />
        <div className="text-text-tertiary mt-1 flex items-center justify-end text-xs">
          <span className={contentLength > 1000 ? 'text-red-500' : ''}>{contentLength} / 1000</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <EmojiPicker onSelect={handleEmojiSelect} />

        <div className="ml-auto flex gap-2">
          {onCancel && (
            <Button type="button" onClick={onCancel} size="sm">
              取消
              <XIcon className="h-3.5 w-3.5" />
            </Button>
          )}

          <Button type="submit" size="sm" disabled={isPending || !formData.content.trim()}>
            {isPending ? '提交中...' : '提交回复'}
            {!isPending && <SendIcon className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>
    </form>
  )
}
