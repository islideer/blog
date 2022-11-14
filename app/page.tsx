import Image from 'next/image'
import Link from 'next/link'
import { FiGithub } from 'react-icons/fi'

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
              <h1 className='my-2 text-4xl tracking-wide'>Viki</h1>
              <Link href='https://github.com/vikiboss' className='h-6 ml-6'>
                <FiGithub className='text-xl text-slate-800  dark:text-slate-300' />
              </Link>
            </div>

            <nav className='my-2 text-2xl flex justify-between space-x-4'>
              {[
                { name: 'Posts', path: '/posts' },
                { name: 'Projects', path: '/projects' },
                { name: 'About', path: '/about' }
              ].map(e => (
                <Link
                  className='text-slate-800 dark:text-slate-500 dark:hover:text-slate-400'
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
