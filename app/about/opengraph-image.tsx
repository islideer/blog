import { ImageResponse } from 'next/og'
import { OgImageTemplate } from '@/components/og-image-template'
import { pageMetadata } from '@/lib/pages'
import { siteConfig } from '@/lib/config'
import { about } from '@/lib/about'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
  width: 1200,
  height: 630,
}

export const dynamic = 'force-static'
export const contentType = 'image/png'

export async function generateAlt(): Promise<string> {
  return pageMetadata.about.title
}

export default async function Image() {
  const [fontData, iconData] = await Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/SourceHanSansSC-Regular.otf')),
    readFile(join(process.cwd(), 'public/icon-192.png')),
  ])

  // 统计开源项目数量
  const projectsCount = Object.values(about.openSource.projects).reduce(
    (total, projects) => total + projects.length,
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
    (
      <OgImageTemplate
        title={pageMetadata.about.title}
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
              {pageMetadata.about.description}
            </div>

            {/* 个人信息和统计：数字在前描述在后，底部对齐 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '24px',
              }}
            >
              {/* 名字 */}
              <div
                style={{
                  display: 'flex',
                  fontSize: 48,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  lineHeight: 1,
                }}
              >
                {siteConfig.author.name}
              </div>
              {/* 职业 */}
              <div
                style={{
                  display: 'flex',
                  fontSize: 18,
                  color: '#888888',
                  fontWeight: 500,
                }}
              >
                前端工程师
              </div>
              {/* 分隔符 */}
              <div
                style={{
                  display: 'flex',
                  fontSize: 18,
                  color: '#cccccc',
                }}
              >
                ·
              </div>
              {/* 开源项目数 */}
              <div
                style={{
                  display: 'flex',
                  fontSize: 48,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  lineHeight: 1,
                }}
              >
                {projectsCount}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 18,
                  color: '#888888',
                  fontWeight: 500,
                }}
              >
                个开源项目
              </div>
            </div>
          </div>
        }
      />
    ),
    options,
  )
}
