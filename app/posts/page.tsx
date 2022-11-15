import Link from 'next/link'
import fg from 'fast-glob'
import fs from 'fs-extra'
import gm from 'gray-matter'
import { BackTo } from '../components/BackTo'

const fetchPosts = async () => {
  const postFilenames = await fg('posts/*.md')

  const fileContents = postFilenames.map(e => ({
    slug: e.slice(0, -3),
    text: fs.readFileSync(e, { encoding: 'utf-8' })
  }))

  const posts = fileContents.map(e => {
    const { data, content } = gm(e.text)
    return {
      slug: e.slug,
      title: data.title,
      date: data.date,
      content
    }
  })
  return posts
}

export default async function PostPage() {
  const posts = await fetchPosts()
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-start'>
        <h1 className='text-4xl font-bold mb-2'>Posts</h1>
        {posts.map(e => (
          <li key={e.slug} className='w-auto flex'>
            <Link href={`/${e.slug}`} className='flex flex-col'>
              <h2 className='inline text-xl'>{e.title}</h2>
              <div className='flex space-x-2 text-base text-zinc-500 dark:text-zinc-400'>
                <span>{e.date}</span>
              </div>
            </Link>
          </li>
        ))}
        <BackTo />
      </div>
    </div>
  )
}
