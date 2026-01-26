/**
 * Message Form - 留言表单
 * 支持表情选择、字数统计、Server Actions
 */

'use client'

import { toast } from 'sonner'
import { Button } from '../button'
import { SendIcon } from '@/icons/send'
import { EmojiPicker } from './emoji-picker'
import { useState, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { submitMessage } from '@/actions/messages'
import { cn } from '@/lib/cn'

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="sm" disabled={pending || disabled} className="ml-auto">
      {pending ? '提交中...' : '提交留言'}
      {!pending && <SendIcon className="h-3.5 w-3.5" />}
    </Button>
  )
}

export function MessageForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    content: '',
  })

  const formRef = useRef<HTMLFormElement>(null)
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

    // 插入表情语法
    const newContent = before + emoji + after
    setFormData((prev) => ({ ...prev, content: newContent }))

    // 恢复光标位置
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + emoji.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleSubmit = async (formData: FormData) => {
    const result = await submitMessage(formData)

    if (!result.success) {
      toast.error(result.message || result.error || '提交失败')
      return
    }

    toast.success('留言提交成功！')

    // 清空表单
    setFormData({
      name: '',
      email: '',
      website: '',
      content: '',
    })

    formRef.current?.reset()
  }

  const contentLength = formData.content.length

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="border-border space-y-4 rounded-lg border p-6"
    >
      <div className="no-focus grid grid-cols-1 gap-2 sm:grid-cols-3">
        {/* 姓名（可选） */}
        <div className="flex items-center gap-2">
          <label htmlFor="name" className="text-text-secondary shrink-0 text-xs sm:text-sm">
            姓名
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            maxLength={50}
            placeholder="可选，用于展示身份"
            className="input flex-1 text-xs sm:text-sm"
          />
        </div>

        {/* 邮箱（可选） */}
        <div className="flex items-center gap-2">
          <label htmlFor="email" className="text-text-secondary shrink-0 text-xs sm:text-sm">
            邮箱
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="可选，用于展示头像"
            className="input flex-1 text-xs sm:text-sm"
          />
        </div>

        {/* 网站（可选） */}
        <div className="flex items-center gap-2">
          <label htmlFor="website" className="text-text-secondary shrink-0 text-xs sm:text-sm">
            网站
          </label>
          <input
            id="website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
            placeholder="可选，用于引导访问"
            className="input flex-1 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* 留言内容（必填） */}
      <div>
        <textarea
          ref={textareaRef}
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          maxLength={1000}
          rows={3}
          placeholder="留下你的想法和故事..."
          className="textarea no-focus w-full"
          required
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex items-center justify-between gap-3">
        <div className="text-text-tertiary flex items-center gap-2">
          <EmojiPicker onSelect={handleEmojiSelect} />
          <span className="hidden text-xs sm:inline">支持 Markdown、表情包、剧透语法</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              'hidden text-xs sm:inline',
              contentLength > 1000 ? 'text-text-primary' : 'text-text-tertiary',
            )}
          >
            {contentLength} / 1000
          </span>
          <SubmitButton disabled={!formData.content.trim()} />
        </div>
      </div>
    </form>
  )
}
