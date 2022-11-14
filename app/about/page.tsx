import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <h1 className='text-2xl font-bold mb-2'>About</h1>
      <p>Viki, a Font-End bug coder</p>
      <Link href='/' className='text-slate-800 dark:text-slate-500 dark:hover:text-slate-400'>
        ← back to home
      </Link>
    </>
  )
}
