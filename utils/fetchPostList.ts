import { cache } from 'react'
import fg from 'fast-glob'
import fs from 'fs-extra'
import gm from 'gray-matter'

export const fetchPosts = cache(async () => {
  const postFilenames = await fg('posts/*.md')

  const fileContents = postFilenames.map(e => ({
    slug: e.slice(0, -3),
    text: fs.readFileSync(e, { encoding: 'utf-8' })
  }))

  const posts = fileContents.map(e => {
    const { data } = gm(e.text)
    return {
      slug: e.slug,
      title: data.title,
      date: data.dat
    }
  })
  return posts
})
