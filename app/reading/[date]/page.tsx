import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { dayjs } from '@/lib/dayjs'
import { notFound } from 'next/navigation'
import { Noto_Serif_SC } from 'next/font/google'
import { getReadingByDate, getLunarInfo } from '@/lib/reading'

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

  // 获取农历信息
  const readingDate = new Date(reading.date)
  const lunar = getLunarInfo(readingDate)
  const day = dayjs(reading.date).format('D')
  const yearMonth = dayjs(reading.date).format('YYYY 年 M 月')

  return (
    <div className={cn('mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8', notoSerifSC.className)}>
      {/* 返回按钮 */}
      <Link href="/reading" className="mb-8 block text-sm">
        ← 每日阅读
      </Link>

      {/* 日期标题 - 文艺布局 */}
      <header className="relative mb-16">
        <div className="flex items-start justify-between gap-8">
          {/* 左侧：日期信息 */}
          <div className="flex items-end gap-6 sm:gap-8">
            {/* 大数字 */}
            <div className="text-8xl leading-none font-bold tracking-widest sm:text-9xl">{day}</div>

            {/* 右侧：阳历和农历 */}
            <div className="flex flex-col justify-center space-y-2">
              {/* 农历 */}
              <div className="text-sm opacity-50">
                农历 {lunar.month}月{lunar.day}
              </div>

              {/* 节日 */}
              {lunar.festival && (
                <div className="text-sm font-medium text-red-600/80">{lunar.festival}</div>
              )}

              {/* 阳历 */}
              <div className="text-lg opacity-75 sm:text-xl">{yearMonth}</div>
            </div>
          </div>

          {/* 右侧：竖向 tip */}
          <div className="hidden items-start sm:flex">
            <div className="text-2xl font-medium tracking-widest [writing-mode:vertical-rl]">
              {reading.tip}
            </div>
          </div>
        </div>

        {/* 移动端 tip 显示 */}
        <div className="mt-6 text-center text-base opacity-50 sm:hidden">{reading.tip}</div>
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
                  {comment.avatar ? (
                    <Image
                      src={comment.avatar}
                      alt={comment.nickname}
                      height={40}
                      width={40}
                      className="aspect-square h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="bg-bg-tertiary text-text-secondary flex aspect-square h-10 w-10 items-center justify-center rounded-full text-lg font-medium">
                      {comment.nickname.charAt(0).toUpperCase()}
                    </div>
                  )}
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
