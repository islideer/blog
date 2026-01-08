import Image from 'next/image'
import Link from 'next/link'
import { RSSIcon } from './rss-icon'

import type { Friend } from '@/lib/data'

interface FriendCardProps {
  friend: Friend
}

export function FriendCard({ friend }: FriendCardProps) {
  return (
    <div className="group flex items-start gap-4 transition-opacity hover:opacity-80">
      {/* Avatar */}
      <Link
        href={friend.url}
        target="_blank"
        rel="noopener noreferrer"
        className="no-icon shrink-0 no-underline"
      >
        {friend.avatar ? (
          <Image
            src={friend.avatar}
            alt={friend.name}
            width={56}
            height={56}
            className="rounded-lg ring-1 ring-zinc-200/60 transition-transform group-hover:scale-105 dark:ring-zinc-800/60"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-zinc-200 text-2xl font-semibold text-zinc-600 ring-1 ring-zinc-200/60 transition-transform group-hover:scale-105 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-800/60">
            {friend.name.charAt(0).toUpperCase()}
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-4">
          <Link
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-icon no-underline"
          >
            <h3 className="text-text-primary truncate font-medium">{friend.name}</h3>
          </Link>
          {friend.rss && <RSSIcon href={friend.rss} />}
        </div>
        {friend.description && (
          <Link
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-icon block no-underline"
          >
            <p className="text-text-tertiary line-clamp-2 text-sm leading-relaxed">
              {friend.description}
            </p>
          </Link>
        )}
      </div>
    </div>
  )
}
