import Link from 'next/link'

export default function ProjectPage() {
  return (
    <>
      <h1 className='text-2xl font-bold mb-2'>Projects</h1>
      <Link href='/' className='text-slate-800 dark:text-slate-500 dark:hover:text-slate-400'>
        ← back to home
      </Link>
    </>
  )
}
