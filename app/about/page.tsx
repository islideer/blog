import { BackTo } from '../components/BackTo'

export default function AboutPage() {
  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl font-bold mb-2'>About</h1>
      <p>Viki, a Font-End bug coder</p>
      <BackTo />
    </div>
  )
}
