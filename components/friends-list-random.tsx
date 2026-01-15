'use client'

import { useEffect, useState, startTransition, ViewTransition } from 'react'
import { FriendCard } from './friend-card'

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

export function FriendsListRandom({ friends }: FriendsListRandomProps) {
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
          <button
            onClick={() => void startTransition(() => setShuffledFriends(shuffleArray(friends)))}
            className="text-text-secondary sm:hover:bg-bg-secondary sm:hover:text-text-primary active:bg-bg-secondary active:text-text-primary inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-colors"
            aria-label="重新随机排序友链"
          >
            <RandomIcon />
            换个顺序
          </button>
          <button
            onClick={handleRandomVisit}
            className="text-text-secondary sm:hover:bg-bg-secondary sm:hover:text-text-primary active:bg-bg-secondary active:text-text-primary inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-colors"
            aria-label="随机访问一位好友的博客"
          >
            <SparklesIcon />
            试试手气
          </button>
        </div>
      </div>

      {/* 友链网格 */}
      <div className="grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-2" suppressHydrationWarning>
        {shuffledFriends.map((friend) => (
          <ViewTransition
            key={friend.url}
            name={`friend-${friend.name.replace(/\s+/g, '-').toLowerCase()}`}
            default="transform"
          >
            <FriendCard friend={friend} />
          </ViewTransition>
        ))}
      </div>
    </div>
  )
}

function RandomIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  )
}

function SparklesIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="16" cy="8" r="1" fill="currentColor" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
      <circle cx="16" cy="16" r="1" fill="currentColor" />
    </svg>
  )
}
