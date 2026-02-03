'use client'

/**
 * Message Author - 统一的作者信息组件
 * 显示头像、名称、时间、UA 等信息
 */

import Image from 'next/image'
import { cn } from '@/lib/cn'
import { useState } from 'react'
import { UABadge } from './ua-badge'
import { Tooltip } from '../tooltip'
import { VipBadge } from './vip-badge'
import { useMount } from '@shined/react-use'
import { RelativeTime } from '../relative-time'
import { getAuthorAvatar } from '@/lib/gravatar'
import { siteConfig, websiteUrl } from '@/lib/config'

import type { MessageAuthor as Author } from '@/lib/messages'

interface MessageAuthorProps {
  /** 作者信息 */
  author: Author
  /** 创建时间 */
  createdAt: string
  /** User Agent 字符串 */
  ua?: string
  /** 头像尺寸，默认 36px */
  avatarSize?: 'sm' | 'md'
  /** 文字尺寸，默认正常 */
  textSize?: 'sm' | 'base'
}

export function MessageAuthor({
  author,
  createdAt,
  ua,
  avatarSize = 'md',
  textSize = 'base',
}: MessageAuthorProps) {
  const authorName = author.name || '匿名'
  const firstChar = authorName.charAt(0)

  // 判断是否使用文字头像（无 avatar 且无 email）
  const useTextAvatar = !author.avatar && !author.email
  const [authorAvatar, setAuthorAvatar] = useState<string>(author.avatar || '')

  // 清理网站 URL，统一为 https://
  const cleanedWebsite = (author.website || '').replace(/https?:\/\//, 'https://')
  const isCurrentSite = cleanedWebsite === websiteUrl
  const isAuthor = author.email === siteConfig.author.email

  // 样式变体
  const avatarSizeClass = avatarSize === 'sm' ? 'h-7 w-7' : 'h-9 w-9'
  const avatarTextSize = avatarSize === 'sm' ? 'text-sm' : 'text-base'
  const nameTextSize = textSize === 'sm' ? 'text-xs' : 'text-sm'
  const metaTextSize = textSize === 'sm' ? 'text-[10px]' : 'text-xs'

  useMount(async () => {
    const url = await getAuthorAvatar(author)

    setAuthorAvatar(url)
  })

  return (
    <div className="flex items-center gap-3">
      {/* 头像 */}
      <div className="relative shrink-0">
        {useTextAvatar || !authorAvatar ? (
          <div
            className={`bg-bg-tertiary text-text-secondary flex items-center justify-center rounded-full font-medium ${avatarSizeClass} ${avatarTextSize}`}
          >
            {firstChar}
          </div>
        ) : (
          <Image
            src={authorAvatar}
            alt={authorName}
            className={`rounded-full object-cover ${avatarSizeClass}`}
            height={avatarSize === 'sm' ? 28 : 36}
            width={avatarSize === 'sm' ? 28 : 36}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}

        {/* VIP 角标（博主专属） */}
        {isAuthor && (
          <Tooltip content="博主标识">
            <VipBadge
              className="absolute -right-0.5 -bottom-0.5"
              size={avatarSize === 'sm' ? 'sm' : 'md'}
              title="博主标识"
            />
          </Tooltip>
        )}
      </div>

      {/* 作者信息 */}
      <div className={cn('min-w-0', textSize === 'sm' ? 'flex-0.5' : 'flex-1')}>
        <div className="flex items-center gap-2">
          {author.website && !isCurrentSite ? (
            <a
              href={author.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-text-primary font-medium underline decoration-dotted underline-offset-2 hover:decoration-solid ${nameTextSize}`}
            >
              {authorName}
            </a>
          ) : (
            <div className="flex items-center gap-2">
              <span className={`text-text-primary font-medium ${nameTextSize}`}>{authorName}</span>
              {isAuthor && (
                <span className="bg-bg-tertiary text-text-primary rounded px-1 py-px text-[10px]">
                  博主
                </span>
              )}
            </div>
          )}
        </div>

        <div className={`text-text-tertiary mt-0.5 flex items-center gap-2 ${metaTextSize}`}>
          <RelativeTime date={createdAt} short />
          {ua && <UABadge ua={ua} />}
        </div>
      </div>
    </div>
  )
}
