import { ImageResponse } from 'next/og'
import { OgImageTemplate } from '@/components/og-image-template'
import { pageMetadata } from '@/lib/config'
import { thoughts } from '@/lib/data'
import { dayjs } from '@/lib/dayjs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
  width: 1200,
  height: 630,
}

export const dynamic = 'force-static'
export const contentType = 'image/png'

export async function generateAlt(): Promise<string> {
  return pageMetadata.thoughts.title
}

export default async function Image() {
  const [fontData, iconData] = await Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/SourceHanSansSC-Regular.otf')),
    readFile(join(process.cwd(), 'public/icon-192.png')),
  ])

  // 按日期从新到旧排序
  const sortedThoughts = thoughts.toSorted((a, b) => (a.date < b.date ? 1 : -1))

  // 获取最新碎碎念的更新时间
  const latestThought = sortedThoughts[0]
  const lastUpdated = latestThought ? dayjs(latestThought.date).format('MM 月 DD 日 HH:mm') : ''

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

  return new ImageResponse(
    (
      <OgImageTemplate
        title={pageMetadata.thoughts.title}
        iconData={Buffer.from(iconData)}
        metaContent={
          lastUpdated && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  color: '#888888',
                  fontWeight: 500,
                }}
              >
                {`最后更新：${lastUpdated}`}
              </div>
            </div>
          )
        }
        bodyContent={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* 副标题 */}
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                color: '#666666',
                fontWeight: 400,
                lineHeight: 1.4,
              }}
            >
              {pageMetadata.thoughts.description}
            </div>

            {/* 统计数据：横向布局 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: 48,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  lineHeight: 1,
                }}
              >
                {thoughts.length}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 18,
                  color: '#888888',
                  fontWeight: 500,
                }}
              >
                条碎碎念
              </div>
            </div>
          </div>
        }
      />
    ),
    options,
  )
}
