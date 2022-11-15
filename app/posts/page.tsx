import Link from 'next/link'
import { fetchPosts } from '../../utils/fetchPostList'
import { BackTo } from '../components/BackTo'

export const revalidate = 300

export const dynamic = 'error'

export default async function PostPage() {
  const posts = await fetchPosts()

  return (
    <div className='flex flex-col justify-center items-center py-12'>
      <div className='flex flex-col justify-center items-start'>
        <h1 className='text-4xl font-bold mb-2'>Posts</h1>
        {posts.map(e => (
          <li key={e.slug} className='w-auto flex'>
            <Link href={`/${e.slug}`} className='flex flex-col'>
              <h2 className='inline text-lg'>{e.title}</h2>
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
