/**
 * Reply Form - 回复表单
 * 简化版留言表单，用于回复留言
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import { Button } from '../button'
import { SendIcon } from '@/icons/send'
import { XIcon } from '@/icons/x'
import { EmojiPicker } from './emoji-picker'
import { submitReply } from '@/actions/messages'
import { loadMessageAuthor, saveMessageAuthor } from '@/lib/storage'

interface ReplyFormProps {
  messageId: string
  onSuccess?: () => void
  onCancel?: () => void
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="sm" disabled={pending || disabled}>
      {pending ? '提交中...' : '提交回复'}
      {!pending && <SendIcon className="h-3.5 w-3.5" />}
    </Button>
  )
}

export function ReplyForm({ messageId, onSuccess, onCancel }: ReplyFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    content: '',
  })

  const formRef = useRef<HTMLFormElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 组件挂载时读取存储的作者信息
  useEffect(() => {
    const savedAuthor = loadMessageAuthor()
    if (savedAuthor) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({
        ...prev,
        name: savedAuthor.name || '',
        email: savedAuthor.email || '',
        website: savedAuthor.website || '',
      }))
    }
  }, [])

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

  const handleSubmit = async (formDataObj: FormData) => {
    const result = await submitReply(formDataObj)

    if (!result.success) {
      toast.error(result.message || result.error || '回复失败')
      return
    }

    toast.success('回复成功，AI 审核后可显示（约半分钟）')

    // 保存作者信息到 localStorage
    saveMessageAuthor({
      name: formDataObj.get('name') as string,
      email: formDataObj.get('email') as string,
      website: formDataObj.get('website') as string,
    })

    // 清空表单（保留身份信息，只清空内容）
    setFormData((prev) => ({
      ...prev,
      content: '',
    }))

    formRef.current?.reset()

    // 恢复身份信息（因为 reset 会清空表单）
    const savedAuthor = loadMessageAuthor()
    if (savedAuthor) {
      setFormData((prev) => ({
        ...prev,
        name: savedAuthor.name || '',
        email: savedAuthor.email || '',
        website: savedAuthor.website || '',
      }))
    }

    // 调用成功回调
    if (onSuccess) onSuccess()
  }

  const contentLength = formData.content.length

  return (
    <form ref={formRef} action={handleSubmit} className="border-border rounded-lg border p-3">
      {/* 隐藏字段：messageId */}
      <input type="hidden" name="messageId" value={messageId} />

      <div className="no-focus border-border mb-2 grid grid-cols-1 gap-1 border-b pb-2 sm:grid-cols-3 sm:gap-2">
        <div className="flex items-center gap-2">
          <label htmlFor="reply-name" className="text-text-secondary shrink-0 text-xs sm:text-sm">
            名称:
          </label>
          <input
            id="reply-name"
            name="name"
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
            邮箱:
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
            网站:
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
          maxLength={800}
          rows={3}
          placeholder="写下你的回复..."
          className="no-focus w-full"
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

          <SubmitButton disabled={!formData.content.trim()} />
        </div>
      </div>
    </form>
  )
}
