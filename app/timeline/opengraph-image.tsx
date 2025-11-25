import { ImageResponse } from 'next/og'
import { OgImageStatsItem, OgImageTemplate } from '@/components/og-image-template'
import { pagesData } from '@/lib/config'
import { timeline } from '@/lib/data'
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
  return pagesData.timeline.title
}

export default async function Image() {
  const [fontData, iconData] = await Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/SourceHanSansSC-Regular.otf')),
    readFile(join(process.cwd(), 'public/icon-192.png')),
  ])

  // 获取时间范围
  const dates = timeline.map((item) => dayjs(item.date))
  const earliestYear = dates.length > 0 ? Math.min(...dates.map((d) => d.year())) : 0
  const latestYear = dates.length > 0 ? Math.max(...dates.map((d) => d.year())) : 0
  const timeRange = earliestYear > 0 ? `${earliestYear} - ${latestYear}` : ''

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
        title={pagesData.timeline.title}
        iconData={Buffer.from(iconData)}
        metaContent={
          timeRange && (
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
                {timeRange}
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
              {pagesData.timeline.description}
            </div>

            {/* 统计数据：横向布局 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '60px',
              }}
            >
              {/* 大事记数 */}
              <OgImageStatsItem number={timeline.length} label="件大事记" />
            </div>
          </div>
        }
      />
    ),
    options,
  )
}
