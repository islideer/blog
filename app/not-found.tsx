import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404',
  description: '这个页面不存在',
}

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      {/* 404 数字 */}
      <div className="relative mb-6">
        <div className="text-text-tertiary text-[100px] leading-none font-black opacity-5 sm:text-[140px]">
          404
        </div>
        <div className="text-text-primary absolute inset-0 flex items-center justify-center text-3xl font-bold text-nowrap sm:text-4xl">
          这里什么都没有
        </div>
      </div>

      {/* 描述文本 */}
      <p className="text-text-secondary mb-8 text-sm sm:text-base">
        你可能输错了地址，或者这个页面已经不存在了
      </p>

      {/* 导航链接 */}
      <nav className="flex items-center gap-2 text-sm sm:gap-4">
        <Link href="/posts" className="text-text-secondary hover:text-text-primary">
          文章
        </Link>
        <span className="text-text-tertiary">·</span>
        <Link href="/thoughts" className="text-text-secondary hover:text-text-primary">
          碎碎念
        </Link>
        <span className="text-text-tertiary">·</span>
        <Link href="/timeline" className="text-text-secondary hover:text-text-primary">
          大事记
        </Link>
        <span className="text-text-tertiary">·</span>
        <Link href="/about" className="text-text-secondary hover:text-text-primary">
          关于
        </Link>
      </nav>
    </div>
  )
}
