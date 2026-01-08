import Image from 'next/image'
import Link from 'next/link'
import { RSSIcon } from './rss-icon'

import type { Friend } from '@/lib/data'

interface FriendCardProps {
  friend: Friend
}

export function FriendCard({ friend }: FriendCardProps) {
  return (
    <div
      title={friend.description}
      className="group relative flex items-start gap-4 transition-opacity hover:opacity-80"
    >
      {/* 覆盖整个卡片的链接层 */}
      <Link
        href={friend.url}
        target="_blank"
        rel="noopener noreferrer"
        className="no-icon absolute inset-0 no-underline"
        aria-label={`访问 ${friend.name} 的网站`}
      />

      {/* Avatar */}
      {friend.avatar ? (
        <Image
          src={friend.avatar}
          alt={friend.name}
          width={56}
          height={56}
          className="shrink-0 rounded-lg ring-1 ring-zinc-200/60 transition-transform group-hover:scale-105 dark:ring-zinc-800/60"
        />
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-2xl font-semibold text-zinc-600 ring-1 ring-zinc-200/60 transition-transform group-hover:scale-105 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-800/60">
          {friend.name.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h3 className="text-text-primary truncate font-medium">{friend.name}</h3>
          {/* RSS 图标 - 使用 relative z-10 确保在链接层之上 */}
          {friend.rss && (
            <div className="relative z-10">
              <RSSIcon href={friend.rss} />
            </div>
          )}
        </div>

        <p className="text-text-tertiary line-clamp-2 truncate text-sm leading-relaxed text-nowrap">
          {friend.description || '这位朋友很懒，什么也没留下。'}
        </p>
      </div>
    </div>
  )
}
