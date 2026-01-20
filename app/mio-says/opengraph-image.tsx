import { ImageResponse } from 'next/og'
import { OgImageStatsItem, OgImageTemplate } from '@/components/og-image-template'
import { pages } from '@/lib/data'
import { mioSays } from '@/lib/data'
import { formatFull } from '@/lib/dayjs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
  width: 1200,
  height: 630,
}

export const dynamic = 'force-static'
export const contentType = 'image/png'

export async function generateAlt(): Promise<string> {
  return pages.mioSays.title
}

export default async function Image() {
  const [fontData, iconData] = await Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/SourceHanSansSC-Regular.otf')),
    readFile(join(process.cwd(), 'public/icon-192.png')),
  ])

  // 按日期从新到旧排序
  const sortedMioSays = mioSays.toSorted((a, b) => (a.date < b.date ? 1 : -1))

  // 获取最新 Mio 说的更新时间
  const latestMioSay = sortedMioSays[0]
  const lastUpdated = latestMioSay ? formatFull(latestMioSay.date) : ''

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
    <OgImageTemplate
      title={pages.mioSays.title}
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
              {`更新于 ${lastUpdated}`}
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
            {pages.mioSays.description}
          </div>

          {/* 统计数据：横向布局 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '60px',
            }}
          >
            {/* Mio 说数 */}
            <OgImageStatsItem number={mioSays.length} label="条 Mio 说" />
          </div>
        </div>
      }
    />,
    options,
  )
}
