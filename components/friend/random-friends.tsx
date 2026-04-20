'use client'

import { Tooltip } from '../tooltip'
import { DiceIcon } from '../../icons/dice'
import { FriendCard } from './friend-card'
import { RandomIcon } from '../../icons/random'
import { useEffect, useState, startTransition, ViewTransition } from 'react'

import type { Friend } from '@/lib/data'

interface FriendsListRandomProps {
  friends: Friend[]
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function RandomFriends({ friends }: FriendsListRandomProps) {
  const activeFriends = friends.filter((f) => !f.status || f.status === 'active')
  const STATUS_ORDER: Record<string, number> = { pending: 0, offline: 1, lost: 2 }
  const otherFriends = friends
    .filter((f) => f.status && f.status !== 'active')
    .sort((a, b) => (STATUS_ORDER[a.status!] ?? 99) - (STATUS_ORDER[b.status!] ?? 99))

  const [shuffledActive, setShuffledActive] = useState(activeFriends)

  useEffect(() => {
    setShuffledActive(shuffleArray(activeFriends))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friends])

  if (friends.length === 0) {
    return <div className="text-text-tertiary py-12 text-center">暂无好朋友，等待添加中...</div>
  }

  const handleRandomVisit = () => {
    if (activeFriends.length === 0) return
    const randomFriend = activeFriends[Math.floor(Math.random() * activeFriends.length)]
    window.open(randomFriend.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="space-y-10">
      {/* 正常友链组 */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <Tooltip content="重新随机排序友链">
              <button
                onClick={() =>
                  void startTransition(() => setShuffledActive(shuffleArray(activeFriends)))
                }
                className="group/btn text-text-secondary sm:hover:bg-bg-secondary sm:hover:text-text-primary active:bg-bg-secondary active:text-text-primary inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-xs transition-colors"
                aria-label="重新随机排序友链"
              >
                <span className="inline-flex items-center gap-1.5 transition-transform group-active/btn:scale-90">
                  <RandomIcon className="h-3.5 w-3.5" />
                  换个顺序
                </span>
              </button>
            </Tooltip>
            <Tooltip content="随机访问一位好友的博客">
              <button
                onClick={handleRandomVisit}
                className="group/btn text-text-secondary sm:hover:bg-bg-secondary sm:hover:text-text-primary active:bg-bg-secondary active:text-text-primary inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-xs transition-colors"
                aria-label="随机访问一位好友的博客"
              >
                <span className="inline-flex items-center gap-1.5 transition-transform group-active/btn:scale-90">
                  <DiceIcon className="h-3.5 w-3.5" />
                  试试手气
                </span>
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-2" suppressHydrationWarning>
          {shuffledActive.map((friend) => (
            <ViewTransition key={friend.id} name={`friend-${friend.id}`} default="transform">
              <FriendCard friend={friend} />
            </ViewTransition>
          ))}
        </div>
      </div>

      {/* 其他状态组 */}
      {otherFriends.length > 0 && (
        <div className="space-y-4">
          <div className="border-border-tertiary flex items-center gap-3 border-t pt-6">
            <span className="text-text-tertiary text-xs font-medium tracking-wide uppercase">其他</span>
            <span className="text-text-quaternary text-xs">
              {otherFriends.length} 位好友目前状态异常
            </span>
          </div>
          <div className="grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-2">
            {otherFriends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
