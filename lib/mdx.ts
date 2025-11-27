import rehypeShiki from '@shikijs/rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import type { MDXRemoteProps } from 'next-mdx-remote/rsc'

export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    // 使用纯 Markdown 模式,允许原始 HTML
    format: 'md',
    remarkPlugins: [
      // 添加 GFM 支持（表格、删除线、任务列表等）
      remarkGfm,
    ],
    rehypePlugins: [
      // 添加 rehype-raw 来处理原始 HTML
      rehypeRaw,
      [
        rehypeShiki,
        {
          themes: {
            light: 'one-light',
            dark: 'one-dark-pro',
          },
          defaultColor: false,
          cssVariablePrefix: '--shiki-',
        },
      ],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          properties: {
            className: ['heading-anchor'],
            ariaHidden: true,
            tabIndex: -1,
          },
          content: {
            type: 'text',
            value: '#',
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        },
      ],
    ],
  },
}
