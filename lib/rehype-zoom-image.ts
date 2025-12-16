import type { Root, Element } from 'hast'
import { visit } from 'unist-util-visit'

/**
 * Rehype 插件：为图片添加 zoom 支持
 *
 * 给所有 img 标签添加 data-zoomable 属性，
 * 供客户端 medium-zoom 初始化使用
 */
export default function rehypeZoomImage() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'img') {
        node.properties = node.properties || {}
        node.properties['dataZoomable'] = true
      }
    })
  }
}
