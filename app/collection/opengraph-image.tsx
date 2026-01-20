import { ImageResponse } from 'next/og'
import { OgImageStatsItem, OgImageTemplate } from '@/components/og-image-template'
import { collection, pages } from '@/lib/data'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
  width: 1200,
  height: 630,
}

export const dynamic = 'force-static'
export const contentType = 'image/png'

export async function generateAlt(): Promise<string> {
  return pages.collection.title
}

export default async function Image() {
  const [fontData, iconData] = await Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/SourceHanSansSC-Regular.otf')),
    readFile(join(process.cwd(), 'public/icon-192.png')),
  ])

  // 统计收藏总数
  const totalItems = collection.reduce((total, category) => total + category.items.length, 0)

  // 统计分类数
  const categoryCount = collection.length

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
      title={pages.collection.title}
      iconData={Buffer.from(iconData)}
      bodyContent={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* 描述 */}
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#666666',
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            {pages.collection.description}
          </div>

          {/* 统计数据：横向布局 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '60px',
            }}
          >
            {/* 收藏总数 */}
            <OgImageStatsItem number={totalItems} label="个收藏" />

            {/* 分类数 */}
            <OgImageStatsItem number={categoryCount} label="个分类" />
          </div>
        </div>
      }
    />,
    options,
  )
}
