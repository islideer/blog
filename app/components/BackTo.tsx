import Link from 'next/link'

export const BackTo = ({ path = '/', name = 'Home' }: { path?: string; name?: string }) => {
  return (
    <Link href={path} className='mt-8 text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-400'>
      ← back to {name}
    </Link>
  )
}
