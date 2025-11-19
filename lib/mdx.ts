import rehypeShiki from '@shikijs/rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'

import type { MDXRemoteProps } from 'next-mdx-remote/rsc'

export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    // 使用纯 Markdown 模式,允许原始 HTML
    format: 'md',
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
          behavior: 'wrap',
          properties: {
            className: ['heading-anchor'],
          },
        },
      ],
    ],
  },
}
