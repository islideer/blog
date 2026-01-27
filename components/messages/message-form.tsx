/**
 * Message Form - 留言表单
 * 支持表情选择、字数统计、Server Actions
 */

'use client'

import { toast } from 'sonner'
import { Button } from '../button'
import { SendIcon } from '@/icons/send'
import { EmojiPicker } from './emoji-picker'
import { useState, useRef, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { submitMessage } from '@/actions/messages'
import { cn } from '@/lib/cn'
import { loadMessageAuthor, saveMessageAuthor } from '@/lib/storage'

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

    toast.success('留言提交成功，审核后显示')

    // 保存作者信息到 localStorage
    saveMessageAuthor({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      website: formData.get('website') as string,
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
  }

  const contentLength = formData.content.length

  return (
    <>
      <h2 className="text-text-primary mb-6 font-medium sm:text-lg">说点什么</h2>

      <form ref={formRef} action={handleSubmit} className="border-border rounded-lg border p-4">
        <div className="no-focus border-border mb-2 grid grid-cols-1 gap-2 border-b pb-2 sm:grid-cols-3">
          {/* 姓名（可选） */}
          <div className="flex items-center gap-2">
            <label htmlFor="name" className="text-text-secondary shrink-0 text-xs sm:text-sm">
              姓名
            </label>
            <input
              id="name"
              name="name"
              type="text"
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

        <textarea
          ref={textareaRef}
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          maxLength={1200}
          rows={5}
          placeholder="留下你的想法和故事..."
          className="no-focus w-full"
          required
        />

        {/* 操作按钮 */}
        <div className="flex items-center justify-between gap-3">
          <div className="text-text-tertiary flex items-center gap-2">
            <EmojiPicker onSelect={handleEmojiSelect} />
            <span className="hidden text-xs sm:inline">
              支持 Markdown、表情包、剧透语法（||剧透内容||）
            </span>
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
    </>
  )
}
