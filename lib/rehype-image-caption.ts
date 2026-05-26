import { visit } from 'unist-util-visit'
import type { Root, Element, Text } from 'hast'

/**
 * Rehype 插件：为含有 alt 文本的图片在下方添加说明文字
 *
 * 将孤立的 <p><img alt="..."></p> 转换为 <figure><img><figcaption>...</figcaption></figure>
 * 其余场景（图片嵌套在其他内容中）降级为在 img 后插入 <span class="image-caption">
 */
export default function rehypeImageCaption() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'img') return
      if (!parent || index === undefined) return

      const isEmoji =
        Array.isArray(node.properties.className) && node.properties.className.includes('emoji')
      if (isEmoji) return

      const alt = node.properties.alt as string

      if (!alt || alt.trim() === '' || alt === 'image') return

      const parentEl = parent as Element

      // 孤立图片：<p><img></p> → 转为 figure/figcaption
      if (parentEl.tagName === 'p') {
        const significantChildren = parentEl.children.filter(
          (child) => child.type !== 'text' || (child as Text).value.trim() !== '',
        )

        if (significantChildren.length === 1) {
          parentEl.tagName = 'figure'
          parentEl.properties = { className: ['image-figure'] }
          parentEl.children = [
            node,
            {
              type: 'element',
              tagName: 'figcaption',
              properties: { className: ['image-caption', 'no-underline'] },
              children: [{ type: 'text', value: alt }],
            } as Element,
          ]
          return
        }
      }

      if (parentEl.tagName === 'a') {
        const cls = parentEl.properties.className

        if (typeof cls === 'undefined' || typeof cls === 'string' || Array.isArray(cls)) {
          parentEl.properties.className = [cls || '', 'no-underline'].filter((e) => !!e).flat(1)
        }
      }

      // 降级：img 在其他容器中，直接在后面插入 span

      parentEl.children.splice(index + 1, 0, {
        type: 'element',
        tagName: 'span',
        properties: { className: ['image-caption', 'no-underline'] },
        children: [{ type: 'text', value: alt }],
      } as Element)
    })
  }
}
