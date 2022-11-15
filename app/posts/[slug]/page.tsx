import { fetchPostDetail } from '../../../utils/fetchPostDetail'
import { BackTo } from '../../components/BackTo'

export default async function PostPage({ params: { slug } }: { params: { slug: string } }) {
  const post = await fetchPostDetail(slug)

  if (!post) {
    return <div>{slug} 404 Not Found</div>
  }

  return (
    <div className='py-12'>
      <h1 className='text-4xl font-bold mb-6'>{post.title}</h1>
      <div className='mb-2 w-auto text-right text-zinc-700 dark:text-zinc-400'>{post.date}</div>
      <article
        className='prose prose-zinc dark:prose-invert'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <BackTo path='/posts' name='Posts List' />
    </div>
  )
}
