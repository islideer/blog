import Link from 'next/link'

export const BackToHome = () => {
  return (
    <Link href='/' className='mt-6 text-slate-800 dark:text-slate-500 dark:hover:text-slate-400'>
      ← back to home
    </Link>
  )
}
