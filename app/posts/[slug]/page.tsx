import { fetchPostDetail } from '../../../utils/fetchPostDetail'
import { BackTo } from '../../components/BackTo'

export default async function PostPage({ params: { slug } }: { params: { slug: string } }) {
  const post = await fetchPostDetail(slug)
  return (
    <div className='py-12'>
      <h1 className='text-4xl font-bold mb-6'>{post.title}</h1>
      <span>{post.date}</span>
      <article
        className='prose prose-zinc dark:prose-invert'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <BackTo path='/posts' name='Posts List' />
    </div>
  )
}
