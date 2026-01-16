'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import type { CS2InventoryItem } from '@/lib/steam'

interface CS2InventoryClientProps {
  items: CS2InventoryItem[]
}

// 扩展类型，添加数量字段
interface GroupedCS2Item extends CS2InventoryItem {
  count: number
}

// 稀有度权重映射（数值越大越靠前）
const RARITY_WEIGHT: Record<string, number> = {
  非凡: 200, // 勋章、收藏品
  保密级: 100, // 武器最高稀有度
  受限级: 80, // 武器中等稀有度
  军规级: 60, // 武器较低稀有度
  高级: 40, // 音乐盒
  普通级: 10, // 涂鸦、武器箱、工具
}

/**
 * CS2 库存客户端组件
 * - 处理稀有度排序
 * - 处理"显示更多"交互
 */
export function CS2InventoryClient({ items }: CS2InventoryClientProps) {
  const [showAll, setShowAll] = useState(false)
  const initialDisplayCount = 8

  // 按名称分组并计数，然后按稀有度排序
  const groupedAndSortedItems = useMemo(() => {
    // 按名称分组
    const grouped = new Map<string, GroupedCS2Item>()

    items.forEach((item) => {
      const existing = grouped.get(item.name)
      if (existing) {
        existing.count += 1
      } else {
        grouped.set(item.name, { ...item, count: 1 })
      }
    })

    // 转换为数组并按稀有度排序
    return Array.from(grouped.values()).toSorted((a, b) => {
      const weightA = a.rarity ? RARITY_WEIGHT[a.rarity] || 0 : 0
      const weightB = b.rarity ? RARITY_WEIGHT[b.rarity] || 0 : 0
      return weightB - weightA
    })
  }, [items])

  // 根据显示状态决定展示的物品
  const displayedItems = showAll
    ? groupedAndSortedItems
    : groupedAndSortedItems.slice(0, initialDisplayCount)
  const hasMore = groupedAndSortedItems.length > initialDisplayCount

  return (
    <>
      {/* 标题行 */}
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
          CS2 库存
        </h2>
        <span className="text-text-secondary text-xs">
          {groupedAndSortedItems.length} 种物品 · 共 {items.length} 件
        </span>
      </div>

      {/* 物品列表 */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
        {displayedItems.map((item) => (
          <Link
            key={item.name}
            href={item.market_url || '#'}
            target={item.market_url ? '_blank' : undefined}
            rel={item.market_url ? 'noopener noreferrer' : undefined}
            className="group relative aspect-square overflow-hidden rounded-lg"
          >
            {/* 深色贴合游戏的背景渐变 */}
            <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/60 to-black/80 dark:from-zinc-800/80 dark:via-zinc-700/60 dark:to-zinc-800/80" />

            {/* 物品图标 */}
            <div className="relative flex h-full w-full items-center justify-center p-4">
              <Image
                src={item.icon_url}
                alt={item.plain_name}
                width={200}
                height={200}
                className="h-full w-full object-contain transition-all! duration-300 group-hover:scale-110"
              />
            </div>

            {/* 渐变遮罩 */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />

            {/* 右上角标签容器 - 横向 flex 布局 */}
            <div className="absolute top-1 right-1 flex items-center gap-1">
              {/* 数量标识（仅当数量 > 1 时显示） */}
              {item.count > 1 && (
                <div className="rounded-full bg-black/60 px-2 text-[10px] text-white backdrop-blur-[2px]">
                  {item.count} 件
                </div>
              )}

              {/* 稀有度标签 */}
              {item.rarity && (
                <div
                  className="rounded-full px-2 text-[10px] text-white backdrop-blur-[2px]"
                  style={{ backgroundColor: `#${item.rarity_color}` }}
                >
                  {(item.rarity || '').replace('级', '')}
                </div>
              )}

              {/* 暗金标签（StatTrak）*/}
              {item.stattrak_score && (
                <div
                  className="rounded-full px-2 text-[10px] text-white backdrop-blur-[2px]"
                  style={{ backgroundColor: '#CF6A32' }}
                >
                  {item.stattrak_score.toLocaleString('zh-Hans-CN')} 击杀
                </div>
              )}
            </div>

            {/* 磨损标签 - 左上角 */}
            {item.exterior && (
              <div className="absolute top-1 left-1 rounded-full bg-black/70 px-2 text-[10px] text-white backdrop-blur-[2px]">
                {item.exterior
                  .replace('久经沙场', '久经')
                  .replace('崭新出厂', '崭新')
                  .replace('略有磨损', '略磨')
                  .replace('战痕累累', '战痕')
                  .replace('破损不堪', '破损')}
              </div>
            )}

            {/* 物品信息 - 底部 */}
            <div className="absolute right-0 bottom-0 left-0 p-3">
              <h3 className="line-clamp-2 text-xs font-medium text-white">{item.plain_name}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* 显示更多按钮 */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
          >
            {showAll ? '收起' : `显示全部 ${groupedAndSortedItems.length} 种物品`}
          </button>
        </div>
      )}
    </>
  )
}
