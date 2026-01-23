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

// Fisher-Yates 洗牌算法
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function RandomFriends({ friends }: FriendsListRandomProps) {
  const [shuffledFriends, setShuffledFriends] = useState(friends)

  useEffect(() => {
    setShuffledFriends(shuffleArray(friends))
  }, [friends])

  if (shuffledFriends.length === 0) {
    return <div className="text-text-tertiary py-12 text-center">暂无好朋友，等待添加中...</div>
  }

  const handleRandomVisit = () => {
    if (friends.length === 0) return
    const randomFriend = friends[Math.floor(Math.random() * friends.length)]
    window.open(randomFriend.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <Tooltip content="重新随机排序友链">
            <button
              onClick={() => void startTransition(() => setShuffledFriends(shuffleArray(friends)))}
              className="text-text-secondary sm:hover:bg-bg-secondary sm:hover:text-text-primary active:bg-bg-secondary active:text-text-primary inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-colors"
              aria-label="重新随机排序友链"
            >
              <RandomIcon className="h-3.5 w-3.5" />
              换个顺序
            </button>
          </Tooltip>
          <Tooltip content="随机访问一位好友的博客">
            <button
              onClick={handleRandomVisit}
              className="text-text-secondary sm:hover:bg-bg-secondary sm:hover:text-text-primary active:bg-bg-secondary active:text-text-primary inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-colors"
              aria-label="随机访问一位好友的博客"
            >
              <DiceIcon className="h-3.5 w-3.5" />
              试试手气
            </button>
          </Tooltip>
        </div>
      </div>

      {/* 友链网格 */}
      <div className="grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-2" suppressHydrationWarning>
        {shuffledFriends.map((friend) => (
          <ViewTransition key={friend.id} name={`friend-${friend.id}`} default="transform">
            <FriendCard friend={friend} />
          </ViewTransition>
        ))}
      </div>
    </div>
  )
}
