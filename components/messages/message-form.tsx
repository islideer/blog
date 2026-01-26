/**
 * Message Form - 留言表单
 * 支持表情选择、字数统计、乐观更新
 */

'use client'

import { toast } from 'sonner'
import { Button } from '../button'
import { SendIcon } from '@/icons/send'
import { EmojiPicker } from './emoji-picker'
import { useState, useTransition, useRef } from 'react'

import type { CreateMessageRequest, ApiResponse } from '@/lib/messages'
import { cn } from '@/lib/cn'

export function MessageForm() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.content.trim()) {
      toast.error('请填写留言内容')
      return
    }

    if (formData.content.length > 1000) {
      toast.error('留言内容不能超过 1000 字符')
      return
    }

    startTransition(async () => {
      try {
        const requestBody: CreateMessageRequest = {
          content: formData.content,
        }

        // 可选字段
        if (formData.name.trim()) requestBody.name = formData.name.trim()
        if (formData.email.trim()) requestBody.email = formData.email.trim()
        if (formData.website.trim()) requestBody.website = formData.website.trim()

        const response = await fetch('/api/messages/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        })

        const result: ApiResponse = await response.json()

        if (!result.ok) {
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

        // 刷新页面数据
        window.location.reload()
      } catch (error) {
        console.error('Error submitting message:', error)
        toast.error('提交失败，请稍后重试')
      }
    })
  }

  const contentLength = formData.content.length

  return (
    <form onSubmit={handleSubmit} className="border-border space-y-4 rounded-lg border p-6">
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
            placeholder="可选"
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
            placeholder="可选"
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
          <span className="text-xs">支持 Markdown、表情包、剧透语法</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              'text-xs',
              contentLength > 1000 ? 'text-text-primary' : 'text-text-tertiary',
            )}
          >
            {contentLength} / 1000
          </span>
          <Button
            type="submit"
            size="sm"
            disabled={isPending || !formData.content.trim()}
            className="ml-auto"
          >
            {isPending ? '提交中...' : '提交留言'}
            {!isPending && <SendIcon className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>
    </form>
  )
}
