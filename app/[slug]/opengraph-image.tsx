import { dayjs } from '@/lib/dayjs'
import { ImageResponse } from 'next/og'
import { OgImageTemplate } from '@/components/og-image-template'
import { getPostBySlug } from '@/lib/posts'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
  width: 1200,
  height: 630,
}

export const dynamic = 'force-static'
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateAlt({ params }: Props): Promise<string> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  return post?.title || '文章详情'
}

export default async function Image({ params }: Props) {
  const { slug } = await params

  const post = await getPostBySlug(slug)
  const fontData = await readFile(join(process.cwd(), 'assets/fonts/SourceHanSansSC-Regular.otf'))
  const iconData = await readFile(join(process.cwd(), 'public/icon-192.png'))

  const options = {
    ...size,
    fonts: [
      {
        name: 'Noto Sans SC',
        data: fontData,
        style: 'normal' as const,
        weight: 400 as const,
      },
    ],
  }

  if (!post) {
    return new ImageResponse(
      (
        <OgImageTemplate
          title="文章未找到"
          subtitle="该文章不存在或已被删除"
          type="post"
          iconData={iconData}
        />
      ),
      options,
    )
  }

  // 格式化日期
  const formattedDate = dayjs(post.date).format('YYYY.MM.DD')

  return new ImageResponse(
    (
      <OgImageTemplate
        title={post.title}
        subtitle={post.excerpt}
        type="post"
        date={formattedDate}
        readingTime={post.readingTime}
        iconData={Buffer.from(iconData)}
      />
    ),
    options,
  )
}
