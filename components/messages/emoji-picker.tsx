/**
 * Emoji Picker - 表情选择器
 * 支持多套表情包切换
 */

'use client'

import Image from 'next/image'
import { Button } from '../button'
import { useState } from 'react'
import { EmojiIcon } from '@/icons/emoji'
import emojiPacks from '@/data/emoji-packs.json'

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
}

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activePackId, setActivePackId] = useState(Object.keys(emojiPacks)[0])

  const packIds = Object.keys(emojiPacks)
  const activePack = emojiPacks[activePackId as keyof typeof emojiPacks]

  const handleEmojiClick = (packId: string, emojiName: string) => {
    // 插入 :collection_name: 语法
    const syntax = `:${packId}_${emojiName}:`
    onSelect(syntax)
    setIsOpen(false)
  }

  return (
    <div className="relative flex items-center">
      {/* 触发按钮 */}
      <Button type="button" onClick={() => setIsOpen(!isOpen)} size="sm" aria-label="选择表情">
        <EmojiIcon className="h-3.5 w-3.5" />
        表情
      </Button>

      {/* 下拉面板 */}
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* 表情选择器 */}
          <div className="border-border bg-bg-primary absolute bottom-full left-0 z-20 w-80 rounded-lg border py-2 shadow-xl sm:py-3">
            {/* 表情网格 */}
            <div className="grid max-h-58.5 grid-cols-8 overflow-y-scroll">
              {Object.entries(activePack.items).map(([emojiName, url]) => (
                <button
                  key={emojiName}
                  type="button"
                  onClick={() => handleEmojiClick(activePackId, emojiName)}
                  className="group hover:bg-bg-secondary flex flex-col items-center rounded p-1 transition sm:p-2"
                  title={emojiName}
                >
                  <Image
                    src={url}
                    alt={emojiName}
                    className="h-8 w-8 object-contain transition group-hover:scale-110"
                    height={32}
                    width={32}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Tab 切换 */}
            <div className="border-border overflow-x-auto border-b p-2">
              <div className="flex flex-nowrap gap-1">
                {packIds.map((packId) => {
                  const pack = emojiPacks[packId as keyof typeof emojiPacks]
                  return (
                    <button
                      key={packId}
                      type="button"
                      onClick={() => setActivePackId(packId)}
                      className={`rounded px-3 py-1 text-xs text-nowrap transition ${
                        activePackId === packId
                          ? 'bg-bg-tertiary text-text-primary'
                          : 'text-text-secondary hover:bg-bg-secondary'
                      }`}
                    >
                      {pack.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
