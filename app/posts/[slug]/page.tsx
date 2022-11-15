import { BackTo } from '../../components/BackTo'

export default async function PostPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-2'>{slug}</h1>
      <BackTo path='/posts' name='Posts List' />
    </div>
  )
}
