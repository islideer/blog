import Image from 'next/image'
import Link from 'next/link'
import { FiGithub } from 'react-icons/fi'
import { ModeSwitcher } from './components/ModeSwitcher'

export default function Homepage() {
  const avatarUrl = 'http://q.qlogo.cn/headimg_dl?dst_uin=1141284758&spec=640&img_type=png'

  return (
    <div>
      <main className='h-screen flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center md:flex-row'>
          <Image
            className='mb-4 rounded-lg md:mr-12'
            src={avatarUrl}
            alt='Avatar'
            priority
            width={100}
            height={100}
          />

          <div className='flex flex-col justify-center'>
            <div className='flex justify-center items-baseline md:justify-start'>
              <h1 className='my-2 text-5xl font-bold tracking-wide'>Viki</h1>
              <Link href='https://github.com/vikiboss'>
                <FiGithub className='ml-6 text-xl text-zinc-800 hover:text-zinc-400 dark:text-zinc-300 dark:hover:text-zinc-400' />
              </Link>
              <ModeSwitcher />
            </div>

            <nav className='my-2 text-2xl flex justify-between space-x-4'>
              {[
                { name: 'Posts', path: '/posts' },
                { name: 'Projects', path: '/projects' },
                { name: 'About', path: '/about' }
              ].map(e => (
                <Link
                  className='font-bold text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-400'
                  href={e.path}
                  key={e.name}
                >
                  {e.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </main>
    </div>
  )
}
