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
import { getGridColumns, getEmojiPackSize, DEFAULT_EMOJI_SIZE } from '@/lib/emoji-packs'

import type { EmojiPacks } from '@/lib/emoji-packs'
import { cn } from '@/lib/cn'

const typedEmojiPacks = emojiPacks as EmojiPacks

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
}

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activePackId, setActivePackId] = useState(Object.keys(typedEmojiPacks)[0])

  const packIds = Object.keys(typedEmojiPacks)
  const activePack = typedEmojiPacks[activePackId]
  const gridColumns = getGridColumns(activePack)

  const handleEmojiClick = (packId: string, emojiName: string) => {
    const pack = typedEmojiPacks[packId]
    let textToInsert: string

    if (pack.type === 'image') {
      // 图片表情：插入 :collection_name: 语法
      textToInsert = `:${packId}_${emojiName}:`
    } else {
      // 文字表情：直接插入原始文本
      textToInsert = pack.items[emojiName]
    }

    onSelect(textToInsert)
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
          <div className="border-border bg-bg-primary absolute bottom-full left-0 z-20 w-80 rounded-lg border p-1 shadow-xl sm:w-92">
            {/* 表情网格或列表 */}
            {activePack.type !== 'text' ? (
              <div
                className="grid max-h-58.5 gap-0.5 overflow-y-auto"
                style={{
                  gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
                }}
              >
                {Object.entries(activePack.items).map(([emojiName, data]) => (
                  <button
                    key={`${activePack.name}_${emojiName}`}
                    type="button"
                    onClick={() => handleEmojiClick(activePackId, emojiName)}
                    className="hover:bg-bg-secondary flex flex-col items-center rounded p-1 transition"
                    title={emojiName}
                  >
                    <Image
                      src={data}
                      alt={emojiName}
                      className={cn(
                        activePack.size && activePack.size > DEFAULT_EMOJI_SIZE
                          ? 'hover:scale-106'
                          : 'scale-106 hover:scale-112',
                        'object-contain transition',
                      )}
                      height={getEmojiPackSize(activePack, true)}
                      width={getEmojiPackSize(activePack, true)}
                      style={{
                        width: `${getEmojiPackSize(activePack, true)}px`,
                        height: `${getEmojiPackSize(activePack, true)}px`,
                      }}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex max-h-58.5 flex-wrap gap-1 overflow-y-auto p-1">
                {Object.entries(activePack.items).map(([emojiName, data]) => (
                  <button
                    key={`${activePack.name}_${emojiName}`}
                    type="button"
                    onClick={() => handleEmojiClick(activePackId, emojiName)}
                    className="hover:bg-bg-secondary rounded px-2 py-1 text-sm transition"
                    title={emojiName}
                  >
                    {data}
                  </button>
                ))}
              </div>
            )}

            {/* Tab 切换 */}
            <div className="mt-1 overflow-x-auto">
              <div className="flex flex-nowrap">
                {packIds.map((packId) => {
                  const pack = typedEmojiPacks[packId]
                  return (
                    <button
                      key={packId}
                      type="button"
                      onClick={() => setActivePackId(packId)}
                      className={`rounded px-2 py-1 text-xs text-nowrap transition ${
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
