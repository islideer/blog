import { visit } from 'unist-util-visit'
import type { Root, Text, Html, PhrasingContent } from 'mdast'
import type { Plugin } from 'unified'

import emojiPacks from '@/data/emoji-packs.json'

/** 插件选项 */
export interface RemarkEmojiPackOptions {
  /** 表情包配置 */
  packs?: typeof emojiPacks
  /** CSS 类名 */
  className?: string
}

/**
 * remark 插件：将 :collection_name: 转换为 <img> 标签
 *
 * @example
 * :demo_偷笑: → <img class="emoji" src="https://..." alt="偷笑" title="偷笑" loading="lazy" />
 * :cat_happy: → <img class="emoji" src="https://..." alt="happy" title="happy" loading="lazy" />
 */
const remarkEmojiPack: Plugin<[RemarkEmojiPackOptions?], Root> = (options = {}) => {
  const { packs = emojiPacks, className = 'emoji' } = options

  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || typeof index !== 'number') return

      const { value } = node
      // 匹配 :collection_name: 格式
      const regex = /:([a-zA-Z0-9_]+)_([^:]+):/g

      const newNodes: PhrasingContent[] = []
      let lastIndex = 0
      let match: RegExpExecArray | null

      while ((match = regex.exec(value)) !== null) {
        const [fullMatch, collection, name] = match

        // 添加前面的普通文本
        if (match.index > lastIndex) {
          newNodes.push({
            type: 'text',
            value: value.slice(lastIndex, match.index),
          })
        }

        // 查找表情包
        const pack = packs[collection as keyof typeof packs]
        const emojiUrl = pack?.items[name as keyof typeof pack.items]

        if (emojiUrl) {
          // 替换为图片标签
          newNodes.push({
            type: 'html',
            value: `<img class="${className}" src="${emojiUrl}" alt="${name}" title="${name}" loading="lazy" referrerpolicy="no-referrer" />`,
          } as Html)
        } else {
          // 表情未找到，保留原文
          newNodes.push({
            type: 'text',
            value: fullMatch,
          })
        }

        lastIndex = match.index + fullMatch.length
      }

      // 添加剩余文本
      if (lastIndex < value.length) {
        newNodes.push({
          type: 'text',
          value: value.slice(lastIndex),
        })
      }

      // 替换节点
      if (newNodes.length > 0) {
        parent.children.splice(index, 1, ...newNodes)
        return index + newNodes.length
      }
    })
  }
}

export default remarkEmojiPack
