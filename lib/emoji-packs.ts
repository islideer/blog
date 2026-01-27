/**
 * 表情包类型定义
 * 支持图片表情和文字表情（颜表情）
 */

/** 基础表情包 */
interface BaseEmojiPack {
  /** 表情包名称（用于 UI 显示） */
  name: string
  /** 表情集合：{ 表情名: 数据 } */
  items: Record<string, string>
}

/** 图片表情包 */
export interface ImageEmojiPack extends BaseEmojiPack {
  type: 'image'
  /**
   * 表情尺寸（px）- 表情包级别配置
   * @default 32
   */
  size?: number
}

/** 文字表情包（颜表情） */
export interface TextEmojiPack extends BaseEmojiPack {
  type: 'text'
}

/** 表情包联合类型 */
export type EmojiPack = ImageEmojiPack | TextEmojiPack

/** 表情包集合 */
export type EmojiPacks = Record<string, EmojiPack>

/**
 * 获取表情包的默认尺寸
 */
export function getEmojiPackSize(pack: EmojiPack): number {
  return pack.type === 'image' ? (pack.size ?? 20) : 0
}

/**
 * 根据尺寸计算 grid 列数
 * - size ≤ 32: 8 列
 * - size ≤ 48: 6 列
 * - size ≤ 64: 5 列
 * - size > 64: 4 列
 * - 文字表情: 8 列
 */
export function getGridColumns(pack: EmojiPack): number {
  if (pack.type === 'text') return 8

  const size = pack.size ?? 32
  if (size <= 32) return 8
  if (size <= 48) return 6
  if (size <= 64) return 5
  return 4
}
