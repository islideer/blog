import Image from 'next/image'
import { RSSIcon } from './rss-icon'

import type { Friend } from '@/lib/data'

interface FriendCardProps {
  friend: Friend
}

export function FriendCard({ friend }: FriendCardProps) {
  return (
    <div
      id={friend.id}
      className="group relative flex items-start gap-3 opacity-80 transition-opacity hover:opacity-100"
    >
      <a
        title={`${friend.name}: ${friend.description || '这位朋友很懒，什么也没留下。'}`}
        href={friend.url}
        target="_blank"
        className="no-icon absolute inset-0"
        aria-label={`访问 ${friend.name} 的网站`}
      />

      <a href={friend.url} className="no-icon no-underline">
        {/* Avatar */}
        {friend.avatar ? (
          <Image
            src={friend.avatar}
            alt={friend.name}
            width={52}
            height={52}
            className="aspect-square shrink-0 rounded object-cover ring-1 ring-zinc-200/60 transition-all! group-hover:scale-105 dark:ring-zinc-800/60"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-zinc-200 text-2xl font-semibold text-zinc-600 ring-1 ring-zinc-200/60 transition-all! group-hover:scale-110 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-800/60">
            {friend.name.charAt(0).toUpperCase()}
          </div>
        )}
      </a>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 sm:h-7!">
          <h3 className="text-text-primary truncate font-medium">{friend.name}</h3>
          {/* RSS 图标 - 使用 relative z-10 确保在链接层之上 */}
          {friend.rss && (
            <div className="relative z-10">
              <RSSIcon href={friend.rss} tooltip="支持 RSS 订阅" className="z-10 sm:h-7! sm:w-7!" />
            </div>
          )}
        </div>

        <p className="text-text-tertiary line-clamp-2 truncate text-sm leading-relaxed text-nowrap">
          {friend.description || '这位朋友有点懒，什么也没留下呢~'}
        </p>
      </div>
    </div>
  )
}
