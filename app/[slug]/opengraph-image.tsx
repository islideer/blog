import { formatDate } from '@/lib/dayjs'
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
          iconData={iconData}
          bodyContent={
            <div
              style={{
                display: 'flex',
                fontSize: 24,
                color: '#666666',
                fontWeight: 400,
              }}
            >
              该文章不存在或已被删除
            </div>
          }
        />
      ),
      options,
    )
  }

  // 格式化日期
  const formattedDate = formatDate(post.date)

  return new ImageResponse(
    (
      <OgImageTemplate
        title={post.title}
        iconData={Buffer.from(iconData)}
        metaContent={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* 发布日期 */}
            <div
              style={{
                fontSize: 18,
                color: '#888888',
                fontWeight: 500,
              }}
            >
              {formattedDate}
            </div>

            {/* 分隔线 */}
            {post.readingTime && (
              <div
                style={{
                  width: '1px',
                  height: '16px',
                  background: '#d0d0d0',
                }}
              />
            )}

            {/* 阅读时间 */}
            {post.readingTime && (
              <div
                style={{
                  fontSize: 18,
                  color: '#888888',
                  fontWeight: 500,
                }}
              >
                {`${post.readingTime} 分钟`}
              </div>
            )}
          </div>
        }
        bodyContent={
          post.excerpt && (
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                color: '#666666',
                fontWeight: 400,
                lineHeight: 1.6,
                maxHeight: '120px',
                overflow: 'hidden',
              }}
            >
              {post.excerpt}
            </div>
          )
        }
      />
    ),
    options,
  )
}
