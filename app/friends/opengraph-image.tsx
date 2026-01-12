import { ImageResponse } from 'next/og'
import { OgImageStatsItem, OgImageTemplate } from '@/components/og-image-template'
import { pagesData } from '@/lib/data'
import { friends } from '@/lib/data'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
  width: 1200,
  height: 630,
}

export const dynamic = 'force-static'
export const contentType = 'image/png'

export async function generateAlt(): Promise<string> {
  return pagesData.friends.title
}

export default async function Image() {
  const [fontData, iconData] = await Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/SourceHanSansSC-Regular.otf')),
    readFile(join(process.cwd(), 'public/icon-192.png')),
  ])

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
      title={pagesData.friends.title}
      iconData={Buffer.from(iconData)}
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
            {pagesData.friends.description}
          </div>

          {/* 统计数据：横向布局 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '60px',
            }}
          >
            {/* 好朋友数 */}
            {friends.length > 0 ? (
              <OgImageStatsItem number={friends.length} label="位好朋友" />
            ) : (
              <div
                style={{
                  fontSize: 18,
                  color: '#999999',
                  fontStyle: 'italic',
                }}
              >
                暂无好朋友，等待添加中...
              </div>
            )}
          </div>
        </div>
      }
    />,
    options,
  )
}
