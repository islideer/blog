/**
 * Base Message Form - 统一的留言/回复表单组件
 * 支持表情选择、字数统计、邮箱头像预览
 */

'use client'

import { toast } from 'sonner'
import { Button } from '../button'
import { SendIcon } from '@/icons/send'
import { XIcon } from '@/icons/x'
import { EmojiPicker } from './emoji-picker'
import { useState, useRef, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { loadMessageAuthor, saveMessageAuthor } from '@/lib/storage'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const md5 = require('js-md5')

// 客户端版本的头像生成逻辑（与服务端 generateAvatarUrl 保持一致）
function generateClientAvatarUrl(email: string): string {
  if (!email) return ''

  const qqMailPattern = /^([1-9][0-9]{4,10})@qq\.com$/i
  const qq = email.match(qqMailPattern)

  if (qq) {
    const qqNumber = qq[1] || ''
    return `https://q1.qlogo.cn/g?b=qq&nk=${qqNumber}&s=100`
  }

  // 使用真正的 MD5 哈希，与服务端完全一致
  const hash = md5(email.toLowerCase().trim()) as string
  return `https://gravatar.loli.net/avatar/${hash}?d=identicon&s=80`
}

interface MessageFormData {
  name: string
  email: string
  website: string
  content: string
}

interface BaseMessageFormProps {
  /** 表单类型 */
  type: 'message' | 'reply'
  /** 提交处理函数 */
  onSubmit: (
    formData: MessageFormData,
  ) => Promise<{ success: boolean; message?: string; error?: string }>
  /** 成功回调 */
  onSuccess?: () => void
  /** 取消回调（仅回复表单） */
  onCancel?: () => void
  /** 留言 ID（仅回复表单） */
  messageId?: string
  /** 内容最大长度 */
  maxLength?: number
  /** 文本框行数 */
  rows?: number
}

function SubmitButton({ disabled, type }: { disabled: boolean; type: 'message' | 'reply' }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="sm" disabled={pending || disabled} className="ml-auto">
      {pending ? '提交中...' : type === 'message' ? '提交留言' : '提交回复'}
      {!pending && <SendIcon className="h-3.5 w-3.5" />}
    </Button>
  )
}

export function BaseMessageForm({
  type,
  onSubmit,
  onSuccess,
  onCancel,
  messageId,
  maxLength = 1200,
  rows = 5,
}: BaseMessageFormProps) {
  const [formData, setFormData] = useState<MessageFormData>({
    name: '',
    email: '',
    website: '',
    content: '',
  })

  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [showAvatar, setShowAvatar] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 组件挂载时读取存储的作者信息
  useEffect(() => {
    const savedAuthor = loadMessageAuthor()
    if (savedAuthor) {
      const newData = {
        ...formData,
        name: savedAuthor.name || '',
        email: savedAuthor.email || '',
        website: savedAuthor.website || '',
      }
      setFormData(newData)

      // 如果有保存的邮箱，立即显示头像
      if (savedAuthor.email) {
        setAvatarUrl(generateClientAvatarUrl(savedAuthor.email))
        setShowAvatar(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value.trim()
    if (email && email.includes('@')) {
      setAvatarUrl(generateClientAvatarUrl(email))
      setShowAvatar(true)
    } else {
      setShowAvatar(false)
    }
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
    const result = await onSubmit({
      name: formDataObj.get('name') as string,
      email: formDataObj.get('email') as string,
      website: formDataObj.get('website') as string,
      content: formDataObj.get('content') as string,
    })

    if (!result.success) {
      toast.error(result.message || result.error || '提交失败')
      return
    }

    toast.success(
      type === 'message'
        ? '留言成功，AI 审核后可显示（约半分钟）'
        : '回复成功，AI 审核后可显示（约半分钟）',
    )

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
  const isMessage = type === 'message'

  return (
    <>
      {isMessage && <h2 className="text-text-primary mb-6 font-medium sm:text-lg">说点什么</h2>}

      <form
        ref={formRef}
        action={handleSubmit}
        className={cn('border-border rounded-lg border', isMessage ? 'p-4' : 'p-3')}
      >
        {/* 隐藏字段：messageId（仅回复表单） */}
        {!isMessage && messageId && <input type="hidden" name="messageId" value={messageId} />}

        <div className="no-focus border-border mb-2 grid grid-cols-1 gap-1 border-b pb-2 sm:grid-cols-3 sm:gap-2">
          {/* 名称（可选） */}
          <div className="flex items-center gap-2">
            <label
              htmlFor={`${type}-name`}
              className="text-text-secondary shrink-0 text-xs sm:text-sm"
            >
              名称:
            </label>
            <input
              id={`${type}-name`}
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              maxLength={50}
              placeholder={isMessage ? '可选，用于展示身份' : '可选'}
              className="input flex-1 text-xs sm:text-sm"
            />
          </div>

          {/* 邮箱（可选） + 头像预览 */}
          <div className="relative flex items-center gap-2">
            <label
              htmlFor={`${type}-email`}
              className="text-text-secondary shrink-0 text-xs sm:text-sm"
            >
              邮箱:
            </label>
            <input
              id={`${type}-email`}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              placeholder="可选，用于头像和通知"
              className="input flex-1 text-xs sm:text-sm"
            />
            {/* 头像预览 */}
            {showAvatar && avatarUrl && (
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                <Image
                  src={avatarUrl}
                  alt="头像预览"
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full border border-gray-300 dark:border-gray-600"
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* 网站（可选） */}
          <div className="flex items-center gap-2">
            <label
              htmlFor={`${type}-website`}
              className="text-text-secondary shrink-0 text-xs sm:text-sm"
            >
              网站:
            </label>
            <input
              id={`${type}-website`}
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder={isMessage ? '可选，用于引导访问' : '可选'}
              className="input flex-1 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* 留言内容（必填） */}
        <textarea
          ref={textareaRef}
          name="content"
          value={formData.content}
          onChange={handleChange}
          maxLength={maxLength}
          rows={rows}
          placeholder={isMessage ? '留下你的想法和故事...' : '写下你的回复...'}
          className="no-focus w-full"
          required
        />

        {/* 操作按钮 */}
        <div className="flex items-center justify-between gap-3">
          <div className="text-text-tertiary flex items-center gap-2">
            <EmojiPicker onSelect={handleEmojiSelect} />
            {isMessage && (
              <span className="hidden text-xs sm:inline">
                支持 Markdown、预设表情、剧透语法，如 || 剧透内容 ||
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={cn(
                'hidden text-xs sm:inline',
                contentLength > 1000 ? 'text-text-primary' : 'text-text-tertiary',
              )}
            >
              {contentLength} / {maxLength > 1000 ? '1000' : maxLength}
            </span>

            {onCancel && (
              <Button type="button" onClick={onCancel} size="sm">
                取消
                <XIcon className="h-3.5 w-3.5" />
              </Button>
            )}

            <SubmitButton disabled={!formData.content.trim()} type={type} />
          </div>
        </div>
      </form>
    </>
  )
}
