import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { dayjs } from '@/lib/dayjs'
import { notFound } from 'next/navigation'
import { Noto_Serif_SC } from 'next/font/google'
import { getReadingByDate } from '@/lib/reading'

import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ date: string }>
}

const notoSerifSC = Noto_Serif_SC({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params

  try {
    const reading = await getReadingByDate(date)
    return {
      title: `${reading.name_formatted} - ${reading.author}`,
      description: reading.content.slice(0, 100),
    }
  } catch {
    return {
      title: '每日阅读',
    }
  }
}

export default async function ReadingDetailPage({ params }: PageProps) {
  const { date } = await params

  let reading
  try {
    reading = await getReadingByDate(date)
  } catch {
    notFound()
  }

  return (
    <div className={cn('mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8', notoSerifSC.className)}>
      {/* 返回按钮 */}
      <Link href="/reading" className="mb-8 block text-sm">
        ← 返回每日阅读
      </Link>

      {/* 提示语和日期 - 重点展示 */}
      <header className="mb-16">
        <h1 className="mb-2 text-2xl font-medium tracking-wide uppercase sm:mb-4 sm:text-3xl">
          {dayjs(reading.date).format('YYYY 年 M 月 D 日')} / {reading.tip}
        </h1>
      </header>

      {/* 文章正文 */}
      <article className="mb-12 text-lg leading-relaxed">
        {reading.content
          .trim()
          .split('\n')
          .map((paragraph, i) => (
            <p key={i} className="mb-6 last:mb-0">
              {paragraph}
            </p>
          ))}
      </article>

      {/* 作品信息 - 低调展示在正文后 */}
      <div className="mb-16 text-center">
        <p className="mb-2 text-base opacity-50 sm:text-lg">{reading.name_formatted}</p>
        <p className="text-sm opacity-40">{reading.author}</p>
      </div>

      {/* 互动数据 */}
      <div className="border-border mb-12 flex items-center justify-center gap-8 border-y py-6 text-sm opacity-60">
        <span>{reading.like_count} 喜欢</span>
        <span>{reading.comment_count} 评论</span>
      </div>

      {/* 评论区 */}
      {reading.comments.length > 0 && (
        <section>
          <h2 className="mb-8 text-2xl font-medium">读者评论</h2>
          <div className="space-y-6">
            {reading.comments.slice(0, 10).map((comment) => (
              <div key={comment.id} className="border-border bg-bg-secondary rounded-lg border p-6">
                <div className="mb-3 flex items-center gap-3">
                  <Image
                    src={comment.avatar}
                    alt={comment.nickname}
                    height={40}
                    width={40}
                    className="aspect-square h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{comment.nickname}</p>
                    <p className="text-xs opacity-50">{comment.like_count} 赞</p>
                  </div>
                </div>
                <p className="leading-relaxed opacity-90">{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
