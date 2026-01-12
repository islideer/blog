import { ImageResponse } from 'next/og'
import { OgImageStatsItem, OgImageTemplate } from '@/components/og-image-template'
import { pagesData } from '@/lib/data'
import { about } from '@/lib/data'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
  width: 1200,
  height: 630,
}

export const dynamic = 'force-static'
export const contentType = 'image/png'

export async function generateAlt(): Promise<string> {
  return pagesData.about.title
}

export default async function Image() {
  const [fontData, iconData] = await Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/SourceHanSansSC-Regular.otf')),
    readFile(join(process.cwd(), 'public/icon-192.png')),
  ])

  // 统计开源项目数量
  const projectsCount = Object.values(about.openSource.data).reduce(
    (total, data) => total + data.length,
    0,
  )

  // 统计技术栈数量
  const techStackCount = Object.values(about.techStack.data).reduce(
    (total, category) => total + category.length,
    0,
  )

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
      title={pagesData.about.title}
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
            {pagesData.about.description}
          </div>

          {/* 统计数据：横向布局 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '60px',
            }}
          >
            {/* 技术栈数量 */}
            <OgImageStatsItem number={techStackCount} label="个技术栈" />

            {/* 开源项目数 */}
            <OgImageStatsItem number={projectsCount} label="个开源项目" />
          </div>
        </div>
      }
    />,
    options,
  )
}
