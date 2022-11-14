import Link from 'next/link'

export default async function PostPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-2'>{slug}</h1>
      <Link href='/' className='text-slate-800 dark:text-slate-500 dark:hover:text-slate-400'>
        ← back to home
      </Link>
    </div>
  )
}
