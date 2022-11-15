import MarkdownIt from 'markdown-it'
import fg from 'fast-glob'
import gm from 'gray-matter'
import { promises as fs } from 'fs-extra'
import { cache } from 'react'
import dayjs from 'dayjs'

const md = MarkdownIt({
  linkify: true,
  breaks: true,
  html: true,
  typographer: true
})

export const fetchPostDetail = cache(async (slug: string) => {
  try {
    const targetFile = await fg(`posts/${slug.toLowerCase()}.md`)

    if (targetFile.length !== 1) {
      return null
    }

    const markdown = await fs.readFile(targetFile[0], { encoding: 'utf-8' })
    const { data, content } = gm(markdown)

    const html = md.render(content)

    return {
      slug,
      title: data.title,
      timestams: data.date,
      date: dayjs(data.date).format('YYYY/MM/DD'),
      content: html
    }
  } catch (e) {
    return String(e)
  }
})
