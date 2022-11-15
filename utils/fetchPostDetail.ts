import MarkdownIt from 'markdown-it'
import gm from 'gray-matter'
import { promises as fs } from 'fs-extra'
import { cache } from 'react'

const md = MarkdownIt({
  linkify: true,
  breaks: true,
  html: true,
  typographer: true
})

export const fetchPostDetail = cache(async (slug: string) => {
  const markdown = await fs.readFile(`./posts/${slug}.md`, { encoding: 'utf-8' })
  const { data, content } = gm(markdown)

  const html = md.render(content)

  console.log(html)

  return {
    slug,
    title: data.title,
    date: data.dat,
    content: html
  }
})
